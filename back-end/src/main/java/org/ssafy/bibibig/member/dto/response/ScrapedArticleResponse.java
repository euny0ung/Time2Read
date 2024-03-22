package org.ssafy.bibibig.member.dto.response;

public record ScrapedArticleResponse(
        String id,
        String mainCategory,
        String subCategory,
        String title,
        String time,
        String image,
        String summary

) {
    public static ScrapedArticleResponse of(
            String id,
            String mainCategory,
            String subCategory,
            String title,
            String time,
            String image,
            String summary
    ){
        return new ScrapedArticleResponse(id,mainCategory,subCategory,title,time,image,summary);
    }

}
