import React, { useState } from 'react'
import TitleCom from '../../components/common/TitleCom'
import ICodeCategory from '../../types/admin/code/ICodeCategory';
import CodeCategoryService from '../../services/admin/code/CodeCategoryService';

function AddCodeCategory() {
    // 객체 초기화
    const initialCodeCategory = {
        categoryId: 0,
        categoryName: ""
    };
    // 카테고리 객체
    const [codeCategory, setCodeCategory] = useState<ICodeCategory>(initialCodeCategory);
    const [submitted, setSubmitted] = useState<boolean>(false);

    // 함수 정의
    // input 태그에 수동 바인딩
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCodeCategory({...codeCategory, [name]: value});
    };

    // 저장 함수
    const saveCodeCategory = () => {
        var data = {
            categoryId: codeCategory.categoryId,
            categoryName: codeCategory.categoryName
        };

        CodeCategoryService.create(data)
        .then((response:any)=>{
            setSubmitted(true);
            console.log(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        });
    };

    // 새 폼 보여주기 함수
    const newCodeCategory = () => {
        setCodeCategory(initialCodeCategory);
        setSubmitted(false);
    };

  return (
    <div className="row">
    {submitted ? (
      <div className="col-6 mx-auto">
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newCodeCategory}>
          Add
        </button>
      </div>
    ) : (
      <>
        {/* 제목 start */}
        <TitleCom title="Add CodeCategory" />
        {/* 제목 end */}

        <div className="col-6 mx-auto">
          <div className="row g-3 align-items-center mb-3">
            <div className="col-3">
              <label htmlFor="categoryId" className="col-form-label">
                categoryId
              </label>
            </div>

            <div className="col-9">
              <input
                type="number"
                id="categoryId"
                required
                className="form-control"
                value={codeCategory.categoryId}
                onChange={handleInputChange}
                placeholder="categoryId"
                name="categoryId"
              />
            </div>
          </div>

          <div className="row g-3 align-items-center mb-3">
            <div className="col-3">
              <label htmlFor="categoryName" className="col-form-label">
                categoryName
              </label>
            </div>
            <div className="col-9">
              <input
                type="text"
                id="categoryName"
                required
                className="form-control"
                value={codeCategory.categoryName}
                onChange={handleInputChange}
                placeholder="categoryName"
                name="categoryName"
              />
            </div>
          </div>

          <div className="row g-3 mt-3 mb-3">
            <button
              onClick={saveCodeCategory}
              className="btn btn-outline-primary ms-2 col"
            >
              Submit
            </button>
          </div>
        </div>
      </>
    )}
  </div>
  )
}

export default AddCodeCategory