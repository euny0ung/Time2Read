package org.ssafy.bibibig.articles.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.articles.dao.ArticleRepository;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.articles.dto.ArticleWithQuiz;
import org.ssafy.bibibig.articles.dto.CategoryType;
import org.ssafy.bibibig.articles.dto.KeywordTerms;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.quiz.dto.Quiz;
import org.ssafy.bibibig.quiz.utils.QuizUtils;

import java.util.ArrayList;
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

    public ArticleWithQuiz getArticleWithQuiz(String id) {
        Article article = getArticleEntityOrThrowException(id);
        return ArticleWithQuiz.from(article, makeQuiz(article));
    }

    /**
     * 1. 년도 선택
     * 2. 대분류 6개 + 랜덤 4개 [완료]
     * 3. 년도 대분류 -> 키워드 100개 추출하여 랜덤으로 매칭
     * 4. 년도 대분류 키워드 -> 기사 하나 조회 (같은 기사일 경우 재요청)
     * 5. 기사별 문제 생성 [완료]
     */
    public List<ArticleWithQuiz> articles(int year) {

        return null;
    }

    private Article getRandomArticleByYearAndCategoryAndKeyword(int year, CategoryType category, String keyword) {
        return Article.from(articleRepository.getRandomArticleByYearAndCategoryAndKeyword(year, category, keyword));
    }

    // 랜덤카테고리
    private List<CategoryType> randomCategory() {
        List<CategoryType> categoryList = new ArrayList<>(List.of(CategoryType.values()));
        Random random = new Random();
        for(int i = 0; i < 4; i++) {
            int randomIdx = random.nextInt(CategoryType.values().length);
            categoryList.add(CategoryType.values()[randomIdx]);
        }
        return categoryList;
    }


    private Quiz makeQuiz(Article article) {
        return quizUtils.makeQuiz(article);
    }

    private Article getArticleEntityOrThrowException(String id) {
        return Article.from(articleRepository.findById(id).orElseThrow(() ->
                        new CommonException(ErrorCode.ARTICLE_NOT_FOUND, String.format("articles id : %s is not founded", id))
                )
        );
    }

}
