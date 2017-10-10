import React from "react";
import Paper from "material-ui/Paper";

const style = {
  height: "auto",
  minWidth: "400px",
  margin: 20,
  zDepth: 4,
  textAlign: "left",
  display: "inline-block",
  borderRadius: "25px"
};

const PaperList = ({ title, data }) =>
  <Paper style={style} zDepth={1}>
    <h4 style={{ textAlign: "center" }}>
      {title}
    </h4>
    <ul style={{ listStyle: "none" }}>
      {data.map(item =>
        <li key={item}>
          {item}
        </li>
      )}
    </ul>
  </Paper>;

export default PaperList;
