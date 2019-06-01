import { API } from "../api";
import { IAnswer } from "../../models";

describe('API', () => {
  it('createQuestion', () => {
    const params = {
      question: 'test',
      answers: [{
        title: 'test',
        answerId: 'test'
        }]
    };
    API.createQuestion(params);
  })
});