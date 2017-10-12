import React from "react";

const style = {
  height: "auto",
  minWidth: "400px",
  zDepth: 4,
  marginRight: 10,
  marginLeft: 10,
  textAlign: "left",
  display: "inline-block",
  borderRadius: "25px"
};

const PaperList = ({ title, data }) =>

      <div id="note">
          <span className="scratch"></span>
          <div className="sticky">
            <div className="inner">
              
            <div className="paper">
 
              <b>{title}</b>
            
              <div className="recipe-list">

                    {data.map(item =>
                      <div key={item}>
                        {item}
                      </div>
                    )}
        
              </div>
            </div>
          </div>
        </div>

    </div>
    

export default PaperList;
