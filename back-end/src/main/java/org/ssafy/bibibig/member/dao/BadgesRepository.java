package org.ssafy.bibibig.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.bibibig.member.domain.BadgeEntity;

import java.util.List;
import java.util.Optional;

public interface BadgesRepository extends JpaRepository<BadgeEntity,Long> {
    List<BadgeEntity> findByMemberId(Long memberId);

    Optional<BadgeEntity> findByMemberIdAndYear(Long memberId, int yaer);
}
