package com.example.simpledms.service.admin;

import com.example.simpledms.model.dto.admin.CodeDto;
import com.example.simpledms.model.entity.admin.Code;
import com.example.simpledms.model.entity.admin.CodeCategory;
import com.example.simpledms.repository.admin.CodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.admin
 * fileName : CodeService
 * author : GGG
 * date : 2023-11-07
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-07         GGG          최초 생성
 */
@Service
public class CodeService {
    @Autowired
    CodeRepository codeRepository; //auto wired

    // like 검색
    public Page<CodeDto> selectByCodeNameContaining(String codeName, Pageable pageable){
        Page<CodeDto> page = codeRepository.selectByCodeNameContaining(codeName, pageable);
        return page;
    }

    // 전체 겁색 : 페이징 없음
    public List<CodeDto> selectALlNoPage() {
        List<CodeDto> list = codeRepository.selectAllNoPage(); // 전체조회 함수
        return list;
    }

    // 상세 조회
    public Optional<Code> findById(int codeId) {
        Optional<Code> optionalCodeCategory = codeRepository.findById(codeId);
        return optionalCodeCategory;
    }

    // 저장 함수
    public Code save(Code code) {
        Code code1 = codeRepository.save(code);
        return code1; // DB실제 저장 객체
    }
}
