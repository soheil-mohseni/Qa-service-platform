import { Status } from "src/share/common/enums/status.enums";

export interface UpdateSection {
  affected: number;
}

export interface UpdateSectionRequest {
  name: string
  newData: {
    name?: string;
    status?: Status
  };
}
