package org.ssafy.bibibig.oauth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
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

    @Transactional
    public LoginResponse checkLogin (MemberInfo memberInfo) {
        try {
            if (memberRepository.existsByEmail(memberInfo.getEmail())) {
                // 로그인 가능
            } else {
                // 회원가입
                Member member = memberInfo.toEntity();
                memberRepository.save(member);
            }
            return LoginResponse.of(memberInfo.getName());
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
