package org.ssafy.bibibig.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ssafy.bibibig.member.domain.SolvedCategoriesEntity;

public interface SolvedCategoryRepository extends JpaRepository<SolvedCategoriesEntity,Long> {
}
