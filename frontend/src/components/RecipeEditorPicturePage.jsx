import React from "react";
import "./RecipeEditor.css";

export default function RecipeEditorPicturePage({ recipeData, dispatch }) {
  return (
    <>
      <h2 className="upload-photo">Uplaod a new photo:</h2>
      <input
        type="file"
        onChange={(e) => {
          dispatch({
            type: "changeInput",
            variable: "picture",
            value: e.target.files[0],
          });
        }}
      />
      {recipeData.picture ? (
        <>
          <img src={URL.createObjectURL(recipeData.picture)} alt="" />
          <button
            className="discard-photo"
            onClick={() => {
              dispatch({
                type: "changeInput",
                variable: "picture",
                value: null,
              });
            }}
          >
            Discard current upload
          </button>
        </>
      ) : recipeData.imageURL ? (
        <img
          src={recipeData.imageURL}
          alt=""
        />
      ) : (
        <div className="noPicture">
          <p className="message">image unavailable</p>
        </div>
      )}
    </>
  );
}
