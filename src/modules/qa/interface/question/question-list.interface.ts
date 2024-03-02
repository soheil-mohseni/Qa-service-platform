import { Status } from "src/share/common/enums/status.enums"

export interface QuestionListResponse<T> {
    question : T[]
  }
  
export interface QuestionNameList {
    title: string,
    view: number,
    like: number,
    dislike: number,
    status: Status,
    topic: string
}
