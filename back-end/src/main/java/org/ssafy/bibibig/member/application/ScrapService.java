package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.bibibig.articles.application.ArticleService;
import org.ssafy.bibibig.articles.dao.ArticleRepository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.ElasticsearchMemberRepository;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.dao.ScrapedArticesRepository;
import org.ssafy.bibibig.member.domain.ScrapedArticleEntity;
import org.ssafy.bibibig.member.dto.ScrapedArticles;
import org.ssafy.bibibig.member.dto.response.ScrapedArticleResponse;
import org.ssafy.bibibig.member.dto.response.ScrapedArticlesByMainCateResponse;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScrapService {
    private final ScrapedArticesRepository scrapedArticesRepository;
    private final MemberRepository memberRepository;
    private final ElasticsearchMemberRepository elasticsearchMemberRepository;
    private final ArticleService articleService;

    public void changeScrapStatus(String articleId, boolean status, Long memberId) {
        scrapedArticesRepository.findByMemberIdAndArticleId(memberId, articleId).ifPresentOrElse((scrapEntity) -> {
            if (!status) scrapedArticesRepository.delete(scrapEntity);
        }, () -> {
            if (status) {
                memberRepository.findById(memberId).ifPresentOrElse((memberEntity) -> {
                    ScrapedArticles scrap = ScrapedArticles.of(null, articleId, null, memberEntity);
                    ScrapedArticleEntity scrapedArticleEntity = scrap.toEntity();
                    scrapedArticesRepository.save(scrapedArticleEntity);
                }, () -> {
                    throw new CommonException(ErrorCode.INVALID_TOKEN);
                });
            }
        });
    }

    public ScrapedArticlesByMainCateResponse getScrapedArticles(Long memberId) {
        List<ScrapedArticleEntity> scrapedArticlesEntity = scrapedArticesRepository.findByMemberId(memberId);
        List<String> id = scrapedArticlesEntity
                .stream()
                .map(ScrapedArticleEntity::getArticleId)
                .toList();

        Map<String, List<ArticleEntity>> grouping = elasticsearchMemberRepository.getAllArticles(id)
                .stream()
                .collect(Collectors.groupingBy(ArticleEntity::getMainCategory));

        return ScrapedArticlesByMainCateResponse.from(grouping);
    }

    public Article getScrapedArticle(String articleId) {
        return articleService.findById(articleId);
    }
}
