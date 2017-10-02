import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import Landing from "./index";
import { Paper } from "material-ui";

describe(Landing, () => {
  const landing = (
    <MuiThemeProvider>
      <Landing />
    </MuiThemeProvider>
  );
  const component = mount(landing);
  it("renders and matches our snapshot", () => {
    const component = renderer.create(landing);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("has a class called landing", () => {
    expect(component.find(".landing").hasClass("landing")).toEqual(true);
  });
  it("has a title that has a class of landing-title", () => {
    expect(component.find("h1").hasClass("landing-title")).toEqual(true);
  });
  it("contains 9 paper components", () => {
    expect(component.find(Paper)).toHaveLength(9);
  });

  // it('adds another greeting when the add greeting function is called', () => {
  //   const before = component.find(HelloWorld).length;
  //   component.instance().addGreeting('Sample');
  //   const after = component.find(HelloWorld).length;
  //   expect(after).toBeGreaterThan(before);
  // });
  // it('removes a greeting from the list when the remove greeting function is called', () => {
  //   const before = component.find(HelloWorld).length;
  //   const removeMe = component.state('greetings')[0];
  //   component.instance().removeGreeting(removeMe);
  //   const after = component.find(HelloWorld).length;
  //   expect(after).toBeLessThan(before);
  // });
});
