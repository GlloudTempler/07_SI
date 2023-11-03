package com.example.simpledms.repository.basic;

import com.example.simpledms.model.entity.basic.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.basic
 * fileName : CustomerRepository
 * author : GGG
 * date : 2023-10-24
 * description : 고객 CRUD 레포지토리
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-24         GGG          최초 생성
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    //    fullName like 검색
    Page<Customer> findAllByFullNameContaining(String fullName, Pageable pageable);

    //    email like 검색
    Page<Customer> findAllByEmailContaining(String email, Pageable pageable);
}