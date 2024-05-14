import React, { useState, useRef } from "react";
import Modal from "./Modal";
import 'react-image-crop/dist/ReactCrop.css'

export default function RecipeEditorPicturePage({ recipeData, dispatch }) {

  const [modalOpen, setModalOpen] = useState(false);
  const img = useRef();

  console.log(img);

  return (
    <>
      <button 
        className="upload-photo" 
        onClick={() => setModalOpen(true)}
      >
        Uplaod a new photo
      </button>
      {/* <input
        type="file"
        onChange={(e) => {
          dispatch({
            type: "changeInput",
            variable: "picture",
            value: e.target.files[0],
          });
        }}
      /> */}
      {recipeData.picture ? (
        <>
          <img ref={img} 
          className="image-display" src={URL.createObjectURL(recipeData.picture)} alt="" />
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
          className="image-display"
          src={recipeData.imageURL}
          alt=""
        />
      ) : (
        <div className="noPicture">
          <p className="message">image unavailable</p>
        </div>
      )}
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} dispatch={dispatch}/>}
    </>
  );
}
