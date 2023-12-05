package com.example.simpledms.repository.shop;

import com.example.simpledms.model.entity.shop.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.shop
 * fileName : ProductRepository
 * author : GGG
 * date : 2023-11-08
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-08         GGG          최초 생성
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findAllByPnameContaining(String pname, Pageable pageable);
}
