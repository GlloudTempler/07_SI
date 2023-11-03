package com.example.simpledms.controller.basic;


import com.example.simpledms.model.entity.basic.Emp;
import com.example.simpledms.service.basic.EmpService;
import lombok.extern.slf4j.Slf4j;
import oracle.ucp.proxy.annotation.Post;
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
 * fileName : EmpController
 * author : GGG
 * date : 2023-10-23
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-23         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api/basic")
public class EmpController{
    @Autowired
    EmpService empService;

    @GetMapping("/emp")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String ename,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<Emp> empPage = empService.findAllByEnameContaining(ename, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("emp", empPage.getContent());
            response.put("currentPage", empPage.getNumber());
            response.put("totalItems", empPage.getTotalElements());
            response.put("totalPages", empPage.getTotalPages());

            if(empPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/emp")
    public ResponseEntity<Object> createEmp(@RequestBody Emp emp) {
        try {
            Emp emp1 = empService.save(emp);
            return new ResponseEntity<>(emp1, HttpStatus.OK);
        }catch(Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/emp/{eno}")
    public ResponseEntity<Object> findByID(
            @PathVariable int eno,
            @RequestBody Emp emp
            ) {
        try{
            Emp emp1 = empService.save(emp);
            return new ResponseEntity<>(emp1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/emp/{eno}")
    public ResponseEntity<Object> findByID(@PathVariable int eno) {
        try {
            Optional<Emp> optionalEmp = empService.findByID(eno);

            if(optionalEmp.isPresent()) {
                return new ResponseEntity<>(optionalEmp, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/emp/deletion/{eno}")
    public ResponseEntity<Object> deleteEmp(@PathVariable int eno) {
        try {
            boolean bSuccess = empService.removeByID(eno);
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
