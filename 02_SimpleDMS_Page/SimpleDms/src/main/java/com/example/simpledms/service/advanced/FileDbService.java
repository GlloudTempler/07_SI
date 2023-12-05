package com.example.simpledms.service.advanced;

import com.example.simpledms.ServletInitializer;
import com.example.simpledms.model.entity.advanced.FileDb;
import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.repository.advanced.FileDbRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.compat.JrePlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

/**
 * packageName : com.example.simpledms.service.advanced
 * fileName : FileDbService
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
@Service
@Slf4j
public class FileDbService {
    @Autowired
    FileDbRepository fileDbRepository;

    // 전체 조회 + 페이징
    public Page<FileDb> findAll(Pageable pageable) {
        Page<FileDb> page = fileDbRepository.findAll(pageable);
        return page;
    }

    // fileTitle like 검색 + 페이징
    public Page<FileDb> findAllByFileTitleContaining(String fileTitle, Pageable pageable) {
        Page<FileDb> page = fileDbRepository.findAllByFileTitleContaining(fileTitle, pageable);
        return page;
    }

    // add Dept + 수정함수
//    public FileDb save(FileDb fileDb) {
//        FileDb fileDb1 = fileDbRepository.save(fileDb);
//        return fileDb1;
//    }

    // TODO : 저장(수정)함수 (업로드)
    public FileDb upload(String uuid,
                         String fileTitle,
                         String fileContent,
                         MultipartFile file // 첨부파일 객체
    ) {
        FileDb fileDb1 = null;
        try {
            // 기본키 : uuid
            if (uuid == null) {
                // 저장 실행
                // 1) DB에 이미지 저장
                // 2) DB에 이미지를 다운로드 할 수 있는 url 저장
                //    (다운로드 url 만들기 필요)
                // 3) 파일명 : 중복이 안되는 유일한 id사용 : uuid 사용(유일값)
                // todo : 1) uuid만들기
                String tmpUuId = UUID.randomUUID().
                        toString().
                        replace("-", "");

                // todo : 2) 다운로드 url 만들기
                String fileDownloadUri = ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path("/api/advanced/fileDb/")
                        .path(tmpUuId)
                        .toUriString();
                // 최종 ex) : http://localhost:8000/api/advanced/fileDb/xxxxiiiiiiii

                // todo : 3)  위의 정보를 FileDb 객체에 저장 후 DB save 함수 실행
                FileDb fileDb = new FileDb(
                        tmpUuId,    // uuid
                        fileTitle,  // 제목
                        fileContent,    // 본문
                        file.getOriginalFilename(), // 실제 이미지 파일명
                        file.getBytes(),    // 이미지 크기(100byte)
                        fileDownloadUri); // 다운로드 url
                fileDb1 = fileDbRepository.save(fileDb);
            } else {
                // 수정 실행

                // todo : 1) 다운로드 url 만들기
                String fileDownloadUri = ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path("/api/advanced/fileDb/")
                        .path(uuid)
                        .toUriString();
                // 최종 ex) : http://localhost:8000/api/advanced/fileDb/xxxxiiiiiiii

                // todo : 2)  위의 정보를 FileDb 객체에 저장 후 DB save 함수 실행
                FileDb fileDb = new FileDb(
                        uuid,    // uuid
                        fileTitle,  // 제목
                        fileContent,    // 본문
                        file.getOriginalFilename(), // 실제 이미지 파일명
                        file.getBytes(),    // 이미지 크기(100byte)
                        fileDownloadUri); // 다운로드 url
                fileDb1 = fileDbRepository.save(fileDb);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
        }
        return fileDb1;
    }

    // 상세 조회
    public Optional<FileDb> findByID(String uuid) {
        Optional<FileDb> optionalFileDb = fileDbRepository.findById(uuid);
        return optionalFileDb;
    }

    // 삭제함수
    public boolean removeByID(String uuid) {
        if (fileDbRepository.existsById(uuid)) {
            fileDbRepository.deleteById(uuid);
            return true;
        }
        return false;
    }
}
