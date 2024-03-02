import { Status } from "src/share/common/enums/status.enums";

export interface updateQuestion {
    affected: number;
  }
  
  export interface UpdateQuestionRequest {
    title:string
    newData: {
      title?: string;
      status?: Status
      topic?: {
        name: string
      }
    };
  }
  