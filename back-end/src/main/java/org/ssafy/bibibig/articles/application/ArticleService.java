package org.ssafy.bibibig.articles.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.articles.dao.ArticleRepository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.articles.dto.ArticleWithQuiz;
import org.ssafy.bibibig.articles.dto.CategoryType;
import org.ssafy.bibibig.articles.dto.KeywordTerms;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.quiz.dto.*;
import org.ssafy.bibibig.quiz.dto.response.OXQuizQuestion;
import org.ssafy.bibibig.quiz.utils.OpenAIUtils;
import org.ssafy.bibibig.quiz.utils.QuizUtils;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final QuizUtils quizUtils;
    private final OpenAIUtils openAIUtils;

    public Article findById(String id) {
        return getArticleEntityOrThrowException(id);
    }

    public List<KeywordTerms> getTopKeywordsByYear(int year) {
        return articleRepository.getTopKeywordsByYear(year);
    }

    public Article getRandomArticleByYearAndCategory(int year, int size, CategoryType category) {
        return Article.from(articleRepository.getRandomArticleByYearAndCategory(year, size, category));
    }

    public ArticleWithQuiz getArticleWithKeywordQuiz(Article article, CategoryType category) {
        return ArticleWithQuiz.from(category, article, makeKeywordQuiz(article));
    }

    public ArticleWithQuiz getArticleWithKeywordQuiz(Article article, CategoryType category, String keyword) {
        return ArticleWithQuiz.from(category, article, makeKeywordQuiz(article, keyword));
    }

    public ArticleWithQuiz getArticleWithMultipleChoiceQuiz(Article article, CategoryType category,
                                                            String answer, List<String> choice) {
        return ArticleWithQuiz.from(category, article, makeMultipleChoiceQuiz(article, answer, choice));
    }


    // 사용 안함
    public List<ArticleWithQuiz> getArticleWithQuizzes(int year) {
        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> randomCategory = randomCategory();
        List<CategoryType> categories = List.of(CategoryType.values());

        Map<String, List<CategoryType>> grouping = randomCategory
                .stream()
                .collect(Collectors.groupingBy(CategoryType::getName));

        for (CategoryType category : categories) { // 카테고리 별로
            int size = grouping.getOrDefault(category.getName(), List.of()).size();

            if (size == 0) continue;

            List<KeywordTerms> keywords = getTopKeywordsByYearAndCategory(year, category);

            List<ArticleWithWord> articles = getRandomArticleByYearAndCategoryAndKeyword(year, size, category, keywords);

            for (ArticleWithWord article : articles) {
                result.add(getArticleWithKeywordQuiz(article.article, category, article.word));
            }
        }
        return result;
    }

    public List<ArticleWithQuiz> getQuizzes(int year) {
        List<ArticleWithQuiz> quizzes = new ArrayList<>();
        quizzes.addAll(getFirstArticleWithKeywordQuizzes(year));
        quizzes.addAll(getFirstArticleWithMultipleChoiceQuizzes(year));
        quizzes.addAll(getQuizzesWithOX(year));
        Collections.shuffle(quizzes);
        return quizzes;
    }

    public List<ArticleWithQuiz> getFirstArticleWithKeywordQuizzes(int year) {
//        int quizCount = 6;
        int quizCount = 4;
        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> randomCategory = firstCategory(quizCount);
        List<CategoryType> categories = List.of(CategoryType.values());

        Map<String, List<CategoryType>> grouping = randomCategory
                .stream()
                .collect(Collectors.groupingBy(CategoryType::getName));

        for (CategoryType category : categories) { // 카테고리 별로
            int size = grouping.getOrDefault(category.getName(), List.of()).size();

            if (size == 0) continue;

            List<KeywordTerms> keywords = getTopKeywordsByYearAndCategory(year, category);

            List<ArticleWithWord> articles = getRandomArticleByYearAndCategoryAndKeyword(year, size, category, keywords);

            for (ArticleWithWord article : articles) {
                result.add(getArticleWithKeywordQuiz(article.article, category, article.word));
            }
        }
        return result;
    }

    public List<ArticleWithQuiz> getFirstArticleWithMultipleChoiceQuizzes(int year) {
//        int quizCount = 4;
        int quizCount = 2;

        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> randomCategory = firstCategory(quizCount);
        List<CategoryType> categories = List.of(CategoryType.values());

        Map<String, List<CategoryType>> grouping = randomCategory
                .stream()
                .collect(Collectors.groupingBy(CategoryType::getName));

        for (CategoryType category : categories) { // 카테고리 별로
            int size = grouping.getOrDefault(category.getName(), List.of()).size();

            if (size == 0) continue;

            List<KeywordTerms> keywords = getTopKeywordsByYearAndCategory(year, category); // 50개

            List<ArticleWithMultipleChoice> articles = getRandomArticleByYearAndCategoryAndKeywordForMultipleChoice(year, size, category, keywords);

            for (ArticleWithMultipleChoice article : articles) {
                result.add(getArticleWithMultipleChoiceQuiz(
                        article.article,
                        category,
                        String.valueOf(article.wordLocation),
                        article.multipleChoices)
                );
            }
        }
        return result;
    }

    public List<ArticleWithQuiz> getQuizzesWithOX(int year) {

        // 카테고리 렌덤 뽑기
        int quizCount = 4;

        List<Article> articles = new ArrayList<>();
        List<String> summaries = new ArrayList<>();
        List<CategoryType> categories = secondCategory(quizCount);

        Map<String, List<CategoryType>> grouping = categories
                .stream()
                .collect(Collectors.groupingBy(CategoryType::getName));

        for (CategoryType category : categories) {
            int size = grouping.getOrDefault(category.getName(), List.of()).size();

            if (size == 0) continue;

            Article article = getRandomArticleByYearAndCategory(year, size, category);

            articles.add(article);
            summaries.add(article.summary());
        }

        List<OXQuizQuestion> quizzes = null;
        try {
            quizzes = openAIUtils.generateOXQuiz(summaries);

        } catch (JsonProcessingException e) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, String.format("quizzes is null"));
        }

        List<ArticleWithQuiz> result = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            OXQuiz quiz = new OXQuiz(QuizType.OX, quizzes.get(i).question(), quizzes.get(i).answer(), null);
            result.add(ArticleWithQuiz.from(categories.get(i), articles.get(i), quiz));
        }
        return result;
    }

    private List<KeywordTerms> getTopKeywordsByYearAndCategory(int year, CategoryType categoryType) {
        return articleRepository.getTopKeywordsByYearAndCategory(year, categoryType);
    }

    public List<Article> getRelatedArticlesTop5(String id) {
        return articleRepository.getRelatedArticlesTop5(id).stream().map(Article::from).toList();
    }

    public List<String> getMultipleChoice(int year, CategoryType category, String keyword, int count) {
        List<KeywordTerms> multipleChoice = articleRepository.getMultipleChoice(year, category, keyword, count);

        List<String> words = multipleChoice.stream()
                .map(KeywordTerms::word)
                .collect(Collectors.toList());
        words.add(keyword);

        Collections.shuffle(words);
        return words;
    }

    // 기사 랜덤 뽑기
    private List<ArticleWithWord> getRandomArticleByYearAndCategoryAndKeyword(int year, int size, CategoryType category, List<KeywordTerms> keywords) {
        List<ArticleWithWord> result = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            List<Integer> randoms = getRandomNumbers(keywords.size());
            for (int randomNumber : randoms) {
                ArticleEntity entity = articleRepository.getRandomArticleByYearAndCategoryAndKeyword(
                        year, category, keywords.get(randomNumber).word()
                );

                if (entity == null) continue;

                result.add(new ArticleWithWord(Article.from(entity), keywords.get(randomNumber).word()));
                break;
            }
        }
        return result;
    }

    private List<ArticleWithMultipleChoice> getRandomArticleByYearAndCategoryAndKeywordForMultipleChoice(int year,
                                                                                                         int size,
                                                                                                         CategoryType category,
                                                                                                         List<KeywordTerms> keywords) {
        List<ArticleWithMultipleChoice> result = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            List<Integer> randoms = getRandomNumbers(keywords.size());
            for (int randomNumber : randoms) {
                String collect = keywords.get(randomNumber).word();

                ArticleEntity entity = articleRepository.getRandomArticleByYearAndCategoryAndKeyword(
                        year, category, collect
                );

                if (entity == null) continue; // 조회가 되지 않으면 다른 키워드 선택

                result.add(new ArticleWithMultipleChoice(
                        Article.from(entity),
                        collect,
                        getMultipleChoice(year, category, collect, 4))
                );
                break;
            }
        }
        return result;
    }

    private List<Integer> getRandomNumbers(int keywordSize) {
        List<Integer> numbers = IntStream.range(0, keywordSize)
                .boxed()
                .collect(Collectors.toList());
        Collections.shuffle(numbers);
        return numbers;
    }

    //TODO - 사회 기사 추가되면 카테고리 리스트 수정할 것
    //랜덤카테고리 - 10개
    private List<CategoryType> randomCategory() {
        return List.of(CategoryType.POLITICS, CategoryType.ECONOMY, CategoryType.CULTURE, CategoryType.INTERNATIONAL, CategoryType.SPORTS, CategoryType.INTERNATIONAL, CategoryType.POLITICS, CategoryType.ECONOMY, CategoryType.CULTURE, CategoryType.INTERNATIONAL, CategoryType.SPORTS, CategoryType.INTERNATIONAL);

//        List<CategoryType> categoryList = new ArrayList<>(List.of(CategoryType.values()));
//        Random random = new Random();
//        for (int i = 0; i < 4; i++) {
//            int randomIdx = random.nextInt(CategoryType.values().length);
//            categoryList.add(CategoryType.values()[randomIdx]);
//        }
//        return categoryList;
    }

    // 카테고리 - 6개
    private List<CategoryType> firstCategory(int size) {
        // return List.of(CategoryType.POLITICS, CategoryType.ECONOMY, CategoryType.CULTURE, CategoryType.INTERNATIONAL, CategoryType.SPORTS, CategoryType.INTERNATIONAL);
        List<CategoryType> categoryList = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            int randomIdx = random.nextInt(CategoryType.values().length);
            categoryList.add(CategoryType.values()[randomIdx]);
        }
        return categoryList;
    }

    // 랜덤 카테고리 - 4개
    private List<CategoryType> secondCategory(int size) {
        List<CategoryType> categoryList = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            int randomIdx = random.nextInt(CategoryType.values().length);
            categoryList.add(CategoryType.values()[randomIdx]);
        }
        return categoryList;
    }


    private Quiz makeKeywordQuiz(Article article) {
        return quizUtils.makeKeywordQuiz(article);
    }

    private KeywordQuiz makeKeywordQuiz(Article article, String keyword) {
        return quizUtils.makeKeywordQuiz(article, keyword);
    }

    private MultipleChoiceQuiz makeMultipleChoiceQuiz(Article article, String answer, List<String> choice) {
        return quizUtils.makeMultipleChoiceQuiz(article, answer, choice);
    }

    private Article getArticleEntityOrThrowException(String id) {
        return Article.from(articleRepository.findById(id).orElseThrow(() ->
                        new CommonException(ErrorCode.ARTICLE_NOT_FOUND, String.format("article id : %s is not founded", id))
                )
        );
    }

    private static class ArticleWithWord {
        Article article;
        String word;

        public ArticleWithWord(Article article, String word) {
            this.article = article;
            this.word = word;
        }
    }

    private static class ArticleWithMultipleChoice {
        Article article;
        int wordLocation; // 아래 multipleChoices에서의 정답 위치
        List<String> multipleChoices;

        public ArticleWithMultipleChoice(Article article, String word, List<String> multipleChoices) {
            this.article = article;
            this.multipleChoices = multipleChoices;
            this.wordLocation = findWordLocation(word);
        }

        private int findWordLocation(String word) {
            for (int i = 0; i < this.multipleChoices.size(); i++) {
                if (multipleChoices.get(i).equals(word)) {
                    return i;
                }
            }
            return 0;
        }
    }
}
