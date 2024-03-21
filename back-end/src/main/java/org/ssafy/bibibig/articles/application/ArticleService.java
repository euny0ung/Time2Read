package org.ssafy.bibibig.articles.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.articles.dao.ElasticsearchArticleRepository;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.articles.dto.ArticleWithQuiz;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.quiz.dto.Quiz;
import org.ssafy.bibibig.quiz.utils.QuizUtils;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ElasticsearchArticleRepository articleRepository;
    private final QuizUtils quizUtils;

    public Article findById(String id) {
        return getArticleEntityOrThrowException(id);
    }

    public ArticleWithQuiz getArticleWithQuiz(String id) {
        Article article = getArticleEntityOrThrowException(id);
        return ArticleWithQuiz.from(article, makeQuiz(article));
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
