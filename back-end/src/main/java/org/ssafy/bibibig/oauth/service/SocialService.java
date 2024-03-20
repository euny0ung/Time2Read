package org.ssafy.bibibig.oauth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.oauth.domain.Member;
import org.ssafy.bibibig.oauth.dto.MemberInfo;
import org.ssafy.bibibig.oauth.dto.response.LoginResponse;
import org.ssafy.bibibig.oauth.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class SocialService {
    private final MemberRepository memberRepository;
    private HttpStatus httpStatus;

    @Transactional
    public MemberInfo checkLogin (MemberInfo memberInfo) {
        try {
            Member member = memberRepository.findByEmail(memberInfo.getEmail())
                    .orElseGet(() -> memberRepository.save(memberInfo.toEntity()));

             return MemberInfo.from(member);

        } catch (DataAccessException e) {
            //todo 예외처리
            System.out.println("데이터 저장 시 예외");
        } catch (Exception e) {
            //todo 예외처리
            System.out.println("예외 발생");
        }
        // todo 삭제 후 예외처리로 반환
        return null;
    }

}
