package org.ssafy.bibibig.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "solved_categories")
public class SolvedCategoriesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ColumnDefault("0")
    private int politic;
    @ColumnDefault("0")
    private int economy;
    @ColumnDefault("0")
    private int society;
    @ColumnDefault("0")
    private int culture;
    @ColumnDefault("0")
    private int sports;
    @ColumnDefault("0")
    private int international;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static SolvedCategoriesEntity of() {
        return new SolvedCategoriesEntity();
    }

    public static SolvedCategoriesEntity of(Long id, int politic, int economy, int society, int culture, int sports, int international, LocalDateTime createdAt) {
        return new SolvedCategoriesEntity(id, politic, economy, society, culture, sports, international, createdAt);
    }
}
