package com.example.simpledms.model.entity.basic;

import com.example.simpledms.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.simpledms.model.entity.basic
 * fileName : Customer
 * author : GGG
 * date : 2023-10-24
 * description : 고객 엔티티(vo)
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-24         GGG          최초 생성
 */
@Entity
@Table(name="TB_CUSTOMER")
@SequenceGenerator(
        name = "SQ_CUSTOMER_GENERATOR"
        , sequenceName = "SQ_CUSTOMER"
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
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_CUSTOMER SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE CID = ?")
public class Customer extends BaseTimeEntity {
    //    속성
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_CUSTOMER_GENERATOR")
    private Integer cid; // 기본키, 시퀀스

    private String fullName;

    private String email;

    private String phone;
}