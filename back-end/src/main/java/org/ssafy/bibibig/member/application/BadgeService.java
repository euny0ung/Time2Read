package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.BadgesRepository;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.dto.Badge;
import org.ssafy.bibibig.member.dto.Member;

import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BadgeService {
    private final BadgesRepository badgesRepository;
    private final MemberRepository memberRepository;

    public List<Badge> getBadges(Long memberId) {
        return badgesRepository.findByMemberId(memberId)
                .stream()
                .map(Badge::from)
                .sorted(Comparator.comparingInt(Badge::getYear))
                .toList();
    }

    @Transactional
    public void saveBadge(Long memberId, int year) {
        try {
            badgesRepository.findByMemberIdAndYear(memberId, year)
                    .ifPresentOrElse((badgeEntity) -> {
                        badgesRepository.save(Badge.from(badgeEntity).toEntityCountUp());
                    }, () -> {
                        MemberEntity memberEntity = memberRepository.findById(memberId)
                                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
                        badgesRepository.save(Badge.toEnitiy(null, year, 1, null, Member.from(memberEntity)));
                    });
        } catch (Exception e) {
            log.error("Error occurred while saving badge for memberId: {} and year: {}", memberId, year, e);
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
