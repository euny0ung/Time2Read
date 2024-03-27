package org.ssafy.bibibig.articles.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

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

    public static CategoryType findByName(String korean){
        return Arrays.stream(CategoryType.values())
                .filter(type -> type.getName().equals(korean))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("알맞은 대분류를 찾을 수 없습니다."));
    }
}
