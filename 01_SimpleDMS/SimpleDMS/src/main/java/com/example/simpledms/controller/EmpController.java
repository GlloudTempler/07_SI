package com.example.simpledms.controller;

import com.example.simpledms.model.Dept;
import com.example.simpledms.model.Emp;
import com.example.simpledms.service.EmpService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.controller
 * fileName : EmpController
 * author : GGG
 * date : 2023-10-19
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-19         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class EmpController {
    @Autowired
    EmpService empService;

    @GetMapping("/emp")
    public ResponseEntity<Object> getEmpAll(
            @RequestParam(defaultValue = "") String ename
    ) {
        try{
            List<Emp> list = empService.findByEnameConataining(ename);
            if(list.isEmpty() == false) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/emp")
    public ResponseEntity<Object> createEmp(
            @RequestBody Emp emp
    ){
        try{
//            저장함수 호출
            Emp emp1 = empService.saveEmp(emp);
            return new ResponseEntity<>(emp1, HttpStatus.OK);

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 상세 조회 */
    @GetMapping("/emp/{eno}")
    public ResponseEntity<Object> getEmpID(
            @PathVariable int eno
    ) {
        try{
            Optional<Emp> optionalEmp = empService.findByID(eno);
            if(optionalEmp.isEmpty() == false) {
                return new ResponseEntity<>(optionalEmp, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 수정 함수 */
    @PutMapping("/emp/{eno}")
    public ResponseEntity<Object> updateEmp(
            @PathVariable int eno,
            @RequestBody Emp emp
    ){
        try{
//            저장(수정)함수 호출
            Emp emp1 = empService.saveEmp(emp);
            return new ResponseEntity<>(emp1, HttpStatus.OK);

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 삭제 함수 */
    @DeleteMapping("/emp/deletion/{eno}")
    public ResponseEntity<Object> deleteEmp(
            @PathVariable int eno
    ) {
        try{
//            삭제 함수 호출
            boolean bSuccess = empService.removeByID(eno);
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
