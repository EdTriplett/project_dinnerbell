import React from "react";
import Paper from "material-ui/Paper";

const style = {
  height: 400,
  width: 400,
  margin: 20,
  zDepth: 4,
  textAlign: "center",
  display: "inline-block"
};

const PaperList = ({ title, data }) =>
  <Paper style={style} zDepth={1}>
    <h4>
      {title}
    </h4>
    <ul>
      {data.map(item =>
        <li>
          {item}
        </li>
      )}
    </ul>
  </Paper>;

export default PaperList;
