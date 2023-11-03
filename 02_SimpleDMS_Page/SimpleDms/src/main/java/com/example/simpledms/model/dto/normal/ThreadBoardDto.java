package com.example.simpledms.model.dto.normal;

/**
 * packageName : com.example.simpledms.model.dto.normal
 * fileName : ThreadBoardDto
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
public interface ThreadBoardDto {

    public Integer getTid();
    public String getSubject();
    public String getMainText();
    public String getWriter();
    public Integer getViews();
    public Integer getTgroup();
    public Integer getTparent();
}
