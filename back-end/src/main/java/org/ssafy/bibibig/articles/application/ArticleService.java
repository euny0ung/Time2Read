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

    public ArticleWithQuiz getArticleWithQuiz(Article article, CategoryType category) {
        return ArticleWithQuiz.from(category, article, makeQuiz(article));
    }

    public ArticleWithQuiz getArticleWithQuiz(Article article, CategoryType category, String keyword) {
        return ArticleWithQuiz.from(category, article, makeQuiz(article, keyword));
    }

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
                result.add(getArticleWithQuiz(article.article, category, article.word));
            }
        }
        return result;

    }

    public List<ArticleWithQuiz> getFirstArticleWithQuizzes(int year) {
        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> randomCategory = firstCategory();
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
                result.add(getArticleWithQuiz(article.article, category, article.word));
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

    // 기사 랜덤 뽑기
    private List<ArticleWithWord> getRandomArticleByYearAndCategoryAndKeyword(int year, int size, CategoryType category, List<KeywordTerms> keywords) {
        List<ArticleWithWord> result = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            List<Integer> randoms = getRandomNumber(keywords.size());
            for (int j = 0; j < randoms.size(); j++) {
                int randomNumber = randoms.get(j);
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

    private List<Integer> getRandomNumber(int keywordSize) {
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
    private List<CategoryType> firstCategory() {
        return List.of(CategoryType.POLITICS, CategoryType.ECONOMY, CategoryType.CULTURE, CategoryType.INTERNATIONAL, CategoryType.SPORTS, CategoryType.INTERNATIONAL);
//        List<CategoryType> categoryList = new ArrayList<>();
//        Random random = new Random();
//        for (int i = 0; i < 6; i++) {
//            int randomIdx = random.nextInt(CategoryType.values().length);
//            categoryList.add(CategoryType.values()[randomIdx]);
//        }
//        return categoryList;
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


    private Quiz makeQuiz(Article article) {
        return quizUtils.makeQuiz(article);
    }

    private Quiz makeQuiz(Article article, String keyword) {
        return quizUtils.makeQuiz(article, keyword);
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

}
