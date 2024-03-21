package org.ssafy.bibibig.articles.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@Document(indexName = "hani-news-topic-index")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ArticleEntity {
    @Id
    @Field(name="id", type = FieldType.Text)
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
    @Field(name = "작성시간", type = FieldType.Text)
    private String wroteAt;
    @Field(name = "키워드", type = FieldType.Text)
    private List<String> keywords;
}
