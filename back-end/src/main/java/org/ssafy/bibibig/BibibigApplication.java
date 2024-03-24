package org.ssafy.bibibig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.ssafy.bibibig.articles.dao.ArticleRepositoryCustom;
import org.ssafy.bibibig.member.dao.ElasticsearchMemberRepository;
import org.ssafy.bibibig.result.dao.ElasticsearchRelatedArticleRepository;

@EnableJpaRepositories(excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = {ArticleRepositoryCustom.class, ElasticsearchRelatedArticleRepository.class, ElasticsearchMemberRepository.class}))
@SpringBootApplication
public class BibibigApplication {

    public static void main(String[] args) {
        SpringApplication.run(BibibigApplication.class, args);
    }

}
