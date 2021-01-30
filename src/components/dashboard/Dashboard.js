import React, { Component } from "react";
import DiariesList from "./../diaries/DiariesList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { BeatLoader } from "react-spinners";
import { Redirect } from "react-router-dom";
import Notifications from "./Notifications";

// Dashboard
class Dashboard extends Component {
  render() {
    const { diaries, auth, notifications } = this.props;
    console.log(auth);
    if (!auth.uid) return <Redirect to="/signin" />;

    // Return Dashboard
    if (diaries) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <DiariesList diaries={diaries} />
            </div>
            <div className="col s12 m5 offset-m1">
              <Notifications notifications={notifications} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader loading />
      </div>
    );
  }
}

// Map State to props
const mapStateToProps = (state) => {
  return {
    notifications: state.firestore.ordered.notifications,
    diaries: state.firestore.ordered.diaries,
    entries: state.firestore.ordered.entries,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "diaries", orderBy: ["createdAt", "desc"] }, // Collection diaries
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }, // Connect to notifications collection
  ])
)(Dashboard);
