package com.example.simpledms.controller.normal;

import com.example.simpledms.model.dto.normal.ReplyBoardDto;
import com.example.simpledms.model.dto.normal.ThreadBoardDto;
import com.example.simpledms.model.entity.normal.ThreadBoard;
import com.example.simpledms.service.normal.ThreadBoardService;
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
 * fileName : ThreadBoardController
 * author : GGG
 * date : 2023-10-26
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-26         GGG          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api/normal")
public class ThreadBoardController {
    @Autowired
    ThreadBoardService threadBoardService;

    // 전체 조회
    @GetMapping("/thread-board")
    public ResponseEntity<Object> selectByConnectByPage(
            @RequestParam(defaultValue = "") String subject,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ){
        try{
            Pageable pageable = PageRequest.of(page, size);

            Page<ThreadBoardDto> threadBoardDtoPage = threadBoardService.selectByConnectByPage(subject, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("threadBoard", threadBoardDtoPage.getContent());
            response.put("currentPage", threadBoardDtoPage.getNumber());
            response.put("totalItems", threadBoardDtoPage.getTotalElements());
            response.put("totalPages", threadBoardDtoPage.getTotalPages());

            if (threadBoardDtoPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 댓글 저장
    @PostMapping("/thread")
    public ResponseEntity<Object> createThread(@RequestBody ThreadBoard threadBoard) {
        try {
            ThreadBoard threadBoard1 = threadBoardService.save(threadBoard);
            return new ResponseEntity<>(threadBoard1, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 게시물 저장
    @PostMapping("/thread-board")
    public ResponseEntity<Object> createThreadBoard(@RequestBody ThreadBoard threadBoard) {
        try {
            int threadCount = threadBoardService.saveThreadBoard(threadBoard);
            return new ResponseEntity<>(threadCount, HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 수정
    @PutMapping("/thread-board/{tid}")
    public ResponseEntity<Object> updateThreadBoard(
            @PathVariable int tid,
            @RequestBody ThreadBoard threadBoard
    ) {
        try {
            ThreadBoard threadBoard1 = threadBoardService.save(threadBoard);
            return new ResponseEntity<>(threadBoard1, HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세조회
    @GetMapping("/thread-board/{tid}")
    public ResponseEntity<Object> findByID(@PathVariable int tid) {
        try{
            Optional<ThreadBoard> optionalThreadBoard = threadBoardService.findByID(tid);
            if(optionalThreadBoard.isPresent()) {
                return new ResponseEntity<>(optionalThreadBoard, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 댓글 삭제
    @DeleteMapping("/thread/deletion/{tid}")
    public ResponseEntity<Object> removeByID(@PathVariable int tid) {
        try {
            Boolean bSuccess = threadBoardService.removeByID(tid);
            if(bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch(Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 댓글 + 게시물 삭제
    @DeleteMapping("/thread-board/deletion/{tgroup}")
    public ResponseEntity<Object> removeByTgroup(@PathVariable int tgroup) {
        try {
            Boolean bSuccess = threadBoardService.removeByGroup(tgroup);
            if(bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch(Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
