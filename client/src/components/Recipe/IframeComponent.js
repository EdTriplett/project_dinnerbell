import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import Iframe from "react-iframe";

const styles = {
  radioButton: {
    marginTop: 16
  }
};

/**
 * Dialog content can be scrollable.
 */
export default class IframeComponent extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton label="Back" primary={true} onClick={this.handleClose} />
    ];

    let { author, url } = this.props;
    url = url.slice(0, 5) === "http:" ? "https" + url.slice(4) : url;

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
