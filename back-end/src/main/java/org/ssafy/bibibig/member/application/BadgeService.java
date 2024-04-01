package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.BadgesRepository;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.domain.BadgeEntity;
import org.ssafy.bibibig.member.domain.MemberEntity;
import org.ssafy.bibibig.member.dto.Badge;
import org.ssafy.bibibig.member.dto.Member;
import org.ssafy.bibibig.member.dto.response.BadgeResponse;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BadgeService {
    private final BadgesRepository badgesRepository;
    private final MemberRepository memberRepository;

    public List<BadgeResponse> getBadges(Long memberId) {
        List<BadgeEntity> badgeEntities = badgesRepository.findByMemberId(memberId);
        List<BadgeResponse> badges = new ArrayList<>();
        for (BadgeEntity row : badgeEntities) {
            Badge badge = Badge.from(row);
            badges.add(BadgeResponse.of(badge.getYear(), badge.getCount()));
        }
        return badges;
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
