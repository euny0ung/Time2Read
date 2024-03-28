package org.ssafy.bibibig.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
@Getter
@ToString
@AllArgsConstructor
public class SolvedCategoryRequest {
    @JsonProperty("POLITICS")
    private int politics;
    @JsonProperty("SOCIETY")
    private int society;
    @JsonProperty("ECONOMY")
    private int economy;
    @JsonProperty("INTERNATIONAL")
    private int international;
    @JsonProperty("CULTURE")
    private int culture;
    @JsonProperty("SPORTS")
    private int sports;


}
