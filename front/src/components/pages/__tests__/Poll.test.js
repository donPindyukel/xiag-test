import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Poll } from "../Poll/Poll";

describe("<Poll />", () => {
  let component;

  describe("Poll", () => {
    beforeAll(() => {
      component = shallow(<Poll />);
    });

    it("renders the component", () => {
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});