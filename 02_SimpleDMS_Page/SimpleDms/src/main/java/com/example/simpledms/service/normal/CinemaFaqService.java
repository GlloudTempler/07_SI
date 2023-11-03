package com.example.simpledms.service.normal;

import com.example.simpledms.model.entity.normal.CinemaFaq;
import com.example.simpledms.repository.normal.CinemaFaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.normal
 * fileName : CinemaFaqService
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
@Service
public class CinemaFaqService {
    @Autowired
    CinemaFaqRepository cinemaFaqRepository;

    public Page<CinemaFaq> findAllByQuestionContaining(String question, Pageable pageable) {
        Page<CinemaFaq> page = cinemaFaqRepository.findAllByQuestionContainingOrderBySortOrderDesc(question, pageable);
        return page;
    }

    public CinemaFaq save(CinemaFaq cinemaFaq) {
        CinemaFaq cinemaFaq1 = cinemaFaqRepository.save(cinemaFaq);
        return cinemaFaq1;
    }

    public Optional<CinemaFaq> findByID(int cfno) {
        Optional<CinemaFaq> optionalCinemaFaq = cinemaFaqRepository.findById(cfno);
        return optionalCinemaFaq;
    }


    public boolean removeByID(int cfno) {
        if(cinemaFaqRepository.existsById(cfno)) {
            cinemaFaqRepository.deleteById(cfno);
            return true;
        }
        return false;
    }
}
