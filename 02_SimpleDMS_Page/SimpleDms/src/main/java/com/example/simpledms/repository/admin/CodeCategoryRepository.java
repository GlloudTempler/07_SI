package com.example.simpledms.repository.admin;

import com.example.simpledms.model.entity.admin.CodeCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.admin
 * fileName : CodeCategoryRepository
 * author : GGG
 * date : 2023-11-07
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-07         GGG          최초 생성
 */
@Repository
public interface CodeCategoryRepository extends JpaRepository<CodeCategory, Integer> {
    // like 검색 : 쿼리 메서드 (JPQL)
    Page<CodeCategory> findAllByCategoryNameContaining(String categoryName, Pageable pageable);


}
