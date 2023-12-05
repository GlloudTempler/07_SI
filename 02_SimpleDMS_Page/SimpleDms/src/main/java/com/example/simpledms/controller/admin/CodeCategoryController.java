package com.example.simpledms.controller.admin;

import com.example.simpledms.model.entity.admin.CodeCategory;
import com.example.simpledms.service.admin.CodeCategoryService;
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


/**
 * packageName : com.example.simpledms.controller.admin
 * fileName : CodeCategoryController
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
public class CodeCategoryController {
    @Autowired
    CodeCategoryService codeCategoryService;

    /* like 검색 페이징 */
    @GetMapping("/code-category")
    public ResponseEntity<Object> findAllByCategoryNameContaining(
            @RequestParam(defaultValue = "") String categoryName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<CodeCategory> codeCategoryPage = codeCategoryService.findAllByCategoryNameContaining(categoryName, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("codeCategory", codeCategoryPage.getContent()); //대분류 코드 배열
            response.put("currentPage", codeCategoryPage.getNumber()); // 현재 페이지 번호
            response.put("totalItems", codeCategoryPage.getTotalElements()); // 총 건수
            response.put("totalPages", codeCategoryPage.getTotalPages()); // 총 페이지 건수

            if (codeCategoryPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/code-category")
    public ResponseEntity<Object> createCodeCategory(@RequestBody CodeCategory codeCategory) {
        try {
            CodeCategory codeCategory1 = codeCategoryService.save(codeCategory);
            return new ResponseEntity<>(codeCategory1, HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* 페이징 없는 전체 조회 */
    @GetMapping("/code-category/all")
    public ResponseEntity<Object> findAllByCategoryNameContainingNoPage() {
        try {
            List<CodeCategory> codeCategoryList = codeCategoryService.findAll();

            if (codeCategoryList.isEmpty() == false) {
                return new ResponseEntity<>(codeCategoryList, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(codeCategoryList, HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
