package com.example.simpledms.controller;

import com.example.simpledms.model.Dept;
import com.example.simpledms.service.DeptService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.controller
 * fileName : Dept
 * author : GGG
 * date : 2023-10-19
 * description : 부서 컨트롤러 (@RestController -react 용)
 * 요약 :
 *       react(port:3000) <-> springboot(port:8000) 연동 : axios
 *       인터넷 기본 보안 : ip, port 최초에 지정된 것과 달라지면
 *                        => 해킹으로 기본 인정 (blocking : 단절) CORS 보안
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-19         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class DeptController {
    @Autowired
    DeptService deptService; // DI

    /* 전체 조회  + like 검색 */
    @GetMapping("/dept")
    public ResponseEntity<Object> getDeptAll(
            @RequestParam(defaultValue = "") String dname
    ) {
        try{
//            전체조회 + like 검색
            List<Dept> list = deptService.findByDnameContaining(dname);
            if (list.isEmpty() == false){
                return new ResponseEntity<>(list, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 저장 함수 */
    @PostMapping("/dept")
    public ResponseEntity<Object> createDept(
            @RequestBody Dept dept
    ){
        try{
//            저장함수 호출
            Dept dept1 = deptService.saveDept(dept);
            return new ResponseEntity<>(dept1, HttpStatus.OK);

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 상세 조회 */
    @GetMapping("/dept/{dno}")
    public ResponseEntity<Object> getDeptID(
            @PathVariable int dno
    ) {
        try{
//            상세조회
            Optional<Dept> optionalDept = deptService.findByID(dno);
            if (optionalDept.isEmpty() == false){
                return new ResponseEntity<>(optionalDept.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 수정 함수 */
    @PutMapping("/dept/{dno}")
    public ResponseEntity<Object> updateDept(
            @PathVariable int dno,
            @RequestBody Dept dept
    ){
        try{
//            저장(수정)함수 호출
            Dept dept1 = deptService.saveDept(dept);
            return new ResponseEntity<>(dept1, HttpStatus.OK);

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 삭제 함수 */
    @DeleteMapping("/dept/deletion/{dno}")
    public ResponseEntity<Object> deleteDept(
            @PathVariable int dno
    ) {
        try{
//            삭제 함수 호출
            boolean bSuccess = deptService.removeByID(dno);
            if(bSuccess == true) {
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
