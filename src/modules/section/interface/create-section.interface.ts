import { Status } from "src/share/common/enums/status.enums";

export interface CreateSectionRequest {
  status?: Status;
  name: string;
}


export interface CreateSectionResponse {
  message:string
}