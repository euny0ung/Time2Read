package org.ssafy.bibibig.articles.dao;

import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.MoreLikeThisQueryBuilder;
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

import static org.elasticsearch.index.query.QueryBuilders.moreLikeThisQuery;

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

    // 랜덤 기사 추출하기
    @Override
    public ArticleEntity getRandomArticleByYearAndCategoryAndKeyword(int year, CategoryType category, String keyword) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(QueryBuilders.functionScoreQuery(
                        QueryBuilders.boolQuery()
                                .must(QueryBuilders.rangeQuery("작성시간")
                                        .gte(LocalDateTime.of(year, 1, 1, 0, 0).format(formatter))
                                        .lte(LocalDateTime.of(year + 1, 1, 1, 0, 0).format(formatter))
                                )
                                .must(QueryBuilders.matchQuery("대분류", category.getName()))
                                .must(QueryBuilders.matchQuery("키워드", keyword))
                                .must(QueryBuilders.matchQuery("요약", keyword)),
                        ScoreFunctionBuilders.randomFunction())
                ).withMaxResults(1)
                .build();
        SearchHits<ArticleEntity> search = operations.search(query, ArticleEntity.class);

        if(search.getTotalHits() == 0){
            return null;
        }
        return search.getSearchHit(0).getContent();
    }

    // 특정 기사와 관련된 기사 Top5개 뽑기
    @Override
    public List<ArticleEntity> getRelatedArticlesTop5(String id) {
        String index = "hani-news-topic-index";
        MoreLikeThisQueryBuilder.Item[] likeItems = {
                new MoreLikeThisQueryBuilder.Item(index, id)
        };
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(
                        moreLikeThisQuery(likeItems)
                                .minTermFreq(1)
                                .maxQueryTerms(12)
                )
                .build();
        //then
        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);
        List<ArticleEntity> result = searchHits.getSearchHits().stream()
                .limit(5)
                .map(SearchHit::getContent)
                .filter(ArticleEntity.class::isInstance)
                .map(ArticleEntity.class::cast)
                .toList();

        return result;
    }

    @Override
    public List<KeywordTerms> getMultipleChoice(int year, CategoryType category, String keyword, int count) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(
                        QueryBuilders.boolQuery()
                                .must(QueryBuilders.rangeQuery("작성시간")
                                        .gte(LocalDateTime.of(year, 1, 1, 0, 0).format(formatter))
                                        .lte(LocalDateTime.of(year + 1, 1, 1, 0, 0).format(formatter))
                                )
                                .must(QueryBuilders.matchQuery("대분류", category.getName()))
                                .mustNot(QueryBuilders.matchQuery("키워드", keyword))
                ).withMaxResults(0)
                .addAggregation(AggregationBuilders.terms("keyword_terms").field("키워드").size(count))
                .build();

        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);
        ParsedStringTerms pst = Objects.requireNonNull(searchHits.getAggregations()).get("keyword_terms");

        return pst.getBuckets().stream().map(s ->
                new KeywordTerms(s.getKey().toString(), s.getDocCount())
        ).toList();

    }
}


