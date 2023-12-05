package com.example.simpledms.controller.advanced;

import com.example.simpledms.model.entity.advanced.FileDb;
import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.service.advanced.FileDbService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.controller.advanced
 * fileName : FileDbController
 * author : GGG
 * date : 2023-11-13
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-13         GGG          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api/advanced")
public class FileDbController {
    @Autowired
    FileDbService fileDbService;

    @GetMapping("/fileDb")
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "") String fileTitle,
            @RequestParam(defaultValue = "0") int page, // 페이지 처리를 위한 공통 변수
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            // 페이지 변수 저장 (page : 현재 페이지 번호 , size : 1페이지 당 개수)
            // 함수 매개변수 : Pagable(위의 값을 넣기)
            Pageable pageable = PageRequest.of(page, size);

            Page<FileDb> fileDbPage = fileDbService.findAllByFileTitleContaining(fileTitle, pageable);

            // 리액트 전송 : 부서 배열, 페이징 정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("fileDb", fileDbPage.getContent()); // fileDb 배열
            response.put("currentPage", fileDbPage.getNumber()); // 현재 페이지 번호
            response.put("totalItems", fileDbPage.getTotalElements()); // 총 건수
            response.put("totalPages", fileDbPage.getTotalPages()); // 총 페이지 건수

            if (fileDbPage.isEmpty() == false) {
                // 성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                // 데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 저장함수
    @PostMapping("/fileDb/upload")
    public ResponseEntity<Object> upload(
            @RequestParam String fileTitle,
            @RequestParam String fileContent,
            @RequestParam MultipartFile fileDb
            ) {
        try{
            fileDbService.upload(
                    null, // 기본키
                    fileTitle,  // 제목
                    fileContent,    // 본문
                    fileDb      // 첨부파일
            );
            return new ResponseEntity<>("업로드 성공", HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // 다운로드 url에 따라 자동으로 첨부파일을 다운로드 받게 해주는 함수( 자동 실행0
    // ex) <img scr ="url"/ > => 이미지 자동 다운로드해서 화면에 이미지 표시됨
    // 현재함수 url == http://localhost:8000/api/advanced/fileDb/{uuid}
    // 서비스 최종 url == http://localhost:8000/api/advanced/fileDb/xxxxiiiiiiii
    // 현재함수 url == 다운로드 url
    @GetMapping("/fileDb/{uuid}")
    public ResponseEntity<byte[]> findByIdDownloading(@PathVariable String uuid) {
        FileDb fileDb = fileDbService.findByID(uuid).get(); // 상세조회

        return ResponseEntity.ok()
                // Todo : header() : 헤더 (1:첨부파일로 전송한다고 표시, 2:첨부파일명 표시)
                //        HttpHeaders.CONTENT_DISPOSITION == 첨부파일 표시
                //        "attachment; filename=\"" + fileDb.getFileName() + "\"" == 첨부파일명 표시
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDb.getFileName() + "\"")
                // todo : body() : 바디 - 실제 이미지 전송(리액트)
                .body(fileDb.getFileData()); // 첨부파일
    }

    // 상세조회
    @GetMapping("/fileDb/get/{uuid}")
    public ResponseEntity<Object> findById(@PathVariable String uuid) {
        try {
            Optional<FileDb> optionalFileDb = fileDbService.findByID(uuid);

            if (optionalFileDb.isPresent()) {
                return new ResponseEntity<>(optionalFileDb, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // 업데이트
    @PutMapping("/fileDb/{uuid}")
    public ResponseEntity<Object> updateFileDb(
            @PathVariable String uuid,
            @RequestParam String fileTitle,
            @RequestParam String fileContent,
            @RequestParam MultipartFile fileDb
    ) {
        try {
            fileDbService.upload(
                    uuid, // 기본키
                    fileTitle,  // 제목
                    fileContent,    // 본문
                    fileDb);
            return new ResponseEntity<>("수정성공", HttpStatus.OK);
        }catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제
    @DeleteMapping("/fileDb/deletion/{uuid}")
    public ResponseEntity<Object> deleteFileDb(@PathVariable String uuid) {
        try {
            boolean bSuccess = fileDbService.removeByID(uuid);
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
