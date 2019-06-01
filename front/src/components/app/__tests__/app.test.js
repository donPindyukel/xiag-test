import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { App } from "../app";

describe("<App />", () => {
  let component;

  describe("App", () => {
    beforeAll(() => {
      component = shallow(<App />);
    });

    it("renders the component", () => {
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
