package org.ssafy.bibibig.member.dao;

import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermsQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Repository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ElasticsearchMemberRepository {

    private final ElasticsearchOperations operations;

    public List<ArticleEntity> getAllArticles(List<String> id) {
        TermsQueryBuilder termsQuery = QueryBuilders.termsQuery("id", id);
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(termsQuery)
                .build();

        return operations.search(searchQuery, ArticleEntity.class)
                .stream()
                .map(SearchHit::getContent)
                .toList();
    }
}
