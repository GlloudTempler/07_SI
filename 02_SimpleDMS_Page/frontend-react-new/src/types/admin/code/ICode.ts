
/* 사용의무(useYn) : 만약 다른 소스에 사용하고 있으면 'N' 변경 불가 */
/* why: 초기에(사용하기 전에) 실수로 공통카드 잘못 만들었으려 때 변경해서 사용하기 하려고 만듬==*/ 
export default  interface ICode {
    codeId: number,
    codeName: string,
    categoryId: number,
    categoryName: string,
    useYn: string


}