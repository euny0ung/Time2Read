package org.ssafy.bibibig.result.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.articles.application.ArticleService;
import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.result.dao.ElasticsearchRelatedArticleRepository;
import org.ssafy.bibibig.result.dto.response.RelatedArticleResponse;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ResultService {

    private final ArticleService articleService;
    private final ElasticsearchRelatedArticleRepository relatedArticleRepository;

    public List<RelatedArticleResponse> getRelatedArticles(List<String> id) {
        return id
                .stream()
                .map(articleService::findById)
                .map(article -> new RelatedArticleResponse(article.id(), articleToRelateArticle(article)))
                .toList();
    }

    private String toFormat(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return localDateTime.format(formatter);
    }

    private Article articleToRelateArticle(Article article) {
        String tmp = toFormat(article.wroteAt());

        ArticleEntity relatedArticles = relatedArticleRepository.getRelatedArticles(
                article.mainCategory(),
                toFormat(article.wroteAt()),
                "2024-12-13 23:59",
                article.keywords().get(0),
                article.keywords().get(1),
                article.keywords().get(2),
                article.keywords().get(3),
                article.keywords().get(4),
                1);
        relatedArticles = relatedArticles;

        return Article.from(relatedArticles
        );
    }
}
