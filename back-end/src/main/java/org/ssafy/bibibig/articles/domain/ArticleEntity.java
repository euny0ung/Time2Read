package org.ssafy.bibibig.articles.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Document(indexName = "hani-news-topic-index")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ArticleEntity {
    @Id
    @Field(name = "id", type = FieldType.Text)
    private String id;
    @Field(name = "한겨레ID", type = FieldType.Text)
    private String haniId;
    @Field(name = "제목", type = FieldType.Text)
    private String title;
    @Field(name = "대분류", type = FieldType.Text)
    private String mainCategory;
    @Field(name = "중분류", type = FieldType.Text)
    private String subCategory;
    @Field(name = "본문", type = FieldType.Text)
    private String content;
    @Field(name = "썸네일 이미지", type = FieldType.Text)
    private String image;
    @Field(name = "요약", type = FieldType.Text)
    private String summary;
    @Field(name = "작성시간", type = FieldType.Date, format = DateFormat.custom, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime wroteAt;
    @Field(name = "키워드", type = FieldType.Text)
    private List<String> keywords;

    public static ArticleEntity from(Map<String, Object> map) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return new ArticleEntity(
                (String) map.getOrDefault("대분류", ""),
                (String) map.getOrDefault("한겨레ID", ""),
                (String) map.getOrDefault("제목", ""),
                (String) map.getOrDefault("대분류", ""),
                (String) map.getOrDefault("중분류", ""),
                (String) map.getOrDefault("본문", ""),
                (String) map.getOrDefault("썸네일 이미지", ""),
                (String) map.getOrDefault("요약", ""),
                LocalDateTime.parse((String) map.get("작성시간"), formatter),
                extractKeyword(map)
        );
    }

    private static List<String> extractKeyword(Map<String, Object> map) {
        Object keywordsObj = map.get("키워드");
        if (keywordsObj instanceof List) {
            return (List<String>) keywordsObj;
        }
        return List.of();
    }
}
