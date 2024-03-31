package org.ssafy.bibibig.articles.dao;

import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.articles.dto.CategoryType;
import org.ssafy.bibibig.articles.dto.KeywordTerms;

import java.util.List;

public interface ArticleRepositoryCustom {
    List<KeywordTerms> getTopKeywordsByYear(int year);

    List<KeywordTerms> getTopKeywordsByYearAndCategory(int year, CategoryType category);

    ArticleEntity getRandomArticleByYearAndCategoryAndKeyword(int year, CategoryType category, String keyword);

    List<ArticleEntity> getRelatedArticlesTop5(String id);

    List<KeywordTerms> getMultipleChoice(int year, CategoryType category, String keyword, int count);

    ArticleEntity getRandomArticleByYearAndCategory(int year, int size, CategoryType category);
}


