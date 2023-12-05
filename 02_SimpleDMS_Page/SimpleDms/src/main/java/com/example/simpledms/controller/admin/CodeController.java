package com.example.simpledms.controller.admin;

import com.example.simpledms.model.dto.admin.CodeDto;
import com.example.simpledms.model.entity.admin.Code;
import com.example.simpledms.model.entity.admin.CodeCategory;
import com.example.simpledms.service.admin.CodeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.controller.admin
 * fileName : CodeController
 * author : GGG
 * date : 2023-11-07
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-07         GGG          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api/admin")
public class CodeController {
    @Autowired
    CodeService codeService; // di
    /* like 검색 페이징 */
    @GetMapping("/code")
    public ResponseEntity<Object> selectByCodeNameContaining(
            @RequestParam(defaultValue ="") String codeName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ){
        try{
            Pageable pageable = PageRequest.of(page, size);

            Page<CodeDto> codeDtoPage = codeService.selectByCodeNameContaining(codeName, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("code", codeDtoPage.getContent()); //대분류 코드 배열
            response.put("currentPage", codeDtoPage.getNumber()); // 현재 페이지 번호
            response.put("totalItems", codeDtoPage.getTotalElements()); // 총 건수
            response.put("totalPages", codeDtoPage.getTotalPages()); // 총 페이지 건수

            if(codeDtoPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/code")
    public ResponseEntity<Object> createCode(@RequestBody Code code) {
        try{
            Code code1 = codeService.save(code);
            return new ResponseEntity<>(code1, HttpStatus.OK);

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/code/{codeId}")
    public ResponseEntity<Object> updateCode(
            @PathVariable int codeId,
            @RequestBody Code code
    ) {
        try {
            Code code1 = codeService.save(code);
            return new ResponseEntity<>(code1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/code/{codeId}")
    public ResponseEntity<Object> findByCodeId(@PathVariable int codeId) {
        try{
            Optional<Code> optionalCode = codeService.findById(codeId);
            if (optionalCode.isPresent()) {
                return new ResponseEntity<>(optionalCode, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/code/all")
    public ResponseEntity<Object> findAllNoPage(){
        try{
            List<CodeDto> codeDtoListList = codeService.selectALlNoPage();
            if(codeDtoListList.isEmpty() == false) {
                return new ResponseEntity<>(codeDtoListList, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
