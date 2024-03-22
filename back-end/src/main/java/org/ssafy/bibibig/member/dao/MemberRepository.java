package org.ssafy.bibibig.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.bibibig.member.domain.MemberEntity;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    Optional<MemberEntity> findByEmail(String email);

}
