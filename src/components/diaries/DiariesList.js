import React from "react";
import DiarySummary from "./DiarySummary";
import { Link } from "react-router-dom";

const DiariesList = ({ diaries, authorId }) => {
  return (
    <div className="project-list section">
      <h4
        className="card-title"
        style={{ color: "#424242", textShadow: "2px 2px 2px #776a6a" }}
      >
        Diaries
      </h4>
      <div className="divider"></div>

      {diaries &&
        diaries.map((diary) => {
          // Show Private diaries to that user only
          if (diary.type === "private") {
            if (diary.authorId === authorId) {
              return (
                <DiarySummary
                  key={diary.id}
                  diary={diary}
                  authorId={authorId}
                />
              );
            }
          } else if (diary.type === "public") {
            return (
              <DiarySummary key={diary.id} diary={diary} authorId={authorId} />
            );
          }
        })}
      <div className="fixed-action-btn">
        <Link
          title="create new diary"
          className="btn-floating btn-large  waves-effect hoverable waves-light green"
          to="/create"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default DiariesList;
