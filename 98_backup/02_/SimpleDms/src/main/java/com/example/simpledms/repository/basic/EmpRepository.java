package com.example.simpledms.repository.basic;

import com.example.simpledms.model.entity.basic.Emp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.basic
 * fileName : EmpRepository
 * author : GGG
 * date : 2023-10-23
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-23         GGG          최초 생성
 */
@Repository
public interface EmpRepository  extends JpaRepository<Emp, Integer> {
    Page<Emp> findAllByEnameContaining(String ename, Pageable pageable);
}
