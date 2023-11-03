package com.example.simpledms.service.normal;

import com.example.simpledms.model.dto.normal.ThreadBoardDto;
import com.example.simpledms.model.entity.normal.ThreadBoard;
import com.example.simpledms.repository.normal.ThreadBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.normal
 * fileName : ThreadBoardService
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
@Service
public class ThreadBoardService {
    @Autowired
    ThreadBoardRepository threadBoardRepository;

    // 전체 조회
    public Page<ThreadBoardDto> selectByConnectByPage(String subject, Pageable pageable) {
        Page<ThreadBoardDto> page = threadBoardRepository.selectByConnectByPage(subject, pageable);
        return page;
    }

    // 답글 저장 + 업데이트
    public ThreadBoard save(ThreadBoard threadBoard) {
        ThreadBoard threadBoard1 = threadBoardRepository.save(threadBoard);
        return threadBoard1;
    }

    // 게시물 저장 + 업데이트
    public int saveThreadBoard(ThreadBoard threadBoard) {
        int insertCount = threadBoardRepository.insertByThread(threadBoard);
        return insertCount;
    }

    // 게시물 상세 조회
    public Optional<ThreadBoard> findByID(int tid) {
        Optional<ThreadBoard> optionalThreadBoard = threadBoardRepository.findById(tid);
        return optionalThreadBoard;
    }

    // 댓글 삭제
    public boolean removeByID(int tid) {
        if(threadBoardRepository.existsById(tid)) {
            threadBoardRepository.deleteById(tid);
            return true;
        }
        return false;
    }

    // 게시물 + 댓글 삭제
    public boolean removeByGroup(int tgroup) {
        int deleteCount = threadBoardRepository.removeAllByThreadGroup(tgroup);

        if(deleteCount > 0) {
            return true;
        }else {
            return false;
        }
    }
}
