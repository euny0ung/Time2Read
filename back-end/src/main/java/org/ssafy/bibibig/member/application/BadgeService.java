package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.bibibig.member.dao.BadgesRepository;
import org.ssafy.bibibig.member.domain.BadgeEntity;
import org.ssafy.bibibig.member.dto.Badge;
import org.ssafy.bibibig.member.dto.response.BadgeResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeService {
    private final BadgesRepository badgesRepository;
    public List<BadgeResponse> getBadges(Long memberId){
        List<BadgeEntity> badgeEntities = badgesRepository.findByMemberId(memberId);
        List<BadgeResponse> badges = new ArrayList<>();
        for(BadgeEntity row : badgeEntities){
            Badge badge = Badge.from(row);
            badges.add(BadgeResponse.of(badge.getYear() ,badge.getCount()));
        }
        return badges;
    }
}
