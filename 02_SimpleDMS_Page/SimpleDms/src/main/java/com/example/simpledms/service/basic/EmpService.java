package com.example.simpledms.service.basic;

import com.example.simpledms.model.entity.basic.Emp;
import com.example.simpledms.repository.basic.EmpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.basic
 * fileName : EmpService
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
public class EmpService {
    @Autowired
    EmpRepository empRepository;

    public Page<Emp> findAll(Pageable pageable) {
        Page<Emp> page = empRepository.findAll(pageable);
        return page;
    }

    public Page<Emp> findAllByEnameContaining(String ename, Pageable pageable) {
        Page<Emp> page = empRepository.findAllByEnameContaining(ename, pageable);
        return page;
    }

    public Emp save(Emp emp) {
        Emp emp2 = empRepository.save(emp);
        return emp2;
    }

    public Optional<Emp> findByID(int eno) {
        Optional<Emp> optionalEmp = empRepository.findById(eno);
        return optionalEmp;
    }

    public boolean removeByID(int eno) {
        if(empRepository.existsById(eno)) {
            empRepository.deleteById(eno);
            return true;
        }

        return false;
    }
}
