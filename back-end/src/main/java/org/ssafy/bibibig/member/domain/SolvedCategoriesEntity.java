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
@Table(name="solved_categories")
public class SolvedCategoriesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long politic;
    private Long economy;
    private Long society;
    private Long culture;
    private Long sports;
    private Long international;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (politic == null) {politic = 0L;}
        if (economy == null) {economy = 0L;}
        if (society == null) {society = 0L;}
        if (culture == null) {culture = 0L;}
        if (sports == null) {sports = 0L;}
        if (international == null) {international = 0L;}
    }

    public static SolvedCategoriesEntity of(){
        return new SolvedCategoriesEntity();
    }
    public static SolvedCategoriesEntity of(Long id, Long politic, Long economy, Long society, Long culture, Long sports, Long international, LocalDateTime createdAt){
        return new SolvedCategoriesEntity(id, politic, economy, society, culture, sports, international, createdAt);
    }
}
