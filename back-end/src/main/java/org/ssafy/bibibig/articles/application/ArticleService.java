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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

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

    public ArticleWithQuiz getArticleWithQuiz(Article article) {
        return ArticleWithQuiz.from(article, makeQuiz(article));
    }
    public List<ArticleWithQuiz> getArticleWithQuizes(int year) {
        List<ArticleWithQuiz> result = new ArrayList<>();
        List<CategoryType> randomCategory = randomCategory();
        List<CategoryType> categories= List.of(CategoryType.values());

        for(CategoryType category : categories) {
            int size = Collections.frequency(randomCategory, category);
            List<KeywordTerms> keywords = getTopKeywordsByYearAndCategory(year, category, size);
            for(KeywordTerms keyword : keywords) {
                Article article = getRandomArticleByYearAndCategoryAndKeyword(year, category, keyword.word());
                result.add(getArticleWithQuiz(article));
            }
        }
        return result;
    }

    private List<KeywordTerms> getTopKeywordsByYearAndCategory(int year, CategoryType categoryType, int size) {
        List<KeywordTerms> result = new ArrayList<>();
        List<KeywordTerms> keywordList = articleRepository.getTopKeywordsByYearAndCategory(year, categoryType);
        Random random = new Random();

        for(int i = 0; i < size; i++) {
            int randomIdx = random.nextInt(keywordList.size());
            result.add(keywordList.get(randomIdx));
        }
        return result;
    }


    /**
     * 1. 년도 선택
     * 2. 대분류 6개 + 랜덤 4개 [완료]
     * 3. 년도 대분류 -> 키워드 100개 추출하여 픽
     * 4. 년도 대분류 키워드 -> 기사 하나 조회 (같은 기사일 경우 재요청)
     * 5. 기사별 문제 생성 [완료]
     */

    private Article getRandomArticleByYearAndCategoryAndKeyword(int year, CategoryType category, String keyword) {
        return Article.from(articleRepository.getRandomArticleByYearAndCategoryAndKeyword(year, category, keyword));
    }

    // 랜덤카테고리
    private List<CategoryType> randomCategory() {
        // 대분류 별 기사가 전부 들어있지 않은 관계로
        return List.of(CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS, CategoryType.POLITICS);
//        List<CategoryType> categoryList = new ArrayList<>(List.of(CategoryType.values()));
//        Random random = new Random();
//        for(int i = 0; i < 4; i++) {
//            int randomIdx = random.nextInt(CategoryType.values().length);
//            categoryList.add(CategoryType.values()[randomIdx]);
//        }
//        return categoryList;
    }


    private Quiz makeQuiz(Article article) {
        return quizUtils.makeQuiz(article);
    }

    private Article getArticleEntityOrThrowException(String id) {
        return Article.from(articleRepository.findById(id).orElseThrow(() ->
                        new CommonException(ErrorCode.ARTICLE_NOT_FOUND, String.format("article id : %s is not founded", id))
                )
        );
    }

}
