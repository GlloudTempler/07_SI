export default interface IThreadBoard {
    tid?: any | null,
    subject: string,
    mainText: string,
    writer: string,
    views: number | string,
    tgroup: any | null,
    tparent: any | null
}