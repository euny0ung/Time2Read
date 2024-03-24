package org.ssafy.bibibig.common.utils;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum MainCategory {
    SOCIAL("사회", "social"),
    POLITICS("정치", "politics"),
    ECONOMY("경제", "economy"),
    INTERNATIONAL("국제", "international"),
    CULTURE("문화", "culture"),
    SPORTS("스포츠", "sports");

    private final String korean, english;

    MainCategory(String korean, String english) {
        this.korean = korean;
        this.english = english;
    }

    public static String findByKorean(String korean){
        return Arrays.stream(MainCategory.values())
                .filter(e -> e.korean.equals(korean))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("대분류를 찾을 수 없습니다."))
                .english;
    }

}
