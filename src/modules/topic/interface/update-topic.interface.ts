export interface UpdateTopic {
  affected: number;
}

export interface UpdateTopicRequest {
  name:string
  newData: {
    name?: string;
    section?: {
      name: string
    }
  };
}
