import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default class DialogExampleScrollable extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const { recipe } = this.props;

    return (
      <div>
        <RaisedButton labelColor="white" backgroundColor="#E34B27" hoverColor="#C32B07" label="Nutrition Facts" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <section class="performance-facts">
            <header class="performance-facts__header">
              <h1 class="performance-facts__title">Nutrition Facts</h1>
              <p>Serving Size 1</p>
              <p>Servings Per Meal {recipe.serves}</p>
            </header>
            <table class="performance-facts__table">
              <thead>
                <tr>
                  <th colspan="3" class="small-info">
                    Amount Per Serving
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colspan="2">
                    <b>Calories</b>
                    {Math.floor(recipe.calories / recipe.serves)}
                  </th>
                </tr>
                <tr class="thick-row">
                  <td colspan="3" class="small-info">
                    <b>% Daily Value*</b>
                  </td>
                </tr>

                {recipe.digest.slice(0, 9).map(nut => {
                  let individualServe = Math.floor(nut.total / recipe.serves);
                  let individualDaily = Math.floor(nut.daily / recipe.serves)
       
                  return (
                    <tr>
                      <th colspan="2">
                        <b>{nut.label}</b>
                        {individualServe}g
                      </th>
                      <td>
                        <b>{individualDaily}%</b>
                      </td>
                    </tr>
                  )
                  
                })}

              </tbody>
            </table>

            <p class="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>
            
            <table class="performance-facts__table--small small-info">
              <thead>
                <tr>
                  <td colspan="2"></td>
                  <th>Calories:</th>
                  <th>2,000</th>
                  <th>2,500</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colspan="2">Total Fat</th>
                  <td>Less than</td>
                  <td>65g</td>
                  <td>80g</td>
                </tr>
                <tr>
                  <td class="blank-cell"></td>
                  <th>Saturated Fat</th>
                  <td>Less than</td>
                  <td>20g</td>
                  <td>25g</td>
                </tr>
                <tr>
                  <th colspan="2">Cholesterol</th>
                  <td>Less than</td>
                  <td>300mg</td>
                  <td>300 mg</td>
                </tr>
                <tr>
                  <th colspan="2">Sodium</th>
                  <td>Less than</td>
                  <td>2,400mg</td>
                  <td>2,400mg</td>
                </tr>
                <tr>
                  <th colspan="3">Total Carbohydrate</th>
                  <td>300g</td>
                  <td>375g</td>
                </tr>
                <tr>
                  <td class="blank-cell"></td>
                  <th colspan="2">Dietary Fiber</th>
                  <td>25g</td>
                  <td>30g</td>
                </tr>
              </tbody>
            </table>
            
            <p class="small-info">
              Calories per gram:
            </p>
            <p class="small-info text-center">
              Fat 9
              &bull;
              Carbohydrate 4
              &bull;
              Protein 4
            </p>
            
          </section>
        </Dialog>
      </div>
    );
  }
}