package org.ssafy.bibibig.articles.dao;

import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.functionscore.ScoreFunctionBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Repository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.articles.dto.CategoryType;
import org.ssafy.bibibig.articles.dto.KeywordTerms;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Repository
@RequiredArgsConstructor
public class ArticleRepositoryCustomImpl implements ArticleRepositoryCustom {

    private final ElasticsearchOperations operations;


    //해당 년도에서 많이 사용된 키워드 찾기
    @Override
    public List<KeywordTerms> getTopKeywordsByYear(int year) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(QueryBuilders.boolQuery()
                        .must(QueryBuilders.rangeQuery("작성시간")
                                .gte(LocalDateTime.of(year, 1, 1, 0, 0).format(formatter))
                                .lte(LocalDateTime.of(year + 1, 1, 1, 0, 0).format(formatter))
                        )
                ).withMaxResults(0)
                .addAggregation(AggregationBuilders.terms("keyword_terms").field("키워드").size(50))
                .build();
        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);
        ParsedStringTerms pst = Objects.requireNonNull(searchHits.getAggregations()).get("keyword_terms");

        return pst.getBuckets().stream().map(s ->
                new KeywordTerms(s.getKey().toString(), s.getDocCount())
        ).toList();
    }

    //해당 년도의 대분류에서 많이 사용된 키워드 찾기
    @Override
    public List<KeywordTerms> getTopKeywordsByYearAndCategory(int year, CategoryType category) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(QueryBuilders.boolQuery()
                        .must(QueryBuilders.matchQuery("대분류", category.getName()))
                        .must(QueryBuilders.rangeQuery("작성시간")
                                .gte(LocalDateTime.of(year, 1, 1, 0, 0).format(formatter))
                                .lte(LocalDateTime.of(year + 1, 1, 1, 0, 0).format(formatter))
                        )
                ).withMaxResults(0)
                .addAggregation(AggregationBuilders.terms("keyword_terms").field("키워드").size(50))
                .build();
        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);
        ParsedStringTerms pst = Objects.requireNonNull(searchHits.getAggregations()).get("keyword_terms");

        return pst.getBuckets().stream().map(s ->
                new KeywordTerms(s.getKey().toString(), s.getDocCount())
        ).toList();
    }

    @Override
    public ArticleEntity getRandomArticleByYearAndCategoryAndKeyword(int year, CategoryType category, String keyword) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(QueryBuilders.functionScoreQuery(
                        QueryBuilders.boolQuery()
                                .must(QueryBuilders.matchQuery("대분류", category.getName()))
                                .must(QueryBuilders.matchQuery("키워드", keyword))
                                .must(QueryBuilders.rangeQuery("작성시간")
                                        .gte(LocalDateTime.of(year, 1, 1, 0, 0).format(formatter))
                                        .lte(LocalDateTime.of(year + 1, 1, 1, 0, 0).format(formatter))
                                ),
                        ScoreFunctionBuilders.randomFunction())
                ).withMaxResults(1)
                .build();
        SearchHit<ArticleEntity> search = operations.search(query, ArticleEntity.class).getSearchHit(0);
        ArticleEntity article = search.getContent();
        return article;
    }
}


