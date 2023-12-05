package com.example.simpledms.controller.shop;

import com.example.simpledms.model.entity.shop.SimpleProduct;
import com.example.simpledms.service.shop.SimpleProductService;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.implementation.bytecode.ShiftRight;
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
 * fileName : SimpleProductController
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
@RestController
@Slf4j
@RequestMapping("/api/shop")
public class SimpleProductController {
    @Autowired
    SimpleProductService simpleProductService;

    @GetMapping("/simple-product")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<SimpleProduct> simpleProductPage = simpleProductService.findAllByTitleContaining(title, pageable);
            Map<String, Object> response = new HashMap<>();
            response.put("simpleProduct", simpleProductPage.getContent()); // 상품 배열
            response.put("currentPage", simpleProductPage.getNumber()); // 상품 배열
            response.put("totalItems", simpleProductPage.getTotalElements()); // 상품 배열
            response.put("totalPages", simpleProductPage.getTotalPages()); // 상품 배열

            if (simpleProductPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/simple-product")
    public ResponseEntity<Object> createSimpleProduct(@RequestBody SimpleProduct simpleProduct) {
        try {
            SimpleProduct simpleProduct1 = simpleProductService.save(simpleProduct);
            return new ResponseEntity<>(simpleProduct1, HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/simple-product/{spno}")
    public ResponseEntity<Object> findById(@PathVariable int spno) {
        try {
            Optional<SimpleProduct> optionalSimpleProduct = simpleProductService.findById(spno);
            if (optionalSimpleProduct.isPresent()) {
                return new ResponseEntity<>(optionalSimpleProduct, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/simple-product/{spno}")
    public ResponseEntity<Object> updateSimpleProduct(
            @PathVariable int spno,
            @RequestBody SimpleProduct simpleProduct
    ){
        try{
            SimpleProduct simpleProduct1 = simpleProductService.save(simpleProduct);
            return new ResponseEntity<>(simpleProduct1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
