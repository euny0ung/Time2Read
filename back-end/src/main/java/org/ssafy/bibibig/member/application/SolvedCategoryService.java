package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.dto.response.SolvedCategory;

@Service
@RequiredArgsConstructor
public class SolvedCategoryService {
    private final MemberRepository memberRepository;

    public SolvedCategory getSolvedCategory(Long memberId){
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        return SolvedCategory.from(memberEntity.getSolvedCategoriesEntity());

    }
}
