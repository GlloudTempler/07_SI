package com.example.simpledms.controller.shop;

import com.example.simpledms.model.dto.shop.SimpleCartDto;
import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.model.entity.shop.SimpleCart;
import com.example.simpledms.service.shop.SimpleCartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.controller.shop
 * fileName : SimpleCartController
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
@RestController
@Slf4j
@RequestMapping("/api/shop")
public class SimpleCartController {
    @Autowired
    SimpleCartService simpleCartService;

    // 상세조회
    @GetMapping("/simple-cart/{scno}")
    public ResponseEntity<Object> findByID(@PathVariable int scno) {
        try {
            Optional<SimpleCartDto> optionalSimpleCartDto = simpleCartService.selectByID(scno);

            if(optionalSimpleCartDto.isPresent()) {
                return new ResponseEntity<>(optionalSimpleCartDto, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 저장함수
    @PostMapping("/simple-cart")
    public ResponseEntity<Object> createSimpleCart(@RequestBody SimpleCart simpleCart) {
        try{
            SimpleCart simpleCart1 = simpleCartService.save(simpleCart);

            return new ResponseEntity<>(simpleCart1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 전체 조회
    @GetMapping("/simple-cart")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ){
        try{
            Pageable pageable = PageRequest.of(page, size);

            Page<SimpleCartDto> simpleCartDtoPage = simpleCartService.selectByTitleContaining(title, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("simpleCart ", simpleCartDtoPage.getContent());
            response.put("currentPage", simpleCartDtoPage.getNumber());
            response.put("totalItems", simpleCartDtoPage.getTotalElements());
            response.put("totalPages", simpleCartDtoPage.getTotalPages());

            if(simpleCartDtoPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제 함수
    @DeleteMapping("/simple-cart/deletion/{dno}")
    public ResponseEntity<Object> deleteSimpleCart(@PathVariable int scno) {
        try{
            boolean bSuccess = simpleCartService.removeByID(scno);
            if(bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
