package com.example.simpledms.service.basic;

import com.example.simpledms.model.entity.basic.Dept;
import com.example.simpledms.repository.basic.DeptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.basic
 * fileName : DeptService
 * author : GGG
 * date : 2023-10-23
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-23         GGG          최초 생성
 */
@Service
public class DeptService {
    @Autowired
    DeptRepository deptRepository; // DI

    // 전체 조회 + 페이징
    public Page<Dept> findAll(Pageable pageable) {
        Page<Dept> page = deptRepository.findAll(pageable);

        return page;
    }

    // dname like 검색 + 페이징
    public Page<Dept> findAllByDnameContaining(String dname, Pageable pageable) {
        Page<Dept> page = deptRepository.findAllByDnameContaining(dname, pageable);
        return page;
    }

    // add Dept + 수정함수
    public Dept save(Dept dept) {
        Dept dept2 = deptRepository.save(dept);
        return dept2;
    }

    // 상세 조회
    public Optional<Dept> findByID(int dno) {
        Optional<Dept> optionalDept = deptRepository.findById(dno);
        return optionalDept;
    }

    // 삭제함수
    public boolean removeByID(int dno) {
        if(deptRepository.existsById(dno)) {
            deptRepository.deleteById(dno);
            return true;
        }
        return false;
    }
}
