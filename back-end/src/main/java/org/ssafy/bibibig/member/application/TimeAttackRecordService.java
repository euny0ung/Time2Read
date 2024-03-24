package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ssafy.bibibig.member.dao.TimeAttackRecordRepository;
import org.ssafy.bibibig.member.domain.BadgeEntity;
import org.ssafy.bibibig.member.domain.TimeAttacksEntity;
import org.ssafy.bibibig.member.dto.Badge;
import org.ssafy.bibibig.member.dto.TimeAttack;
import org.ssafy.bibibig.member.dto.response.BadgeResponse;
import org.ssafy.bibibig.member.dto.response.TimeAttackResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeAttackRecordService {

    private final TimeAttackRecordRepository timeAttackRecordRepository;
    public List<TimeAttackResponse> getRecords(Long memberId){
        List<TimeAttacksEntity> timeAttacksEntities = timeAttackRecordRepository.findByMemberId(memberId);
        List<TimeAttackResponse> records = new ArrayList<>();
        for(TimeAttacksEntity row : timeAttacksEntities){
            TimeAttack timeAttack = TimeAttack.from(row);
            records.add(TimeAttackResponse.of(timeAttack.getTimeAttackTime() ,timeAttack.getCreatedAt()));
        }
        return records;
    }
}
