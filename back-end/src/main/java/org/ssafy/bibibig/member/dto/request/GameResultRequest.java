package org.ssafy.bibibig.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class GameResultRequest {
    private boolean isSuccess;
    @JsonProperty("playYear")
    private int year;
    private int timeAttackTime;
    @JsonProperty("solvedCategory")
    private SolvedCategoryRequest solvedCategoryRequest;
}