package org.ssafy.bibibig.oauth.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // todo 카테고리별 해결 개수 저장

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static Member of(Long id, String name, String email, LocalDateTime createdAt){
        return new Member(id, name, email, createdAt);
    }
}
