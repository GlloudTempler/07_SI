package com.example.simpledms.service.normal;

import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.model.entity.normal.Faq;
import com.example.simpledms.repository.normal.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.normal
 * fileName : FaqService
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
@Service
public class FaqService {

    @Autowired
    FaqRepository faqRepository; // DI

    //    title like 조회 + 페이징
    public Page<Faq> findAllByTitleContaining(String title, Pageable pageable) {
        Page<Faq> page
                = faqRepository.findAllByTitleContaining(title, pageable);

        return page;
    }

    //    저장함수(수정함수)
    public Faq save(Faq faq) {

        Faq faq2 = faqRepository.save(faq);

        return faq2;
    }

    public Optional<Faq> findByID(int no) {
        Optional<Faq> optionalFaq = faqRepository.findById(no);
        return optionalFaq;
    }

    public boolean removeByID(int no) {
        if(faqRepository.existsById(no)) {
            faqRepository.deleteById(no);
            return true;
        }
        return false;
    }
}