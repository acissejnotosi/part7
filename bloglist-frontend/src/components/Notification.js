import React from "react";
import { connect } from "react-redux";

const SuccessNotification = (props) => {

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div hidden={props.notification === ""} style={style}>
      {props.notification}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {notification : state.notification}
}
const connectNotification = connect(mapStateToProps)(SuccessNotification);
export default connectNotification;
