package org.ssafy.bibibig.articles.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.articles.dao.ElasticsearchArticleRepository;
import org.ssafy.bibibig.articles.dto.Article;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private ElasticsearchArticleRepository articleRepository;

    //TODO: 에러코드 추가해야함
    public Article findById(String id) {
        return Article.from(articleRepository.findById(id).orElseThrow());
    }
}
