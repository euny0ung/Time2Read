package org.ssafy.bibibig.articles.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryType {
    POLITICS("정치"),
    SOCIETY("사회"),
    ECONOMY("경제"),
    INTERNATIONAL("국제"),
    CULTURE("문화"),
    SPORTS("스포츠");

    private final String name;
}
