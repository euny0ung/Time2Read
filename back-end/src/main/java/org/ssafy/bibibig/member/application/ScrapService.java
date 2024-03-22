package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.bibibig.articles.application.ArticleService;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.dao.ScrapedArticesRepository;
import org.ssafy.bibibig.member.domain.ScrapedArticleEntity;
import org.ssafy.bibibig.member.dto.ScrapedArticles;
import org.ssafy.bibibig.member.dto.response.ScrapedArticleResponse;
import org.ssafy.bibibig.member.dto.response.ScrapedArticlesByMainCateResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScrapService {
    private final ScrapedArticesRepository scrapedArticesRepository;
    private final MemberRepository memberRepository;
    private final ArticleService articleService;
    public void changeScrapStatus(String articleId, boolean status, Long memberId){
        scrapedArticesRepository.findByMemberIdAndArticleId(memberId, articleId).ifPresentOrElse((scrapEntity)->{
            if(!status) scrapedArticesRepository.delete(scrapEntity);
        },()->{
            if(status) {
                memberRepository.findById(memberId).ifPresentOrElse((memberEntity) -> {
                    ScrapedArticles scrap = ScrapedArticles.of(null,articleId,null, memberEntity);
                    ScrapedArticleEntity scrapedArticleEntity = scrap.toEntity();
                    scrapedArticesRepository.save(scrapedArticleEntity);
                }, () -> {
                    throw new CommonException(ErrorCode.INVALID_TOKEN);
                });
            }
        });
    }

    // id리스트를 하나씩 es로 조회 후 main cate로 수동 매핑
    public ScrapedArticlesByMainCateResponse getScrapedArticles(Long memberId){

        List<ScrapedArticleResponse> politic = new ArrayList<>();
        List<ScrapedArticleResponse> economy = new ArrayList<>();
        List<ScrapedArticleResponse> society = new ArrayList<>();
        List<ScrapedArticleResponse> culture = new ArrayList<>();
        List<ScrapedArticleResponse> sports = new ArrayList<>();
        List<ScrapedArticleResponse> international = new ArrayList<>();

        List<ScrapedArticleEntity> scrapedArticlesEntity = scrapedArticesRepository.findByMemberId(memberId);
        for(ScrapedArticleEntity scrap : scrapedArticlesEntity){
            Article article = articleService.findById(ScrapedArticles.from(scrap).getArticleId());

            ScrapedArticleResponse scrapedArticel = ScrapedArticleResponse.of(
                    article.id(),
                    article.mainCategory(),
                    article.subCategory(),
                    article.title(),
                    article.wroteAt(),
                    article.image(),
                    article.summary()
            );

            switch (article.mainCategory()){
                case "정치":
                    politic.add(scrapedArticel);
                    break;
                case "경제":
                    economy.add(scrapedArticel);
                    break;
                case "사회":
                    society.add(scrapedArticel);
                    break;
                case "문화":
                    culture.add(scrapedArticel);
                    break;
                case "스포츠":
                    sports.add(scrapedArticel);
                    break;
                case "국제":
                    international.add(scrapedArticel);
                    break;
            }

        }
        return ScrapedArticlesByMainCateResponse.of(
                politic,
                economy,
                society,
                culture,
                sports,
                international
        );

    }
}
