import { Section } from "src/modules/section/repository/section.entity";
import { Status } from "src/share/common/enums/status.enums";

export interface CreateTopicRequest {
  name: string;
  section: Section
}


export interface CreateTopicResponse {
  message:string
}