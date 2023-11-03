package com.example.simpledms.service;

import com.example.simpledms.model.Emp;
import com.example.simpledms.repository.DeptRepository;
import com.example.simpledms.repository.EmpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.service
 * fileName : EmpService
 * author : GGG
 * date : 2023-10-19
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-19         GGG          최초 생성
 */
@Service
public class EmpService {
    @Autowired
    EmpRepository empRepository;

    public List<Emp> findAll() {
        List<Emp> list = empRepository.findAll();
        return list;
    }

    public List<Emp> findByEnameConataining(String ename) {
        List<Emp> list = empRepository.findAllByEnameContaining(ename);
        return list;
    }

    public Emp saveEmp(Emp emp) {
        Emp emp1 = empRepository.save(emp);
        return emp1;
    }

    /* 상세조회 함수 */
    public Optional<Emp> findByID(int eno) {
        Optional<Emp> optionalEmp = empRepository.findById(eno);
        return optionalEmp;
    }

    /* 삭제조회 함수 */
    public boolean removeByID(int eno) {
        if(empRepository.existsById(eno)) {
            empRepository.deleteById(eno);
            return true;
        }
        return false;
    }
}
