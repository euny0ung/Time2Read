package org.ssafy.bibibig.result.dao;

import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.MoreLikeThisQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
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

import static org.elasticsearch.index.query.QueryBuilders.moreLikeThisQuery;

@Repository
@RequiredArgsConstructor
public class ElasticsearchRelatedArticleRepository {

    private static final String MOST_RELATE_PER_YEAR = "most_relate_per_year";
    private static final String RELATED_TOP_PER_YEAR = "related_top_per_year";

    private final ElasticsearchOperations operations;


    public List<ArticleEntity> getRelatedArticles(String id, int nextYear, int lastYear) {
        String index = "hani-news-topic-index";

        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(
                        QueryBuilders.boolQuery()
                                .must(getMostLikeThisQuery(index, id))
                                .must(getDateRangeQuery(nextYear, lastYear))

                ).withMaxResults(0)
                .addAggregation(getAggregation())
                .build();

        return doQuery(query);
    }

    private static RangeQueryBuilder getDateRangeQuery(int nextYear, int lastYear) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return QueryBuilders.rangeQuery("작성시간")
                .gte(LocalDateTime.of(nextYear, 1, 1, 0, 0).format(formatter))
                .lt(LocalDateTime.of(lastYear, 1, 1, 0, 0).format(formatter));
    }


    private static MoreLikeThisQueryBuilder getMostLikeThisQuery(String index, String id) {
        MoreLikeThisQueryBuilder.Item[] likeItems = {
                new MoreLikeThisQueryBuilder.Item(index, id)
        };
        return moreLikeThisQuery(likeItems)
                .maxQueryTerms(12)
                .minTermFreq(3)
                .minDocFreq(5)
                .maxDocFreq(Integer.MAX_VALUE)
                .minWordLength(0)
                .maxWordLength(0)
                .minimumShouldMatch("50%")
                .boostTerms(0.0f)
                .include(false)
                .failOnUnsupportedField(false)
                .boost(1.0f);
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

