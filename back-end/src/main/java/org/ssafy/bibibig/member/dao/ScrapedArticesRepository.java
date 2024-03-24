package org.ssafy.bibibig.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.bibibig.member.domain.ScrapedArticleEntity;

import java.util.List;
import java.util.Optional;

public interface ScrapedArticesRepository extends JpaRepository<ScrapedArticleEntity,Long> {
    Optional<ScrapedArticleEntity> findByMemberIdAndArticleId(Long memberId, String articleId);

    List<ScrapedArticleEntity> findByMemberId(Long memberId);
}
