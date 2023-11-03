package com.example.simpledms.model.entity.normal;

import com.example.simpledms.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.simpledms.model.entity.normal
 * fileName : ThreadBoard
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
@Entity
@Table(name = "TB_THREAD_BOARD")
@SequenceGenerator(
        name = "SQ_THREAD_BOARD_GENERATOR",
        sequenceName = "SQ_THREAD_BOARD",
        initialValue = 1,
        allocationSize = 1
)
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE TB_THREAD_BOARD SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE TID = ?")
public class ThreadBoard extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                               generator = "SQ_THREAD_BOARD_GENERATOR")
    private Integer tid;

    private String subject;
    private String mainText;
    private String writer;
    private Integer views;
    private Integer tgroup;
    private Integer tparent;


}
