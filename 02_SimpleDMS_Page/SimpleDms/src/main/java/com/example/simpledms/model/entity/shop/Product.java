package com.example.simpledms.model.entity.shop;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * packageName : com.example.simpledms.model.entity.shop
 * fileName : Product
 * author : GGG
 * date : 2023-11-08
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-08         GGG          최초 생성
 */
@Entity
@Table(name = "TB_PRODUCT")
@SequenceGenerator(
        name = "SQ_PRODUCT_GENERATOR"
        , sequenceName = "SQ_PRODUCT"
        , initialValue = 1
        , allocationSize = 1
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE
                   ,generator = "SQ_PRODUCT_GENERATOR")
    private Integer pno;
    private Integer kindCode;
    private String pname;
    private String image;
    private Integer unitPrice;
    private Integer statusCode;
    private String useYn;
};
