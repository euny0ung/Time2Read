package org.ssafy.bibibig.articles.dao;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import org.ssafy.bibibig.articles.domain.ArticleEntity;

import java.util.Optional;

@Repository
public interface ElasticsearchArticleRepository extends ElasticsearchRepository<ArticleEntity, String> {
    Optional<ArticleEntity> findByHaniId(String haniId);
    Optional<ArticleEntity> findById(String id);
}


