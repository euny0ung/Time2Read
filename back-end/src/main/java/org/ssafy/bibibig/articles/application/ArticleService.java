package org.ssafy.bibibig.articles.application;

import lombok.RequiredArgsConstructor;
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
import org.ssafy.bibibig.quiz.dto.Quiz;
import org.ssafy.bibibig.quiz.utils.QuizUtils;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final QuizUtils quizUtils;

    public Article findById(String id) {
        return getArticleEntityOrThrowException(id);
    }

    public List<KeywordTerms> getTopKeywordsByYear(int year) {
        return articleRepository.getTopKeywordsByYear(year);
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
        List<ArticleWithQuiz> quizzes = getFirstArticleWithKeywordQuizzes(year);
        quizzes.addAll(getFirstArticleWithMultipleChoiceQuizzes(year));
        return quizzes;
    }

    public List<ArticleWithQuiz> getFirstArticleWithKeywordQuizzes(int year) {
        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> randomCategory = firstCategory(4);
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
        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> randomCategory = firstCategory(2);
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

   /* public List<ArticleWithQuiz> getSecondArticleWithQuizzes(int year) {
        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> categories = secondCategory();

        for (CategoryType category : categories) {
            List<KeywordTerms> keywords = getTopKeywordsByYearAndCategory(year, category, 1);
            for (KeywordTerms keyword : keywords) {
                Article article = getRandomArticleByYearAndCategoryAndKeyword(year, category, keyword.word());
                result.add(getArticleWithQuiz(article, category));
            }
        }
        return result;
    }*/

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
    private List<CategoryType> secondCategory() {
        List<CategoryType> categoryList = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            int randomIdx = random.nextInt(CategoryType.values().length);
            categoryList.add(CategoryType.values()[randomIdx]);
        }
        return categoryList;
    }


    private Quiz makeKeywordQuiz(Article article) {
        return quizUtils.makeKeywordQuiz(article);
    }

    private Quiz makeKeywordQuiz(Article article, String keyword) {
        return quizUtils.makeKeywordQuiz(article, keyword);
    }

    private Quiz makeMultipleChoiceQuiz(Article article, String answer, List<String> choice) {
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
