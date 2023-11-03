package com.example.simpledms.controller.normal;

import com.example.simpledms.model.dto.normal.ReplyBoardDto;
import com.example.simpledms.model.entity.normal.CinemaFaq;
import com.example.simpledms.model.entity.normal.ReplyBoard;
import com.example.simpledms.service.normal.ReplyBoardService;
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
 * fileName : ReplyBoardController
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
public class ReplyBoardController {
    @Autowired
    ReplyBoardService replyBoardService;

    @GetMapping("/reply-board")
    public ResponseEntity<Object> selectByConnectByPage(
            @RequestParam(defaultValue = "") String boardTitle,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<ReplyBoardDto> replyBoardDtoPage = replyBoardService.selectByConnectByPage(boardTitle, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("replyBoard", replyBoardDtoPage.getContent());
            response.put("currentPage", replyBoardDtoPage.getNumber());
            response.put("totalItems", replyBoardDtoPage.getTotalElements());
            response.put("totalPages", replyBoardDtoPage.getTotalPages());

            if (replyBoardDtoPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 답변글 저장
    @PostMapping("/reply")
    public ResponseEntity<Object> createReply(@RequestBody ReplyBoard replyBoard) {
        try {
            ReplyBoard replyBoard1 = replyBoardService.save(replyBoard);

            return new ResponseEntity<>(replyBoard1, HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 보드 저장
    @PostMapping("/reply-board")
    public ResponseEntity<Object> createReplyBoard(@RequestBody ReplyBoard replyBoard) {
        try {
            int insertCount = replyBoardService.saveBoard(replyBoard);

            return new ResponseEntity<>(insertCount, HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 수정
    @PutMapping("/reply-board/{bid}")
    public ResponseEntity<Object> updateReplyBoard(
            @PathVariable int bid,
            @RequestBody ReplyBoard replyBoard
    ) {
        try {
            ReplyBoard replyBoard1 = replyBoardService.save(replyBoard);
            return new ResponseEntity<>(replyBoard1, HttpStatus.OK);
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세조회
    @GetMapping("/reply-board/{bid}")
    public ResponseEntity<Object> findByID(@PathVariable int bid) {
        try {
            Optional<ReplyBoard> optionalReplyBoard = replyBoardService.findByID(bid);
            if (optionalReplyBoard.isPresent()) {
                return new ResponseEntity<>(optionalReplyBoard, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 댓글 삭제
    @DeleteMapping("/reply/deletion/{bid}")
    public ResponseEntity<Object> removeByID(@PathVariable int bid) {
        try {
            Boolean bSuccess = replyBoardService.removeByID(bid);
            if (bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 댓글 + 게시물 삭제
    @DeleteMapping("/reply-board/deletion/{boardGroup}")
    public ResponseEntity<Object> removeByGroup(@PathVariable int boardGroup) {
        try {
            Boolean bSuccess = replyBoardService.removeByGroup(boardGroup);
            if (bSuccess == true) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
