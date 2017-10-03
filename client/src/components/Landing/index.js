import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { withRouter } from 'react-router-dom';

import './Landing.css';

const style = {
  height: 100,
  width: 100
};

// const onClickRegister = () => {
//   this.props
// }

class Landing extends Component {
  render() {
    return (
      <section className="landing">
        <h1 className="landing-title">dinnerbell</h1>
        <p className="landing-description">
          <span>cook ~ eat ~ enjoy</span>
        </p>
        <div className="landing-auth-container">
          <button
            onClick={() => {
              this.props.history.push('/register');
            }}
          >
            register
          </button>
          <button
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            login
          </button>
        </div>

        <div className="landing-img-cube">
          <div className="landing-images ">
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-1" />
            </Paper>
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-2" />
            </Paper>
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-3" />
            </Paper>
          </div>
          <div className="landing-images">
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-4" />
            </Paper>
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-5" />
            </Paper>
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-6" />
            </Paper>
          </div>
          <div className="landing-images">
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-7" />
            </Paper>
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-8" />
            </Paper>
            <Paper style={style} zDepth={2}>
              <div className="landing-img-container-9" />
            </Paper>
          </div>
          <div className="oauth-landing">
            <a href="/auth/facebook">
              <img src="https://imgur.com/Hw9YUrJ.png" />
            </a>
            <a href="/auth/google">
              <img src="https://i.imgur.com/ETp8DOT.png" />
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Landing);

// <img
//   className="landing-img"
//   src="https://www.bellamysorganic.com.au/blog/wp-content/uploads/2013/12/understanding-the-health-benefits-of-organic-food-1.jpg"
// />
