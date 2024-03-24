package org.ssafy.bibibig.member.dto.response;

import org.ssafy.bibibig.member.domain.SolvedCategoriesEntity;

import java.time.LocalDateTime;

public record SolvedCategory (
        Long id,
        Long politic,
        Long economy,
        Long society,
        Long culture,
        Long sports,
        Long international,
        LocalDateTime createdAt
){
    public static SolvedCategory from(
            SolvedCategoriesEntity entity
    ){
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
}
