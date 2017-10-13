import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import Iframe from "react-iframe";

export default class IframeComponent extends Component {
  state = {
    open: false,
    loading: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { author, url } = this.props;
    url = url.slice(0, 5) === "http:" ? "https" + url.slice(4) : url;
    const actions = [
      <FlatButton primary={true} onClick={this.handleClose}>
        BACK
      </FlatButton>,
      <FlatButton primary={true}>
        <a
          style={{ textDecoration: "none", color: "#1fbcd2" }}
          href={url}
          target="_blank"
        >
          LINK
        </a>
      </FlatButton>
    ];

    return (
      <div>
        <RaisedButton label={author} onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}
        >
          <div className="iframe-container">
            <Iframe
              url={url}
              width="100%"
              height="100%"
              display="initial"
              position="relative"
              allowFullScreen
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
