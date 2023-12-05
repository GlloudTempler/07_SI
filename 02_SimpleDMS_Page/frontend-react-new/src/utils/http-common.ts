import axios from "axios";

// todo: baseURL: "http://스프링ip주소:스프링포트번호/공통url"
export default axios.create({
  // 아마존 배포
  // baseUrl: 아마존 공인ip
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json"
  }
});
