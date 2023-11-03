package com.example.simpledms.controller.normal;

import com.example.simpledms.model.entity.normal.Faq;
import com.example.simpledms.service.normal.FaqService;
import lombok.extern.slf4j.Slf4j;
import oracle.ucp.proxy.annotation.Post;
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
 * packageName : com.example.simpledms.controller.normal
 * fileName : FaqController
 * author : GGG
 * date : 2023-10-24
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-24         GGG          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api/normal")
public class FaqController {
    @Autowired
    FaqService faqService;

    @GetMapping("/faq")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try{
            Pageable pageable = PageRequest.of(page, size);

            Page<Faq> faqPage = faqService.findAllByTitleContaining(title, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("faq", faqPage.getContent());
            response.put("currentPage", faqPage.getNumber());
            response.put("totalItems", faqPage.getTotalElements());
            response.put("totalPages", faqPage.getTotalPages());

            if(faqPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/faq")
    public ResponseEntity<Object> create(@RequestBody Faq faq) {

        try {
            Faq faq2 = faqService.save(faq); // db 저장

            return new ResponseEntity<>(faq2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/faq/{no}")
    public ResponseEntity<Object> updateFaq(
            @PathVariable int no,
            @RequestBody Faq faq
    ) {
        try{
            Faq faq1 = faqService.save(faq);
            return new ResponseEntity<>(faq1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/faq/{no}")
    public ResponseEntity<Object> findByID(@PathVariable int no) {
        try{
            Optional<Faq> optionalFaq = faqService.findByID(no);

            if(optionalFaq.isPresent()) {
                return new ResponseEntity<>(optionalFaq, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/faq/deletion/{no}")
    public ResponseEntity<Object> deleteFaq(@PathVariable int no) {
        try{
            boolean bSuccess = faqService.removeByID(no);
            if (bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
