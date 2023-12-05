import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import ISimpleProduct from "../../../types/shop/ISimpleProduct";
import { event } from "jquery";
import SimpleProductService from "../../../services/shop/SimpleProductService";
import ICode from "../../../types/admin/code/ICode";
import CodeService from "../../../services/admin/code/CodeService";

function AddSimpleProduct() {
  // 변수
  // 객체 초기화
  const initialSimpleProduct = {
    spno: null,
    codeId: 0,
    title: "",
    imgPath: "",
    unitPrice: 0,
    useYn: "Y",
  };

  // 객체
  const [simpleProduct, setSimpleProduct] =
    useState<ISimpleProduct>(initialSimpleProduct);
  // submitted
  const [submitted, setSubmitted] = useState<boolean>(false);
  // select : code 데이터 (반복문) -> 화면에 출력
  const [code, setCode] = useState<Array<ICode>>([]);

  // 함수
  // input 태그 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSimpleProduct({ ...simpleProduct, [name]: value });
  };

  // 저장 함수
  const saveSimpleProduct = () => {
    var data = {
      codeId: simpleProduct.codeId,
      title: simpleProduct.title,
      imgPath: simpleProduct.imgPath,
      unitPrice: simpleProduct.unitPrice,
      useYn: simpleProduct.useYn,
    };

    SimpleProductService.create(data)
      .then((response: any) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 새로 보여주기 함수
  const newSimpleProduct = () => {
    setSimpleProduct(initialSimpleProduct);
    setSubmitted(false);
  };

  // TODO : select 태그 반복문으로 code 데이터를 출력하는 함수
  // TODO : code 전체 조회 함수(페이징 없음)
  const retrieveCodeAll = () => {
    CodeService.getAllNoPage()
    .then((response:any)=> {
        setCode(response.data);
        console.log("code", response.data);
    })
    .catch((e:Error)=> {
        console.log(e);
    })
  }

  useEffect(()=> {
    retrieveCodeAll();
  },[])

  // select 태그 수동 바인딩
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSimpleProduct({ ...simpleProduct, [name]: value });
  };

  return (
    <div className="row">
      {submitted ? (
        <div className="col-6 mx-auto">
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSimpleProduct}>
            Add
          </button>
        </div>
      ) : (
        <>
          {/* 제목 start */}
          <TitleCom title="Add SimpleProduct" />
          {/* 제목 end */}

          <div className="col-6 mx-auto">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="unitPrice" className="col-form-label">
                  Code Id
                </label>
              </div>
              <div className="col-9">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  id="codeId"
                  value={simpleProduct.codeId}
                  onChange={handleSelectChange}
                  name="codeId"
                >
                  <option>selected item</option>
                  {/* filter -> 해당하는 데이터만 걸러서 map적용(카테고리 기능) */}
                  {code &&
                    code
                      .filter((data) => data.categoryId == 100)
                      .map((data) => (
                        <option key={data.codeId} value={data.codeId}>
                          {data.codeName}
                        </option>
                      ))}
                </select>
              </div>
            </div>
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
                  value={simpleProduct.title}
                  onChange={handleInputChange}
                  placeholder="title"
                  name="title"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="imgPath" className="col-form-label">
                  Image Path
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="imgPath"
                  required
                  className="form-control"
                  value={simpleProduct.imgPath}
                  onChange={handleInputChange}
                  placeholder="imgPath"
                  name="imgPath"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="unitPrice" className="col-form-label">
                  Unit Price
                </label>
              </div>
              <div className="col-9">
                <input
                  type="number"
                  id="unitPrice"
                  required
                  className="form-control"
                  value={simpleProduct.unitPrice}
                  onChange={handleInputChange}
                  placeholder="unitPrice"
                  name="unitPrice"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="unitPrice" className="col-form-label">
                  Use Y/N
                </label>
              </div>
              <div className="col-9">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  id="useYn"
                  value={simpleProduct.useYn}
                  onChange={handleSelectChange}
                  name="useYn"
                >
                  <option value="Y">사용함</option>
                  <option value="N">사용 안함</option>
                </select>
              </div>
            </div>

            {/* 저장버튼 */}
            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={saveSimpleProduct}
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

export default AddSimpleProduct;
