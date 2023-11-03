package com.example.simpledms.service.basic;

import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.model.entity.basic.Qna;
import com.example.simpledms.repository.basic.QnaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.basic
 * fileName : QnaService
 * author : GGG
 * date : 2023-10-24
 * description : Qna 서비스(업무 로직 : 비지니스 로직 )
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-24         GGG          최초 생성
 */
@Service
public class QnaService {

    @Autowired
    QnaRepository qnaRepository; // DI

    //    question like 검색
    public Page<Qna> findAllByQuestionContaining(String question, Pageable pageable) {
        Page<Qna> page
                = qnaRepository.findAllByQuestionContaining(question, pageable);

        return page;
    }

    //    questioner like 검색
    public Page<Qna> findAllByQuestionerContaining(String questioner, Pageable pageable) {
        Page<Qna> page
                = qnaRepository.findAllByQuestionerContaining(questioner, pageable);

        return page;
    }

    //    저장함수(수정함수)
    public Qna save(Qna qna) {

        Qna qna2 = qnaRepository.save(qna);

        return qna2;
    }

    public Optional<Qna> findByID(int qno) {
       Optional<Qna> optionalQna = qnaRepository.findById(qno);
       return optionalQna;
    }

    public boolean removeByID(int qno) {
        if(qnaRepository.existsById(qno)){
            qnaRepository.deleteById(qno);
            return true;
        }
        return false;
    }
}