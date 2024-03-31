package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.dao.SolvedCategoryRepository;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.domain.SolvedCategoriesEntity;
import org.ssafy.bibibig.member.dto.request.SolvedCategoryRequest;
import org.ssafy.bibibig.member.dto.response.SolvedCategory;

@Slf4j
@Service
@RequiredArgsConstructor
public class SolvedCategoryService {
    private final MemberRepository memberRepository;
    private final SolvedCategoryRepository solvedCategoryRepository;

    public SolvedCategory getSolvedCategory(Long memberId){
        System.out.println(memberId);
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        return SolvedCategory.from(memberEntity.getSolvedCategoriesEntity());

    }

    @Transactional
    public void saveSolvedCategory(Long memberId, SolvedCategoryRequest solvedCategoryRequest) {
        try {
            SolvedCategoriesEntity solvedCategoriesEntity = solvedCategoryRepository.findById(memberId)
                    .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
            solvedCategoryRepository.save(SolvedCategory.from(solvedCategoriesEntity).toEntitiySumCount(
                    solvedCategoryRequest.getPolitics(),
                    solvedCategoryRequest.getEconomy(),
                    solvedCategoryRequest.getSociety(),
                    solvedCategoryRequest.getCulture(),
                    solvedCategoryRequest.getSports(),
                    solvedCategoryRequest.getInternational()
            ));
        }catch(Exception e){
            log.error("Error occurred while saving solvedCategory for memberId: {} and solvedCategory: {}", memberId, solvedCategoryRequest, e);
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

    }
}
