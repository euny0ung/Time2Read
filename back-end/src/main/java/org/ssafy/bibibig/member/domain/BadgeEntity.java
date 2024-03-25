package org.ssafy.bibibig.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="badge")
public class BadgeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private int year;
    private int count;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberEntity member;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    private BadgeEntity(int year, int count){
        this.year = year;
        this.count = count;
    }
    public static BadgeEntity of(Long id, int year, int count, LocalDateTime createdAt, MemberEntity member){
        return new BadgeEntity(id, year, count, createdAt, member);
    }

}