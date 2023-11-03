package com.example.simpledms.controller.basic;

import com.example.simpledms.model.entity.basic.Customer;
import com.example.simpledms.model.entity.basic.Qna;
import com.example.simpledms.service.basic.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
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
 * packageName : com.example.simpledms.controller.basic
 * fileName : CustomerController
 * author : GGG
 * date : 2023-10-24
 * description : 고객 컨트롤러
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-24         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/basic")
public class CustomerController {

    @Autowired
    CustomerService customerService; // DI

    //    전체 조회 + fullName/email like 검색
    @GetMapping("/customer")
    public ResponseEntity<Object> findAllByContaining(
            @RequestParam(defaultValue = "fullName") String searchSelect,
            @RequestParam(defaultValue = "") String searchKeyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ){
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<Customer> customerPage; // customer 페이지 정의

            if(searchSelect.equals("fullName")) {
                //            fullName like 검색
                customerPage
                        = customerService.findAllByFullNameContaining(searchKeyword, pageable);
            } else {
                //            email like 검색
                customerPage
                        = customerService.findAllByEmailContaining(searchKeyword, pageable);
            }

//          리액트 전송 : customer배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String , Object> response = new HashMap<>();
            response.put("customer", customerPage.getContent()); // customer배열
            response.put("currentPage", customerPage.getNumber()); // 현재페이지번호
            response.put("totalItems", customerPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", customerPage.getTotalPages()); // 총페이지수

            if (customerPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/customer")
    public ResponseEntity<Object> create(@RequestBody Customer customer) {
        try{
            Customer customer1 = customerService.save(customer);

            return new ResponseEntity<>(customer1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/customer/{cid}")
    public ResponseEntity<Object> updateCustomer(@PathVariable int cid,
                                                 @RequestBody Customer customer) {
        try {
            Customer customer1 = customerService.save(customer);
            return new ResponseEntity<>(customer1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/customer/{cid}")
    public ResponseEntity<Object> findByID(@PathVariable int cid) {
        try {
            Optional<Customer> optionalCustomer = customerService.findByID(cid);

            if(optionalCustomer.isPresent()) {
                return new ResponseEntity<>(optionalCustomer, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/customer/deletion/{cid}")
    public ResponseEntity<Object> deleteCustomer(@PathVariable int cid) {
        try {
            boolean dSuccess = customerService.removeByID(cid);
            if(dSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}