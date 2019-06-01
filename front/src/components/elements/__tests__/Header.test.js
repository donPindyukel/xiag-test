import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Header } from "../Header/Header";

describe("<Header />", () => {
  let component;

  describe("Header", () => {
    beforeAll(() => {
      component = shallow(<Header />);
    });

    it("renders the component", () => {
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});