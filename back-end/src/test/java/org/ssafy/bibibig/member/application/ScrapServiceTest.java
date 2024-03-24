package org.ssafy.bibibig.member.application;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.common.utils.MainCategory;
import org.ssafy.bibibig.member.application.fixture.MemberFixture;
import org.ssafy.bibibig.member.dao.ElasticsearchMemberRepository;
import org.ssafy.bibibig.member.dao.ScrapedArticesRepository;
import org.ssafy.bibibig.member.domain.ScrapedArticleEntity;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class ScrapServiceTest {

    @InjectMocks
    private ScrapService service;

    @Mock
    private ElasticsearchMemberRepository elasticsearchMemberRepository;

    @Mock
    private ScrapedArticesRepository scrapedArticesRepository;

    @Test
    @DisplayName("스크랩한 기사 그룹핑 테스트")
    public void grouping() {
        // given
        List<ScrapedArticleEntity> scraped = getScraped();
        List<ArticleEntity> articles = getArticles();
        List<String> id = scraped.stream().map(ScrapedArticleEntity::getArticleId).toList();

        when(scrapedArticesRepository.findByMemberId(any(Long.class))).thenReturn(scraped);
        when(elasticsearchMemberRepository.getAllArticles(id)).thenReturn(articles);

        // when
        Map<String, List<ArticleEntity>> result = service.getScrapedArticles(1L).data();

        // then
        assertEquals(6, result.size());
        assertEquals(2, result.get(MainCategory.POLITICS.getEnglish()).size());
        assertEquals(1, result.get(MainCategory.ECONOMY.getEnglish()).size());
        assertEquals(1, result.get(MainCategory.CULTURE.getEnglish()).size());
        assertEquals(1, result.get(MainCategory.SPORTS.getEnglish()).size());
        assertEquals(1, result.get(MainCategory.INTERNATIONAL.getEnglish()).size());
        assertEquals(1, result.get(MainCategory.SOCIAL.getEnglish()).size());
    }

    private static List<ScrapedArticleEntity> getScraped() {
        return List.of(
                MemberFixture.getScrapedArticleForGrouping(),
                MemberFixture.getScrapedArticleForGrouping(),
                MemberFixture.getScrapedArticleForGrouping(),
                MemberFixture.getScrapedArticleForGrouping(),
                MemberFixture.getScrapedArticleForGrouping(),
                MemberFixture.getScrapedArticleForGrouping(),
                MemberFixture.getScrapedArticleForGrouping()
        );
    }

    private static List<ArticleEntity> getArticles() {
        return List.of(
                MemberFixture.getArticleForGrouping(MainCategory.POLITICS.getKorean()),
                MemberFixture.getArticleForGrouping(MainCategory.POLITICS.getKorean()),
                MemberFixture.getArticleForGrouping(MainCategory.ECONOMY.getKorean()),
                MemberFixture.getArticleForGrouping(MainCategory.CULTURE.getKorean()),
                MemberFixture.getArticleForGrouping(MainCategory.SPORTS.getKorean()),
                MemberFixture.getArticleForGrouping(MainCategory.INTERNATIONAL.getKorean()),
                MemberFixture.getArticleForGrouping(MainCategory.SOCIAL.getKorean())
        );
    }
}