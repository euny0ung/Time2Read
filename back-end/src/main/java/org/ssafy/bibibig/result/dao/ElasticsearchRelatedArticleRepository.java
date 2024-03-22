package org.ssafy.bibibig.result.dao;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;
import org.ssafy.bibibig.articles.domain.ArticleEntity;


public interface ElasticsearchRelatedArticleRepository extends ElasticsearchRepository<ArticleEntity, String> {


    @Query("{\"bool\": {\"must\": [{\"match\": {\"대분류\": :mainCategory}}, {\"range\": {\"작성시간\": {\"gte\": :gte, \"lte\": :lte}}}], \"should\": [{\"match\": {\"키워드\": :keyword1}}, {\"match\": {\"키워드\": :keyword2}}, {\"match\": {\"키워드\": :keyword3}}, {\"match\": {\"키워드\": :keyword4}}, {\"match\": {\"키워드\": :keyword5}}], \"minimum_should_match\": :minimum_should_match}, \"size\": 0, \"aggs\": {\"most_relate_per_year\": {\"date_histogram\": {\"field\": \"작성시간\", \"calendar_interval\": \"year\", \"format\": \"yyyy\"}, \"aggs\": {\"related_top_per_year\": {\"top_hits\": {\"size\": 1, \"sort\": [{\"_score\": {\"order\": \"desc\"}}]}}}}}}")
    ArticleEntity getRelatedArticles(@Param("mainCategory") String mainCategory,
                                     @Param("gte") String gte,
                                     @Param("lte") String lte,
                                     @Param("keyword1") String keyword1,
                                     @Param("keyword2") String keyword2,
                                     @Param("keyword3") String keyword3,
                                     @Param("keyword4") String keyword4,
                                     @Param("keyword5") String keyword5,
                                     @Param("minimum_should_match") int minimum_should_match);

}
