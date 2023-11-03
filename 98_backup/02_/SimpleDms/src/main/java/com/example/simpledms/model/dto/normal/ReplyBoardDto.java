package com.example.simpledms.model.dto.normal;

/**
 * packageName : com.example.simpledms.model.dto.normal
 * fileName : ReplyBoardDto
 * author : GGG
 * date : 2023-10-26
 * description : 계층형 쿼리 dto
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-26         GGG          최초 생성
 */
public interface ReplyBoardDto {
    // 속성 x -> getter
    public Integer getBid();
    public String getBoardTitle();
    public String getBoardContent();
    public String getBoardWriter();
    public Integer getViewCnt();
    public Integer getBoardGroup();
    public Integer getBoardParent();
}
