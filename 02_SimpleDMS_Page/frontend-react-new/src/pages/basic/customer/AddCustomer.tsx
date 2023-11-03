import React, { useState } from 'react'
import TitleCom from '../../../components/common/TitleCom'
import ICustomer from '../../../types/basic/ICustomer';
import { findConfigFile } from 'typescript';
import CustomerService from '../../../services/basic/CustomerService';

function AddCustomer() {
    // 객체 초기화
    const initialCustomer = {
        cid: null,
        fullName: "",
        email: "",
        phone: ""
    };

    // 고객 객체
    const [customer, setCustomer] = useState<ICustomer>(initialCustomer);
    // 저장 버튼 클릭 후 submitted = true
    const [submitted, setSubmitted] = useState<boolean>(false);

    // input태그 수동 바인딩
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCustomer({...customer, [name]: value});
    };

    // 저장함수
    const saveCustomer = () => { 
        var data = {
            fullName: customer.fullName,
            email: customer.email,
            phone: customer.phone
        };

        CustomerService.create(data)
        .then((response: any) => {
            setSubmitted(true);
            console.log(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        });
     };
    
    // 새로 보여주기 함수
    const newCustomer = () => { 
        setCustomer(initialCustomer);
        setSubmitted(false);
    }

  return (
    <div className="row">
      {submitted ? (
        <div className="col-6 mx-auto">
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCustomer}>
            Add
          </button>
        </div>
      ) : (
        <>
          {/* 제목 start */}
          <TitleCom title="Add Customer" />
          {/* 제목 end */}

          <div className="col-6 mx-auto">
            {/* question 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
                {/* 라벨 시작 */}
              <div className="col-3">
                
                <label htmlFor="fullName" className="col-form-label">
                  Full_name
                </label>
              </div>
              {/* 라벨 끝 */}

              {/* 인풋 시작 */}
              <div className="col-9">
                <input
                  type="text"
                  id="fullName"
                  required
                  className="form-control"
                  value={customer.fullName}
                  onChange={handleInputChange}
                  placeholder="fullName"
                  name="fullName"
                />
              </div>
              {/* 인풋 끝 */}
            </div>
            {/* question 입력창 끝 */}

            {/* qustioner 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="email" className="col-form-label">
                    Email
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="email"
                  required
                  className="form-control"
                  value={customer.email}
                  onChange={handleInputChange}
                  placeholder="email"
                  name="email"
                />
              </div>
            </div>
            {/* questioner 입력창 끝 */}

            {/* answer 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="phone" className="col-form-label">
                    Phone
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="phone"
                  required
                  className="form-control"
                  value={customer.phone}
                  onChange={handleInputChange}
                  placeholder="phone"
                  name="phone"
                />
              </div>
            </div>
            {/* answer 입력창 끝 */}

            {/* 저장 버튼 시작 */}
            <div className="row g-3 mt-3 mb-3">
              <button onClick={saveCustomer} className="btn btn-outline-primary ms-2 col">
                Submit
              </button>
            </div>
            {/* 저장 버튼 끝 */}
          </div>
        </>
      )}
    </div>
  )
}

export default AddCustomer