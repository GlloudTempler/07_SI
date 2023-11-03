import React, { useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import ICinemaFaq from "../../../types/normal/ICinemaFaq";
import { event } from 'jquery';
import cinemaFaqService from "../../../services/normal/CinemaFaqService";

function AddCinemaFaq() {
    // 객체 초기화
    const initialCinemaFaq = {
        cfno: null,
        question: "",
        answer: "",
        sortOrder: ""
    };
    
    // 시네마객체
    const [cinemaFaq, setCinemaFaq] = useState<ICinemaFaq>(initialCinemaFaq);
    // 저장버튼 변경
    const [submitted, setSubmitted] = useState<boolean>(false);

    // input 태그에 수동 바인딩
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCinemaFaq({...cinemaFaq, [name]: value});
    }

    // 저장 함수
    const saveCinemaFaq = () => {
        var data = {
            question: cinemaFaq.question,
            answer: cinemaFaq.answer,
            sortOrder: cinemaFaq.sortOrder
        };

        cinemaFaqService.create(data)
        .then((response:any)=> {
            setSubmitted(true);
            console.log(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        })
    }

    // 새폼 보여주기 함수
    const newCinemaFaq = () => {
        setCinemaFaq(initialCinemaFaq);
        setSubmitted(false);
    }

  return (
    <div className="row">
      {submitted ? (
        <div className="col-6 mx-auto">
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCinemaFaq}>
            Add CinemaFaq
          </button>
        </div>
      ) : (
        <>
          {/* 제목 start */}
          <TitleCom title="Add Faq" />
          {/* 제목 end */}

          <div className="col-6 mx-auto">
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
                  type="number"
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

            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={saveCinemaFaq}
                className="btn btn-outline-primary ms-2 col"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddCinemaFaq;
