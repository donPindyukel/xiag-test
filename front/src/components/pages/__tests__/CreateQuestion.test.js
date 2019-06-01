import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { CreateQuestion } from "../CreateQuestion/CreateQuestion";

describe("<CreateQuestion />", () => {
  let component;

  describe("CreateQuestion", () => {
    beforeAll(() => {
      component = shallow(<CreateQuestion />);
    });

    it("renders the component", () => {
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});