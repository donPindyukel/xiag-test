import React from "react";
import { API } from "Services/api";
import { storageService } from "Services/storageService";
import { RouteComponentProps } from "react-router";
import {
  IAnswer,
  IAnswerRes,
  IRoutePollParams,
  IStatData,
  IUserAnswerRequest
} from "Models";
import { Results } from "Elements";
import { mapService } from "Services/mappingService";
import { SocketHandler } from "Services/socketService";
import "./styles.css";

export interface IPollState {
  question: string;
  answers: IAnswer[];
  name: string;
  answer: string;
  isFormValid: boolean;
  isUserAnswered: boolean;
  statData: IStatData[];
}

export type IPollProps = RouteComponentProps<IRoutePollParams>;

export class Poll extends React.Component<IPollProps, IPollState> {
  state = {
    question: "",
    answers: [],
    name: "",
    answer: "",
    isFormValid: false,
    isUserAnswered: false,
    statData: []
  };

  socket: any = null;

  componentDidMount() {
    this.checkUserData();
    this.getPollData();
    this.getResultData();
    this.getConnection();
  }

  async getConnection() {
    this.socket = new SocketHandler(
      this.statDataUpdate,
      this.props.match.params.pollId
    );
  }

  async getResultData() {
    try {
      const pollResultsResp = await API.getPollResults();
      const resultData = mapService.pollResultsMapper(
        pollResultsResp.data,
        this.props.match.params.pollId
      );
      this.setState({
        statData: [...resultData]
      });
    } catch (err) {
      console.log("Error occurred", err);
    }
  }

  async getPollData() {
    try {
      const response = await API.getPoll(this.props.match.params.pollId);
      if (!response.data) {
        this.goBack();
      } else {
        const question = response.data.question;
        const answers = response.data.answers.map((answer: IAnswerRes) => ({
          title: answer.title,
          answerId: answer._id
        }));
        this.setState({
          question,
          answers
        });
      }
    } catch (err) {
      this.goBack();
    }
  }

  async checkUserData() {
    try {
      const userId = storageService.getUserId();
      if (userId) {
        const userResponse = await API.getUser(userId);
        if (
          storageService.checkUser(
            userResponse.data,
            this.props.match.params.pollId
          )
        ) {
          this.setState({
            isUserAnswered: true
          });
        }
        const name = userResponse.data.name;
        this.setState({
          name
        });
      }
    } catch (err) {
      this.goBack();
    }
  }

  statDataUpdate = () => {
    this.getResultData();
  };

  inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    this.setState(
      {
        name
      },
      this.formValidation
    );
  };

  selectAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    this.setState(
      {
        answer
      },
      this.formValidation
    );
  };

  submitClickHandler = async () => {
    try {
      let request: any;
      let id: string;
      const userId = storageService.getUserId();
      if (!userId) {
        request = await API.createUser(this.state.name);
        storageService.putLocalStorage(request.data._id);
        id = request.data._id;
      } else {
        id = userId;
      }
      const params: IUserAnswerRequest = {
        id,
        answer: {
          questionId: this.props.match.params.pollId,
          answerId: this.state.answer
        }
      };
      const sendAnswerRes = await API.sendAnswer(params);
      this.setState({
        isUserAnswered: true
      });
      this.socket.addVote();
      this.statDataUpdate();
    } catch (err) {
      console.log("Error occurred", err);
    }
  };

  formValidation = () => {
    const { name, answer } = this.state;
    if (name && answer) {
      this.setState({
        isFormValid: true
      });
    } else {
      this.setState({
        isFormValid: false
      });
    }
  };

  goBack() {
    this.props.history.push({
      pathname: `/`
    });
  }

  answerRender = (answer: IAnswer) => {
    return (
      <div className="answer-item" key={answer.answerId}>
        <label htmlFor={`item-${answer.answerId}`} className="answer-item">
          <input
            id={`item-${answer.answerId}`}
            name="answer"
            type="radio"
            onChange={this.selectAnswerChange}
            value={answer.answerId}
          />
          {answer.title}
        </label>
      </div>
    );
  };

  questionFormRender() {
    const { question, answers, isFormValid, name, isUserAnswered } = this.state;
    const userId = storageService.getUserId();
    return (
      <div className="poll-form-wrap">
        <div className="title-wrap">
          <h1>{question}</h1>
        </div>
        {!isUserAnswered && (
          <div className="poll-wrap">
            <div className="name-input-wrap">
              <div className="name-input-title">Your name:</div>
              <input
                type="text"
                disabled={!!userId}
                value={name}
                onChange={this.inputNameHandler}
              />
            </div>
            <div className="answers-variants">
              {answers.map(this.answerRender)}
            </div>
            <div className="submit-button-wrap">
              <button disabled={!isFormValid} onClick={this.submitClickHandler}>
                Submit
              </button>
            </div>
          </div>
        )}
        <div className="results-wrap">
          <Results answers={answers} statData={this.state.statData} />
        </div>
      </div>
    );
  }

  render() {
    const { question, answers } = this.state;
    if (question && answers.length) {
      return <div className="content-wrap">{this.questionFormRender()}</div>;
    } else {
      return <div>Loading...</div>;
    }
  }

  componentWillUnmount() {
    this.socket.disconnection();
  }
}
