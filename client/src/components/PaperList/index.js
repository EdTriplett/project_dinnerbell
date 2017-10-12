import React from "react";
import Paper from "material-ui/Paper";

const style = {
  height: "auto",
  minWidth: "400px",
  zDepth: 4,
  marginRight: 10,
  marginLeft: 10,
  textAlign: "left",
  display: "inline-block",
  borderRadius: "25px",
  fontFamily: "Open Sans"
};

const PaperList = ({ title, data }) =>
  <div>
    <Paper style={style} zDepth={4}>
      <h3
        style={{
          textAlign: "center",
          margin: 0,
          paddingTop: "10px",
          textDecoration: "underline"
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: "none" }}>
        {data.map(item =>
          <li key={item}>
            {item}
          </li>
        )}
      </ul>
    </Paper>
  </div>;

export default PaperList;
