package org.ssafy.bibibig.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.bibibig.member.domain.TimeAttacksEntity;

import java.util.List;

public interface TimeAttackRecordRepository extends JpaRepository<TimeAttacksEntity, Long> {
    List<TimeAttacksEntity> findByMemberId(Long memberId);
}
