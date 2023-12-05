package com.example.simpledms.controller.basic;

import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.service.basic.DeptService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.controller.basic
 * fileName : DeptController
 * author : GGG
 * date : 2023-10-23
 * description : 부서 컨트롤러
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-23         GGG          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api/basic")
public class DeptController {
    @Autowired
    DeptService deptService; // DI

    // 전체조회 + dname like 검색
    @GetMapping("/dept")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String dname,
            @RequestParam(defaultValue = "0") int page, // 페이지 처리를 위한 공통 변수
            @RequestParam(defaultValue = "3") int size
    ) {
        try{
            // 페이지 변수 저장 (page : 현재 페이지 번호 , size : 1페이지 당 개수)
            // 함수 매개변수 : Pagable(위의 값을 넣기)
            Pageable pageable = PageRequest.of(page, size);

            Page<Dept> deptPage = deptService.findAllByDnameContaining(dname, pageable);

            // 리액트 전송 : 부서 배열, 페이징 정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("dept", deptPage.getContent()); // 부서 배열
            response.put("currentPage", deptPage.getNumber()); // 현재 페이지 번호
            response.put("totalItems", deptPage.getTotalElements()); // 총 건수
            response.put("totalPages", deptPage.getTotalPages()); // 총 페이지 건수

            if(deptPage.isEmpty() == false) {
                // 성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                // 데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // 부서 생성
    @PostMapping("/dept")
    public ResponseEntity<Object> createDept(@RequestBody Dept dept) {
        try{
            Dept dept1 = deptService.save(dept);

            return new ResponseEntity<>(dept1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // 부서 수정
    @PutMapping("/dept/{dno}")
    public ResponseEntity<Object> updateDept(
            @PathVariable int dno,
            @RequestBody Dept dept
    ) {
        try {
            Dept dept1 = deptService.save(dept);
            return new ResponseEntity<>(dept1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // 상세 조회
    @GetMapping("/dept/{dno}")
    public ResponseEntity<Object> findByID(@PathVariable int dno) {
        try {
            Optional<Dept> optionalDept = deptService.findByID(dno);

            if(optionalDept.isPresent()) {
                return new ResponseEntity<>(optionalDept, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // 부서 삭제
    @DeleteMapping("/dept/deletion/{dno}")
    public ResponseEntity<Object> deleteDept(@PathVariable int dno) {
        try{
            boolean bSuccess = deptService.removeByID(dno);
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
