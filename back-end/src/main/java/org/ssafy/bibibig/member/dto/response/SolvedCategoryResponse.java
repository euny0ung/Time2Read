package org.ssafy.bibibig.member.dto.response;

public record SolvedCategoryResponse(
        int social,
        int politics,
        int economy,
        int international,
        int culture,
        int sports
) {
    public static SolvedCategoryResponse of(
            int social,
            int politics,
            int economy,
            int international,
            int culture,
            int sports
    ) {
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
