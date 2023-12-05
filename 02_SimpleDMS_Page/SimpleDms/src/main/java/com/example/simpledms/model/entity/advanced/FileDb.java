package com.example.simpledms.model.entity.advanced;

import com.example.simpledms.model.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.sql.Blob;
import java.util.function.BinaryOperator;

/**
 * packageName : com.example.simpledms.model.entity.advanced
 * fileName : FileDb
 * author : GGG
 * date : 2023-11-10
 * description :
 * 요약 :
 *          1) 시퀀스 안씀 -> uuid 사용
 *          2) 저장될 첨부파일명 -> uuid 명으로 저장
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-10         GGG          최초 생성
 */
@Entity
@Table(name = "TB_FILE_DB")
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
@SQLDelete(sql = "UPDATE TB_FILE_DB SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE UUID = ?")
public class FileDb extends BaseTimeEntity {
    /*UUID         VARCHAR2(1000) NOT NULL
    CONSTRAINT PK_FILE_DB PRIMARY KEY, -- 파일 UUID
    FILE_TITLE   VARCHAR2(1000),           -- 제목
    FILE_CONTENT VARCHAR2(1000),           -- 내용
    FILE_NAME    VARCHAR2(1000),           -- 파일명
    FILE_DATA    BLOB,                     -- 바이너리 파일(이미지파일)
    FILE_URL     VARCHAR2(1000),           -- 파일 다운로드 URL
    */

    // 속성 === 테이블 컬럼명과 일치
    @Id
    private String uuid;
    private String fileTitle;
    private String fileContent;
    private String fileName;
    @Lob
    private byte[] fileData;
    private String fileUrl;
}
