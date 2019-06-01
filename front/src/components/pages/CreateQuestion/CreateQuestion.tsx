import React from "react";
import { API } from "Services/api";
import { RouteComponentProps } from "react-router";
import "./styles.css";

export interface ICreateQuestionState {
  question: string;
  answers: string[];
  isValidForm: boolean;
  pollId: string;
}

export type ICreateQuestionProps = RouteComponentProps & {};

export class CreateQuestion extends React.Component<
  ICreateQuestionProps,
  ICreateQuestionState
> {
  state: ICreateQuestionState = {
    question: "",
    answers: ["Yes", "No"],
    isValidForm: false,
    pollId: ""
  };

  questionInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const question = e.target.value;
    this.setState(
      {
        question
      },
      this.formValidation
    );
  };

  changeAnswerHandler = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.state.answers[index] = e.target.value;
    this.setState({
      answers: [...this.state.answers]
    });
    this.formValidation();
  };

  clickAddButtonHandler = () => {
    const answers = [...this.state.answers];
    answers.push("");
    this.setState({
      answers
    });
  };

  clickStartHandler = async () => {
    const { question, answers } = this.state;
    const reqAnswers = answers.map(answer => ({
      title: answer
    }));
    const req = {
      question,
      answers: reqAnswers
    };
    try {
      const data = await API.createQuestion(req);
      this.redirectToPoll(data.data);
    } catch (err) {
      console.log("Error occurred", err);
    }
  };

  redirectToPoll(data: any) {
    const pollId = data._id;
    this.setState(
      {
        pollId
      },
      this.redirectToPollRender
    );
  }

  formValidation = () => {
    const { question, answers } = this.state;
    const isAnswersValid = answers.every(answer => !!answer);
    if (!!question && isAnswersValid) {
      this.setState({
        isValidForm: true
      });
    } else {
      this.setState({
        isValidForm: false
      });
    }
  };

  answerRender = (answer: string, index: number) => {
    return (
      <div className="answer-wrap" key={index}>
        <div className="answer-title">Answer {index + 1}:</div>
        <input
          type="text"
          onChange={this.changeAnswerHandler(index)}
          value={answer}
        />
      </div>
    );
  };

  redirectToPollRender = () => {
    this.props.history.push({
      pathname: `/${this.state.pollId}`
    });
  };

  render() {
    const { question, answers, isValidForm } = this.state;
    return (
      <div className="create-question">
        <div className="form-wrap">
          <div className="question-field">
            <div className="question-title">Question:</div>
            <input
              type="text"
              onChange={this.questionInputHandler}
              value={question}
            />
          </div>
          <div className="answers-wrap">{answers.map(this.answerRender)}</div>
          <div className="add-button-wrap">
            <button onClick={this.clickAddButtonHandler}>+</button>
          </div>
          <div className="start-button-wrap">
            <button disabled={!isValidForm} onClick={this.clickStartHandler}>
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }
}
