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
        List<Clue> clues = new ArrayList<>();
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
            clues.add(new Clue(ClueType.OX, article.content()));

        }

        List<OXQuizQuestion> quizzes = null;
        try {
            quizzes = openAIUtils.generateOXQuiz(summaries);

        } catch (JsonProcessingException e) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, String.format("quizzes is null"));
        }

        List<ArticleWithQuiz> result = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            OXQuiz quiz = new OXQuiz(QuizType.OX, quizzes.get(i).question(), quizzes.get(i).answer(), Collections.singletonList(clues.get(i)));
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

    //for test
    public List<ArticleWithQuiz> getArticleWithQuizForAdmin() {
        List<ArticleWithQuiz> quizzes = new ArrayList<>();
        List<String> idList = List.of(
                "ef2784fd-c9dc-48db-8dfc-c6f83bd5cca9", // 키워드 - 득점왕
                "607a45b6-1870-43e1-89e3-0fb0556df26d", // 키워드 - 카카오
                "6938cbd8-d165-4a6f-9c76-08f2ee949ab1", // 키워드 - 윤석열 당선
                "15c8d350-742e-4149-882f-dd93835f5f38", // 키워드 - 마스크
                "9fadf8d3-751e-4987-a06b-22b86ad60528", // 객관식 - 이태원 참사 - 사회
                "53ec5b5f-dc04-4b0f-97b8-2d264541b7b3", // 객관식 - 누리호 - 정치
                "8dfc3d09-1b9b-413a-9102-00bea54278e9", // OX - 오징어게임
                "b8be30b2-4edc-49dc-995e-188273d5cab7", // OX - 우크라이나
                "a78ce338-a736-4c8b-987a-1db291313227", // OX -  추경
                "48c04798-ac21-4023-96ad-12843a7406a2" // OX - 월드컵
        );
        // 키워드 기사 4문제 생성
        List<ArticleWithWord> articles = List.of(
                new ArticleWithWord(findById("ef2784fd-c9dc-48db-8dfc-c6f83bd5cca9"), "득점왕"),
                new ArticleWithWord(findById("607a45b6-1870-43e1-89e3-0fb0556df26d"), "카카오"),
                new ArticleWithWord(findById("6938cbd8-d165-4a6f-9c76-08f2ee949ab1"), "윤석열"),
                new ArticleWithWord(findById("15c8d350-742e-4149-882f-dd93835f5f38"), "마스크")
        );
        quizzes.add(getArticleWithKeywordQuiz(articles.get(0).article, CategoryType.SPORTS, articles.get(0).word));
        quizzes.add(getArticleWithKeywordQuiz(articles.get(1).article, CategoryType.SOCIETY, articles.get(1).word));
        quizzes.add(getArticleWithKeywordQuiz(articles.get(2).article, CategoryType.POLITICS, articles.get(2).word));
        quizzes.add(getArticleWithKeywordQuiz(articles.get(3).article, CategoryType.ECONOMY, articles.get(3).word));
        // 객관식 기사 2문제 생성

        List<KeywordTerms> keywordTerms1 = List.of(new KeywordTerms("이태원", 105));
        List<KeywordTerms> keywordTerms2 = List.of(new KeywordTerms("누리호", 47));
        List<ArticleWithMultipleChoice> tmp1 = getRandomArticleByYearAndCategoryAndKeywordForMultipleChoice(2022, 1, CategoryType.SOCIETY, keywordTerms1);
//        int tmp1Order = 0;
//        for(int i = 0; i < tmp1.size(); i++) {
//            if(tmp1.get(i).wordLocation) {
//                tmp1Order = i;
//                break;
//            }
//        }
        List<ArticleWithMultipleChoice> tmp2 = getRandomArticleByYearAndCategoryAndKeywordForMultipleChoice(2022, 1, CategoryType.POLITICS, keywordTerms2);
//        int tmp2Order = 0;
//        for(int i = 0; i < tmp2.size(); i++) {
//            if(tmp2.get(i).equals("누리호")) {
//                tmp2Order = i;
//                break;
//            }
//        }
        quizzes.add(getArticleWithMultipleChoiceQuiz(
                tmp1.getFirst().article,
                CategoryType.SOCIETY,
                String.valueOf(tmp1.getFirst().wordLocation),
                tmp1.getFirst().multipleChoices)
        );
        quizzes.add(getArticleWithMultipleChoiceQuiz(
                tmp2.getFirst().article,
                CategoryType.POLITICS,
                String.valueOf(tmp2.getFirst().wordLocation),
                tmp2.getFirst().multipleChoices)
        );
        // OX 문제 4문제 생성
        List<Article> OXArticles = List.of(
                findById("8dfc3d09-1b9b-413a-9102-00bea54278e9"),
                findById("b8be30b2-4edc-49dc-995e-188273d5cab7"),
                findById("a78ce338-a736-4c8b-987a-1db291313227"),
                findById("48c04798-ac21-4023-96ad-12843a7406a2")
                );
        List<CategoryType> categories = List.of(CategoryType.CULTURE, CategoryType.INTERNATIONAL, CategoryType.ECONOMY, CategoryType.SPORTS);


        List<OXQuizQuestion> oxQuiz = null;
        try {
            oxQuiz = openAIUtils.generateOXQuiz(
                    OXArticles
                            .stream()
                            .map(Article::summary)
                            .toList()
            );

        } catch (JsonProcessingException e) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, String.format("quizzes is null"));
        }

        for (int i = 0; i < 4; i++) {
            OXQuiz quiz = new OXQuiz(QuizType.OX, oxQuiz.get(i).question(), oxQuiz.get(i).answer(), null);
            quizzes.add(ArticleWithQuiz.from(categories.get(i), OXArticles.get(i), quiz));
        }


        return quizzes;
    }


}
