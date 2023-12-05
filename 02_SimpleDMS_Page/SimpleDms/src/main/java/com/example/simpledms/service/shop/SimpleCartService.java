package com.example.simpledms.service.shop;

import com.example.simpledms.model.dto.shop.SimpleCartDto;
import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.model.entity.shop.SimpleCart;
import com.example.simpledms.repository.shop.SimpleCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.shop
 * fileName : SimpleCartService
 * author : GGG
 * date : 2023-11-09
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-09         GGG          최초 생성
 */
@Service
public class SimpleCartService {
    @Autowired
    SimpleCartRepository simpleCartRepository;

    // like 검색
    // 전체 조회 + 페이징
    public Page<SimpleCartDto> selectByTitleContaining(
            String title,
            Pageable pageable) {
        Page<SimpleCartDto> page = simpleCartRepository.selectByTitleContaining(title, pageable);

        return page;
    }

    // 저장함수
    public SimpleCart save(SimpleCart simpleCart) {
        SimpleCart simpleCart1 = simpleCartRepository.save(simpleCart);
        return simpleCart1;
    }

    // 상세 조회
    public Optional<SimpleCartDto> selectByID(int scno) {
        Optional<SimpleCartDto> optionalSimpleCartDto = simpleCartRepository.selectById(scno);
        return optionalSimpleCartDto;
    }

    // 삭제함수
    public boolean removeByID(int scno) {
        if(simpleCartRepository.existsById(scno)) {
            simpleCartRepository.deleteById(scno);
            return true;
        }
        return false;
    }
}
