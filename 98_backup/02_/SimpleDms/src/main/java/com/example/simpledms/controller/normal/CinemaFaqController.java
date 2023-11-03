package com.example.simpledms.controller.normal;

import com.example.simpledms.model.entity.normal.CinemaFaq;
import com.example.simpledms.model.entity.normal.Faq;
import com.example.simpledms.service.normal.CinemaFaqService;
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
 * packageName : com.example.simpledms.controller.normal
 * fileName : CinemaFaqController
 * author : GGG
 * date : 2023-10-25
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-25         GGG          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api/normal")
public class CinemaFaqController {
    @Autowired
    CinemaFaqService cinemaFaqService;

    @GetMapping("/cinema-faq")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String question,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try{
            Pageable pageable = PageRequest.of(page, size);

            Page<CinemaFaq> cinemaFaq = cinemaFaqService.findAllByQuestionContaining(question, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("cinemaFaq", cinemaFaq.getContent());
            response.put("currentPage", cinemaFaq.getNumber());
            response.put("totalItems", cinemaFaq.getTotalElements());
            response.put("totalPages", cinemaFaq.getTotalPages());

            if(cinemaFaq.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/cinema-faq")
    public ResponseEntity<Object> create(@RequestBody CinemaFaq cinemaFaq) {
        try{
            CinemaFaq cinemaFaq1 = cinemaFaqService.save(cinemaFaq);
            return new ResponseEntity<>(cinemaFaq1, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/cinema-faq/{cfno}")
    public ResponseEntity<Object> updateCinemaFaq(
            @PathVariable int cfno,
            @RequestBody CinemaFaq cinemaFaq
            ) {
        try{
            CinemaFaq cinemaFaq1 = cinemaFaqService.save(cinemaFaq);
            return new ResponseEntity<>(cinemaFaq1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/cinema-faq/{cfno}")
    public ResponseEntity<Object> findByID(@PathVariable int cfno) {
        try{
            Optional<CinemaFaq> optionalCinemaFaq = cinemaFaqService.findByID(cfno);
            if(optionalCinemaFaq.isPresent()) {
                return new ResponseEntity<>(optionalCinemaFaq, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/cinema-faq/deletion/{cfno}")
    public ResponseEntity<Object> deleteCinemaFaq(@PathVariable int cfno) {
        try {
            boolean bSuccess = cinemaFaqService.removeByID(cfno);
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
