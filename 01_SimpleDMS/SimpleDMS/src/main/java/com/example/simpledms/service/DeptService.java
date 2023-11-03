package com.example.simpledms.service;

import com.example.simpledms.model.Dept;
import com.example.simpledms.repository.DeptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.service
 * fileName : DeptService
 * author : GGG
 * date : 2023-10-19
 * description : 부서 업무 서비스
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-19         GGG          최초 생성
 */
@Service
public class DeptService {
    @Autowired
    DeptRepository deptRepository; //DI

    /* 전체 조회 */
    public List<Dept> findAll() {
        List<Dept> list = deptRepository.findAll();
        return list;
    }

    /* 검색어(dname like) 조회*/
    public List<Dept> findByDnameContaining(String dname) {
        List<Dept> list = deptRepository.findAllByDnameContaining(dname);
        return list;
    }

    /* 저장 함수(dno:null) + 수정 함수(dno:notnull) */
    public Dept saveDept(Dept dept) {
        Dept dept1 = deptRepository.save(dept);
        return dept1;
    }

    /* 상세조회 함수 */
    public Optional<Dept> findByID(int dno) {
        Optional<Dept> optionalDept = deptRepository.findById(dno);
        return optionalDept;
    }

    /* 삭제 함수 */
    public boolean removeByID(int dno) {
        if(deptRepository.existsById(dno)) {
            deptRepository.deleteById(dno);
            return true;
        }
        return false;
    }
}
