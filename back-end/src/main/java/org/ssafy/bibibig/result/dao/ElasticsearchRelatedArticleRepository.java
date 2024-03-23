package org.ssafy.bibibig.result.dao;

import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.histogram.DateHistogramInterval;
import org.elasticsearch.search.aggregations.bucket.histogram.Histogram;
import org.elasticsearch.search.aggregations.bucket.histogram.ParsedDateHistogram;
import org.elasticsearch.search.aggregations.metrics.ParsedTopHits;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Repository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ElasticsearchRelatedArticleRepository {

    private static final String MOST_RELATE_PER_YEAR = "most_relate_per_year";
    private static final String RELATED_TOP_PER_YEAR = "related_top_per_year";

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

        return doQuery(query);
    }

    private List<ArticleEntity> doQuery(NativeSearchQuery query) {
        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);

        Aggregations aggregations = searchHits.getAggregations();

        if (aggregations == null) return List.of();

        return extractArticleEntities(aggregations);
    }

    private static List<ArticleEntity> extractArticleEntities(Aggregations aggregations) {
        List<ArticleEntity> articles = new ArrayList<>();

        for (Aggregation aggregation : aggregations.asList()) {
            if (aggregation instanceof ParsedDateHistogram dateHistogram) {
                for (Histogram.Bucket bucket : dateHistogram.getBuckets()) {
                    ParsedTopHits hits = bucket.getAggregations().get(RELATED_TOP_PER_YEAR);

                    hits.getHits().forEach(h -> articles.add(ArticleEntity.from(h.getSourceAsMap())));
                }
            }
        }
        return articles;
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
                .dateHistogram(MOST_RELATE_PER_YEAR)
                .field("작성시간")
                .calendarInterval(DateHistogramInterval.YEAR)
                .format("yyyy")
                .subAggregation(
                        AggregationBuilders
                                .topHits(RELATED_TOP_PER_YEAR)
                                .size(1)
                                .sort("_score", SortOrder.DESC)
                );
    }
}

