import React, { useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import IFaq from "../../../types/normal/IFaq";
import { event } from 'jquery';
import faqService from "../../../services/normal/FaqService";

function AddFaq() {
    // 객체 초기화
    const initialFaq = {
        no: null,
        title: "",
        content: ""
    };

    // 부서 객체
    const [faq, setFaq] = useState<IFaq>(initialFaq);
    // 저장 버븐 클릭 후 submitted 변경
    const [submitted, setSubmitted] = useState<boolean>(false);

    // input태그에 수동 바인딩
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFaq({...faq, [name]: value});
    }

    // 저장 함수
    const saveFaq = () => {
        var data = {
            title: faq.title,
            content: faq.content
        };

        faqService.create(data)
        .then((response:any) => {
            setSubmitted(true);
            console.log(response.data);
        })
        .catch((e:Error) => {
            console.log(e);
        })
    }

    // 새폼 보여주기 함수 : 변수값 변경 -> 화면 자동 갱신
    const newFaq = () => {
        setFaq(initialFaq);
        setSubmitted(false);
    };

  return (
    <div className="row">
      {submitted ? (
        <div className="col-6 mx-auto">
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newFaq}>
            Add Faq
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
                <label htmlFor="title" className="col-form-label">
                  Title
                </label>
              </div>

              <div className="col-9">
                <input
                  type="text"
                  id="title"
                  required
                  className="form-control"
                  value={faq.title}
                  onChange={handleInputChange}
                  placeholder="title"
                  name="title"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="content" className="col-form-label">
                  Content
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="content"
                  required
                  className="form-control"
                  value={faq.content}
                  onChange={handleInputChange}
                  placeholder="content"
                  name="content"
                />
              </div>
            </div>

            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={saveFaq}
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

export default AddFaq;
