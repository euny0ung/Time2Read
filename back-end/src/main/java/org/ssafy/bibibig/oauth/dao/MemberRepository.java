package org.ssafy.bibibig.oauth.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.bibibig.oauth.domain.Member;

import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

}
