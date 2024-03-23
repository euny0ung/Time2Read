package org.ssafy.bibibig.result.dao;

import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramInterval;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Repository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
@RequiredArgsConstructor
public class ElasticsearchRelatedArticleRepository {

    private final ElasticsearchOperations operations;

    public List<ArticleEntity> getRelatedArticles(String mainCategory,
                                            int nextYear,
                                            int lastYear,
                                            List<String> keywords,
                                            int minimumShouldMatch) {
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(getBoolQuery(mainCategory, nextYear, lastYear, keywords, minimumShouldMatch))
                .withMaxResults(0)
                .addAggregation(getAggregation())
                .build();

        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);
        ParsedStringTerms pst = Objects.requireNonNull(searchHits.getAggregations()).get("most_relate_per_year");

        List<ArticleEntity> articleList = new ArrayList<>();
        for (Terms.Bucket bucket : pst.getBuckets()) {
            SearchHits<ArticleEntity> hits = bucket.getAggregations().get("related_top_per_year");
            for (SearchHit<ArticleEntity> hit : hits) {
                articleList.add(hit.getContent());
            }
        }

        return articleList;
    }

    private static BoolQueryBuilder getBoolQuery(String mainCategory, int nextYear, int lastYear, List<String> keywords, int minimumShouldMatch) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery()
                .must(QueryBuilders.matchQuery("대분류", mainCategory))
                .must(QueryBuilders.rangeQuery("작성시간")
                        .gte(LocalDateTime.of(nextYear, 1, 1, 0, 0).format(formatter))
                        .lt(LocalDateTime.of(lastYear + 1, 1, 1, 0, 0).format(formatter))
                );
        keywords.forEach(key -> boolQuery.should(QueryBuilders.matchQuery("키워드", key)));
        boolQuery.minimumShouldMatch(minimumShouldMatch);
        return boolQuery;
    }

    private DateHistogramAggregationBuilder getAggregation() {
        return AggregationBuilders
                .dateHistogram("most_relate_per_year")
                .field("작성시간")
                .calendarInterval(DateHistogramInterval.YEAR)
                .format("yyyy")
                .subAggregation(
                        AggregationBuilders
                                .topHits("related_top_per_year")
                                .size(1)
                                .sort("_score", SortOrder.DESC)
                );
    }
}

