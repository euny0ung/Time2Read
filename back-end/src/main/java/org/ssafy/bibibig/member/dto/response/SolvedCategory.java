package org.ssafy.bibibig.member.dto.response;

import org.ssafy.bibibig.member.domain.SolvedCategoriesEntity;

import java.time.LocalDateTime;

public record SolvedCategory(
        Long id,
        int politic,
        int economy,
        int society,
        int culture,
        int sports,
        int international,
        LocalDateTime createdAt
) {
    public static SolvedCategory from(SolvedCategoriesEntity entity) {
        return new SolvedCategory(
                entity.getId(),
                entity.getPolitic(),
                entity.getEconomy(),
                entity.getSociety(),
                entity.getCulture(),
                entity.getSports(),
                entity.getInternational(),
                entity.getCreatedAt()
        );
    }

    public SolvedCategoriesEntity toEntitiySumCount(
            int politicCnt,
            int economyCnt,
            int societyCnt,
            int cultureCnt,
            int sportsCnt,
            int internationalCnt
    ) {
        return SolvedCategoriesEntity.of(
                id,
                politic + politicCnt,
                economy + economyCnt,
                society + societyCnt,
                culture + cultureCnt,
                sports + sportsCnt,
                international + internationalCnt,
                createdAt
        );
    }
}
