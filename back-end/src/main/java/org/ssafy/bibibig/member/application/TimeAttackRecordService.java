package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dao.MemberRepository;
import org.ssafy.bibibig.member.dao.TimeAttackRecordRepository;
import org.ssafy.bibibig.member.domain.TimeAttacksEntity;
import org.ssafy.bibibig.member.dto.Member;
import org.ssafy.bibibig.member.dto.TimeAttack;
import org.ssafy.bibibig.member.dto.response.TimeAttackResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeAttackRecordService {

    private final TimeAttackRecordRepository timeAttackRecordRepository;
    private final MemberRepository memberRepository;

    public List<TimeAttackResponse> getRecords(Long memberId) {
        List<TimeAttacksEntity> timeAttacksEntities = timeAttackRecordRepository.findByMemberIdOrderByTimeAttackTime(memberId);
        List<TimeAttackResponse> records = new ArrayList<>();
        for (TimeAttacksEntity row : timeAttacksEntities) {
            TimeAttack timeAttack = TimeAttack.from(row);
            records.add(TimeAttackResponse.of(timeAttack.getTimeAttackTime(), timeAttack.getCreatedAt()));
        }
        return records;
    }

    @Transactional
    public void saveRecord(Long memberId, int time) {
        memberRepository.findById(memberId).ifPresentOrElse((memberEntity) -> {
            timeAttackRecordRepository.save(TimeAttack.of(time, null, Member.from(memberEntity)).toEntity());
        }, () -> {
            throw new CommonException(ErrorCode.USER_NOT_FOUND);
        });

    }
}
