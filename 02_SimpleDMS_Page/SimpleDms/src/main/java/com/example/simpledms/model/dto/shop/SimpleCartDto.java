package com.example.simpledms.model.dto.shop;

/**
 * packageName : com.example.simpledms.model.dto.shop
 * fileName : SimpleCartDto
 * author : GGG
 * date : 2023-11-09
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-09         GGG          최초 생성
 */

public interface SimpleCartDto {
    public Integer getScno();
    public Integer getCodeId();

    public String getTitle();
    public String getImgPath();
    public Integer getUnitPrice();
    public Integer getCartCount();
}
