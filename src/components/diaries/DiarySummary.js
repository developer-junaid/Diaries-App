/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { deleteDiary, updateDiary } from "../../store/actions/diaryActions";
import moment from "moment";

const DiarySummary = ({
  diary,
  updateDiary,
  deleteDiary,
  userProfile,
  canEdit,
}) => {
  // variables
  const title = diary.title;
  const type = diary.type;
  const totalEntries = diary.entryIds.length;
  const [userName, setUserName] = useState(
    `${diary.authorFirstName} ${diary.authorLastName}`
  );

  if (userName === `${userProfile.firstName} ${userProfile.lastName}`) {
    setUserName("You");
  }

  // Handle Click
  const handleClick = () => {
    Swal.fire({
      title: "Diary Title",
      input: "text",
      inputValue: diary.title,
      showCancelButton: true,
      confirmButtonColor: "green",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
      confirmButtonText: "Change",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // If cancelled
        Swal.fire({
          title: "Cancelled",
          confirmButtonColor: "red",
        });
      } else if (result.value) {
        // Update the value - Dispatch updateTitle - new value = result.value
        // Update diary
        updateDiary({ ...diary, title: result.value });

        // Alert success
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Diary updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // handleDelete
  const handleDelete = () => {
    //logic
    deleteDiary(diary);
  };

  // Button conditional rendering
  const button = canEdit ? (
    <Link
      to={"/diary/" + diary.id + "/create"}
      className="btn btn-small waves-effect  waves-light entries-btn"
      title="Add entry"
      style={{
        width: "9%",
        backgroundColor: "#4aa69b",
      }}
    >
      <i className="material-icons right">add</i>
    </Link>
  ) : null;

  // Button conditional rendering
  const editButton = canEdit ? (
    <a
      onClick={handleClick}
      title="edit"
      style={{ color: "#4aa69b" }}
      className="secondary-content"
    >
      <i style={{ color: "#424242" }} className="material-icons edit-icon">
        create
      </i>
    </a>
  ) : null;

  // Button conditional rendering
  const deleteButton = canEdit ? (
    <a
      onClick={handleDelete}
      title="delete"
      style={{ color: "#4aa69b" }}
      className="secondary-content"
    >
      <i style={{ color: "#424242" }} className="material-icons edit-icon">
        delete
      </i>
    </a>
  ) : null;

  return (
    <div className="card hoverable z-depth-2 diary-summary">
      <div className="card-content grey-text text-darken-3">
        <div className="card-title">
          {editButton}
          {title}
          <a
            title={type === "private" ? "private" : "public"}
            href="#!"
            className="secondary-content"
          >
            <i style={{ color: "#424242" }} className="material-icons">
              {type === "private" ? "lock" : "lock_open"}
            </i>
          </a>
          {deleteButton}
        </div>

        <span
          className="new badge"
          data-badge-caption={
            totalEntries > 1 ? "saved entries" : "saved entry"
          }
        >
          {totalEntries}
        </span>

        <p>
          Posted by <span className="pink-text">{userName}</span>
        </p>

        <p className="grey-text">
          {moment(diary.createdAt.toDate()).calendar()}
        </p>
        <div className="right-align">
          {totalEntries > 0 ? (
            <Link
              to={"/diary/" + diary.id}
              className="btn btn-small waves-effect  waves-light entries-btn"
              title="View entries"
              style={{
                width: "9%",
                backgroundColor: "#4aa69b",
              }}
            >
              <i className="material-icons right">send</i>
            </Link>
          ) : (
            button
          )}
        </div>
      </div>
    </div>
  );
};

// Map State to props
const mapStateToProps = (state) => {
  return {
    userProfile: state.firebase.profile,
  };
};

// Map Dispatch to props
const mapDispatchToProps = (dispatch) => {
  // Attach these to props
  return {
    // Take diary and pass to updateDiary action creator
    updateDiary: (diary) => dispatch(updateDiary(diary)),
    deleteDiary: (diary) => dispatch(deleteDiary(diary)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiarySummary);
