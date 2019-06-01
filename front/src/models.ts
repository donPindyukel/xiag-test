export interface ICreatePollReq {
  question: string;
  answers: IAnswer[];
}

export interface IAnswer {
  title: string;
  answerId?: string;
}

export interface IAnswerRes {
  _id: string;
  title: string;
}

export interface IRoutePollParams {
  pollId: string;
}

export interface IUserAnswerRequest {
  id: string;
  answer: IAnswerRequest;
}

export interface IAnswerRequest {
  questionId: string;
  answerId: string;
}

export interface IStatData {
  userId: string;
  userName: string;
  answerId: string;
  answerTitle: string;
}

export interface ISocketData {
  pollId: string;
}