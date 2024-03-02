import { Status } from "src/share/common/enums/status.enums";

export interface updateAnswer {
    affected: number;
  }
  
  export interface UpdateAnswerRequest {
    value:string
    newData: {
      value?: string;
      question?: {
        title: string
      }
    };
  }
  