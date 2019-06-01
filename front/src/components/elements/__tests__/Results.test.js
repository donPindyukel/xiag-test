import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Results } from "../Results/Results";

describe("<Results />", () => {
  let component;
  const props = {
    answers: [
      {
        title: 'test',
        answerId: 'test',
      }
    ],
    statData: [{
      userId: 'test',
      userName: 'test',
      answerId: 'test',
      answerTitle: 'test'
    }]
  };

  describe("Results", () => {
    beforeAll(() => {
      component = shallow(<Results {...props}/>);
    });

    it("renders the component", () => {
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});