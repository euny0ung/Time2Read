package org.ssafy.bibibig.member.dao;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ElasticsearchMemberRepositoryTest {

    @Autowired
    private ElasticsearchMemberRepository repository;

    @Test
    @DisplayName("id에 맞는 모든 기사 데이터")
    public void getAllArticles() {
        // given
        List<String> id = List.of(
                "10648964-7421-4ac9-b874-400a05021562",
                "09503608-e9cc-463d-9137-6573968d8725",
                "6dfed17b-e294-43ab-b01a-177ae3c3a383"
        );

        // when
        List<ArticleEntity> allArticles = repository.getAllArticles(id);

        // then
        assertEquals(id.size(), allArticles.size());
    }
}