import React, { useEffect, useState } from 'react'
import TitleCom from '../../../components/common/TitleCom';
import { useNavigate, useParams } from 'react-router-dom';
import ICinemaFaq from '../../../types/normal/ICinemaFaq';
import cinemaFaqService from '../../../services/normal/CinemaFaqService';

function CinemaFaq() {

    // 전체 조회 페이지에서 전송한 기본키(cfno)
    const {cfno} = useParams();
    // 강제 페이지 이동
    let navigate = useNavigate();

    // 객체 초기화
    const initialCinemaFaq = {
        cfno: "",
        question: "",
        answer: "",
        sortOrder: ""
    }

    // 수정될 cinemafaq객체
    const [cinemaFaq, setCinemaFaq] = useState<ICinemaFaq>(initialCinemaFaq);
    // 화면에 수정 성고 ㅇ메세지 표시
    const [message, setMessage] = useState<string>("");

    // 상세 조회 함수
    const getCinemaFaq = (cfno: string) => {
        cinemaFaqService.get(cfno)
        .then((response:any) => {
            setCinemaFaq(response.data);
            console.log(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        })
    }

    // 화면이 뜰 때 실행되는 이벤트 -> cfno값이 바뀌면 실행
    useEffect(()=> {
        if(cfno) getCinemaFaq(cfno);
    },[cfno]);

    // input 태그 수동 바인딩
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCinemaFaq({...cinemaFaq, [name]:value});
    }

    // 수정 함수
    const updateCinemaFaq = () => {
        cinemaFaqService.updatae(cinemaFaq.cfno, cinemaFaq)
        .then((response:any) => {
            console.log(response.data);
            setMessage("The CinemaFaq was updated successfully!")
        })
        .catch((e:Error)=> {
            console.log(e);
        })
    }

    // 삭제 함수
    const deleteCinemaFaq = () => {
        cinemaFaqService.remove(cinemaFaq.cfno)
        .then((response:any) => {
            console.log(response.data);
            navigate("/cinema-faq");
        })
        .catch((e:Error)=> {
            console.log(e);
        })
    }
    return (
        <>
          {/* 제목 start */}
          <TitleCom title="Faq Detail" />
          {/* 제목 end */}
    
          <>
            {cinemaFaq ? (
              <div className="col-6 mx-auto">
                <form>
                  <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                      <label htmlFor="question" className="col-form-label">
                        Question
                      </label>
                    </div>
    
                    <div className="col-9">
                      <input
                        type="text"
                        id="question"
                        required
                        className="form-control"
                        value={cinemaFaq.question}
                        onChange={handleInputChange}
                        placeholder="question"
                        name="question"
                      />
                    </div>
                  </div>
    
                  <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                      <label htmlFor="answer" className="col-form-label">
                        Answer
                      </label>
                    </div>
    
                    <div className="col-9">
                      <input
                        type="text"
                        id="answer"
                        required
                        className="form-control"
                        value={cinemaFaq.answer}
                        onChange={handleInputChange}
                        placeholder="answer"
                        name="answer"
                      />
                    </div>
                  </div>

                  <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                      <label htmlFor="sortOrder" className="col-form-label">
                        SortOrder
                      </label>
                    </div>
    
                    <div className="col-9">
                      <input
                        type="text"
                        id="sortOrder"
                        required
                        className="form-control"
                        value={cinemaFaq.sortOrder}
                        onChange={handleInputChange}
                        placeholder="sortOrder"
                        name="sortOrder"
                      />
                    </div>
                  </div>
                </form>
    
                <div className="row g-3 mt-3 mb-3">
                  <button
                    onClick={deleteCinemaFaq}
                    className="btn btn-outline-danger ms-3 col"
                  >
                    Delete
                  </button>
    
                  <button
                    type="submit"
                    onClick={updateCinemaFaq}
                    className="btn btn-outline-success ms-2 col"
                  >
                    Update
                  </button>
                </div>
    
                {message && (
                  <p className="alert alert-success mt-3 text-center">{message}</p>
                )}
              </div>
            ) : (
              <div className="col-6 mx-auto">
                <br />
                <p>Please click on a CinemaFaq...</p>
              </div>
            )}
          </>
        </>
      );
}

export default CinemaFaq