package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.SolvedCategoryRepository;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.domain.SolvedCategoriesEntity;
import org.ssafy.bibibig.member.dto.Member;
import org.ssafy.bibibig.member.dao.MemberRepository;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final MemberRepository memberRepository;
    private final SolvedCategoryRepository solvedCategoryRepository;
    @Transactional
    public Member checkLogin (Member memberInfo) {
        try {
            MemberEntity memberEntity = memberRepository.findByEmail(memberInfo.getEmail())
                    .orElseGet(() -> {
                        SolvedCategoriesEntity solvedCategoriesEntity = solvedCategoryRepository.save(SolvedCategoriesEntity.of());
                        return memberRepository.save(memberInfo.toEntity(solvedCategoriesEntity));
                    });
            return Member.from(memberEntity);
        } catch (Exception e) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
