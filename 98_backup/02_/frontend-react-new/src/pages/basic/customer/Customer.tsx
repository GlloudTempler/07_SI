import React, { useEffect, useState } from 'react'
import TitleCom from '../../../components/common/TitleCom'
import { useNavigate, useParams } from 'react-router-dom'
import ICustomer from '../../../types/basic/ICustomer';
import CustomerService from '../../../services/basic/CustomerService';

function Customer() {
    // 전체 조회 페이지에서 전송한 기본키
    const {cid} = useParams();
    // 강제 페이지 이동
    let navigate = useNavigate();

    // 객체 초기화
    const initialCustomer = {
        cid: "",
        fullName: "",
        email: "",
        phone: ""
    }

    // 수정될 질문 객체
    const [customer, setCustomer] = useState<ICustomer>(initialCustomer);
    // 화면에 수정 성공 메세지 표시
    const [message, setMessage] = useState<string>("");

    // 상세 조회 함수
    const getCustomer = (customer:string) => { 
        CustomerService.get(cid)
        .then((response:any) => {
            setCustomer(response.data);
            console.log(response.data);
        })
        .catch((e:Error) => {
            console.log(e);
        })
     };

     // 화면이 뜰 때 실행되는 이벤트
     useEffect(() => {
        if(cid) getCustomer(cid);
     }, [cid])

     // input 태그 수동 바인딩
     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = event.target;
        setCustomer({...customer, [name]: value});
     };

     // 수정 함수
    const updateCustomer = () => { 
        CustomerService.update(customer.cid, customer)
        .then((response:any) => {
            console.log(response.data);
            setMessage("the customer was update successfully ! ")
        })
        .catch((e:Error) => {
            console.log(e);
        })
    }

    // 삭제 함수
    const deleteCustomer = () => { 
        CustomerService.remove(customer.cid)
        .then((response: any) => {
            console.log(response.data);
            navigate("/customer")
        })
        .catch((e:Error) => {
            console.log(e);
        })
    }
    
  return (
    <>
      {/* 제목 start */}
      <TitleCom title="Customer Detail" />
      {/* 제목 end */}

      <>
        {customer ? (
          <div className="col-6 mx-auto">
            <form>
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="fullName" className="col-form-label">
                    Full_name
                  </label>
                </div>

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
              </div>

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

              
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="phone" className="col-form-label">
                    Answer
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="loc"
                    required
                    className="form-control"
                    value={customer.phone}
                    onChange={handleInputChange}
                    placeholder="phone"
                    name="phone"
                  />
                </div>
              </div>
            </form>

            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={deleteCustomer}
                className="btn btn-outline-danger ms-3 col"
              >
                Delete
              </button>

              <button
                type="submit"
                onClick={updateCustomer}
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
            <p>Please click on a Customer...</p>
          </div>
        )}
      </>
    </>
  )
}

export default Customer