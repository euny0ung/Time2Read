package org.ssafy.bibibig.member.dto.response;

import java.util.List;

public record ScrapedArticlesByMainCateResponse(
        List<ScrapedArticleResponse> politic,
        List<ScrapedArticleResponse> economy,
        List<ScrapedArticleResponse> society,
        List<ScrapedArticleResponse> culture,
        List<ScrapedArticleResponse> sports,
        List<ScrapedArticleResponse> international
) {

    public static ScrapedArticlesByMainCateResponse of(
            List<ScrapedArticleResponse> politic,
            List<ScrapedArticleResponse> economy,
            List<ScrapedArticleResponse> society,
            List<ScrapedArticleResponse> culture,
            List<ScrapedArticleResponse> sports,
            List<ScrapedArticleResponse> international
    ) {
        return new ScrapedArticlesByMainCateResponse(
                politic,
                economy,
                society,
                culture,
                sports,
                international
        );
    }

}
