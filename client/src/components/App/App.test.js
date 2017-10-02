import React from "react";
import App from "./index";
import Landing from "../Landing";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
configure({ adapter: new Adapter() });

describe(App, () => {
  const component = shallow(<App />);
  it("renders and matches our snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("contains an Landing subcomponent", () => {
    expect(component.find(Landing)).toHaveLength(1);
  });
});
