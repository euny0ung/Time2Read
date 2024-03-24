package org.ssafy.bibibig.result.dto.response;

import org.ssafy.bibibig.articles.dto.KeywordTerms;

public record KeywordTermsResponse(
        String text,
        long value
) {
    public static KeywordTermsResponse from(KeywordTerms keywordTerms){
        return new KeywordTermsResponse(
                keywordTerms.word(),
                keywordTerms.count()
        );
    }
}
