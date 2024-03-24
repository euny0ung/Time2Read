package org.ssafy.bibibig.member.dto.response;

public record SolvedCategoryResponse (
        Long social,
        Long politics,
        Long economy,
        Long international,
        Long culture,
        Long sports
        ){
        public static SolvedCategoryResponse of(
                Long social,
                Long politics,
                Long economy,
                Long international,
                Long culture,
                Long sports
        ){
                return new SolvedCategoryResponse(
                 social,
                 politics,
                 economy,
                 international,
                 culture,
                 sports
                );
        }
}
