package org.ssafy.bibibig.articles.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.ssafy.bibibig.articles.dao.ElasticsearchArticleRepository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
class ArticleServiceTest {

    @Autowired
    ElasticsearchOperations operations;
    @Autowired
    ElasticsearchArticleRepository articleRepository;

    //ES에서 데이터 조회 테스트
    @Test
    @DisplayName("id로 데이터 조회하기")
    public void searchById() throws IOException {
        String id = "2f630765-7955-46d2-97f6-b849086d609b";

        Criteria criteria = Criteria.where("id").is(id);
        Query query = new CriteriaQuery(criteria);
        SearchHits<ArticleEntity> search = operations.search(query, ArticleEntity.class);

        List<ArticleEntity> article = search.stream().map(SearchHit::getContent).collect(Collectors.toList());

        System.out.println("result : ");
        System.out.println(article);
    }

}