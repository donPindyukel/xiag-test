import React from "react";
import { IAnswer, IStatData } from "Models";
import "./styles.css";

export interface IResultsProps {
  answers: IAnswer[];
  statData: IStatData[];
}

export class Results extends React.Component<IResultsProps, {}> {

  render() {
    const data = this.props.statData;
    const answers = this.props.answers;
    return (
      <div className="results-wrap">
        <h1>Results</h1>
        <div className="rows">
          <div className="header">
            <div className="name">Name</div>
            {answers.map((answer: IAnswer) => (
              <div className="answer" key={answer.answerId}>
                {answer.title}
              </div>
            ))}
          </div>
          {data.map((item: IStatData) => (
            <div className="data-row" key={item.userId}>
              <div className="name">{item.userName}</div>
              {answers.map((answer: IAnswer) => (
                <div
                  className="answer-data"
                  key={`${answer.answerId}-data-row`}
                >
                  {answer.answerId === item.answerId ? "x" : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
