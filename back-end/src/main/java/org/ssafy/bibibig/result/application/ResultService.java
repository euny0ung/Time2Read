package org.ssafy.bibibig.result.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.articles.application.ArticleService;
import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.articles.dto.KeywordTerms;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.result.dao.ElasticsearchRelatedArticleRepository;
import org.ssafy.bibibig.result.dto.RelatedArticle;
import org.ssafy.bibibig.member.dto.request.GameResultRequest;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ResultService {

    private final ArticleService articleService;
    private final ElasticsearchRelatedArticleRepository relatedArticleRepository;
    private final MemberRepository memberRepository;

    public List<RelatedArticle> getRelatedArticlesFromPast(List<String> id) {
        return id
                .stream()
                .map(articleService::findById)
                .map(article -> new RelatedArticle(article.id(), articleToRelateArticle(article)))
                .toList();
    }

    public List<Article> getRelatedArticlesTop5(String id) {
        return articleService.getRelatedArticlesTop5(id);
    }

    public List<KeywordTerms> getTopKeywordsByYear(int year) {
        return articleService.getTopKeywordsByYear(year);
    }

    private List<Article> articleToRelateArticle(Article article) {
        List<ArticleEntity> relatedArticles = relatedArticleRepository.getRelatedArticles(
                article.id(),
                article.wroteAt().getYear() + 1,
                2030);

        return getArticles(article, relatedArticles);
    }

    private static List<Article> getArticles(Article article, List<ArticleEntity> relatedArticles) {
        List<Article> list = new ArrayList<>();
        list.add(article); // 첫 번째 위치에 과거(원본) 추가

        for (ArticleEntity entity : relatedArticles) {
            list.add(Article.from(entity));
        }
        return list;
    }
}
