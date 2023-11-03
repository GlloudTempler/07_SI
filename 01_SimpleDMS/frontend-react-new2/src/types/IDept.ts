// 자바의 모델 클래스와 유사
// 인터페이스 : 속성에 자료형을 미리 지정하는 것
// 여기 없는 속성이 들어오면 에러가 발생(에러 탐지)
export default interface IDept {
    dno?: any | null,
    dname: string,
    loc: string
}