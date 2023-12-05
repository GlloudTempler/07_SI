package com.example.simpledms.controller.shop;

import com.example.simpledms.model.entity.shop.Product;
import com.example.simpledms.model.entity.shop.SimpleProduct;
import com.example.simpledms.service.shop.ProductService;
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
 * fileName : ProductController
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
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/product")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String pname,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<Product> productPage = productService.findAllByPnameContaining(pname, pageable);
            Map<String, Object> response = new HashMap<>();
            response.put("product", productPage.getContent()); // 상품 배열
            response.put("currentPage", productPage.getNumber()); // 상품 배열
            response.put("totalItems", productPage.getTotalElements()); // 상품 배열
            response.put("totalPages", productPage.getTotalPages()); // 상품 배열

            if (productPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/product")
    public ResponseEntity<Object> createProduct(@RequestBody Product product) {
        try {
            Product product1 = productService.save(product);
            return new ResponseEntity<>(product1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/product/{pno}")
    public ResponseEntity<Object> findById(@PathVariable int pno) {
        try {
            Optional<Product> optionalProduct = productService.findById(pno);
            if (optionalProduct.isPresent()) {
                return new ResponseEntity<>(optionalProduct, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/product/{pno}")
    public ResponseEntity<Object> updateProduct(
            @PathVariable int pno,
            @RequestBody Product product
    ){
        try{
            Product product1 = productService.save(product);
            return new ResponseEntity<>(product1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
