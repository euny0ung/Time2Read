package org.ssafy.bibibig.articles.dao;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.ssafy.bibibig.articles.dto.CategoryType;
import org.ssafy.bibibig.articles.dto.KeywordTerms;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ArticleRepositoryCustomImplTest {

    @Autowired
    private ArticleRepositoryCustomImpl repository;

    @Test
    void getMultipleChoice() {
        // given
        int year = 2023;
        CategoryType categoryType = CategoryType.ECONOMY;
        String keyword = "주식";
        int count = 4;

        // when
        List<KeywordTerms> multipleChoice = repository.getMultipleChoice(year, categoryType, keyword, count);

        // then
        assertEquals(4, multipleChoice.size());
    }
}
