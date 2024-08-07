import * as React from "react";
import ReactCrop, { PercentCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import setCanvasPreview from "../setCanvasPreview";
import { RecipeEditorData } from "../types";
import "./Modal.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 600;

export default function Modal({ 
    closeModal, recipeData, setRecipeData 
} : {
    closeModal: () => void,
    recipeData: RecipeEditorData,
    setRecipeData: React.Dispatch<React.SetStateAction<RecipeEditorData>>,
}) {

    const [imageURL, setImageURL] = React.useState<string>("");
    const imageRef = React.useRef<HTMLImageElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [crop, setCrop] = React.useState<PercentCrop | undefined>();
    const [error, setError] = React.useState<string>("");


    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) {
            return;
        }
        const file = e.target.files[0];
        setImageURL(URL.createObjectURL(file));
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setError("Image must be at least 600 x 600 pixels.");
            setImageURL("");
            return;
        }
        if (error) {
            setError("");
        }

        const cropWidthInPercent = (MIN_DIMENSION / naturalWidth) * 100;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    return (
        <div className="modal">
            <div className="modal-content border-grey bg-white">
                <div className="control-container-modal">
                    <input
                        type="file"
                        onChange={onSelectFile}
                    />
                    <button 
                        type="button" 
                        className="btn btn-red white text-btn" 
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
                {error && <p className="modal-error">{error}</p>}
                {imageURL &&
                <>
                    <div className="modal-image-container">
                        <ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={
                                imageRef.current ?
                                (MIN_DIMENSION / imageRef.current.naturalWidth) * imageRef.current.width : 0
                            }
                        >
                            <img 
                                ref={imageRef}
                                className="crop-image-preview-modal"
                                src={imageURL} 
                                alt="uploaded recipe"
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>
                    <button 
                        type="button"
                        className="btn btn-red white text-btn crop-button-modal"
                        onClick={() => {
                            // quick fix, needs revisit
                            if (canvasRef.current === null || imageRef.current === null || crop === undefined) {
                                return;
                            }
                            setCanvasPreview(
                                imageRef.current,
                                canvasRef.current,
                                convertToPixelCrop(
                                    crop, 
                                    imageRef.current.width, 
                                    imageRef.current.height
                                )
                            );
                            canvasRef.current.toBlob((blob) => {
                                if (blob === null) {
                                    setError("Unable to crop file");
                                    return;
                                }
                                let file = new File([blob], "newImage.png", { type: "image/png"});
                                if (!file) {
                                    setError("Unable to crop file");
                                } else {
                                    setRecipeData({...recipeData, picture: file})
                                    closeModal();
                                }
                            }, "image/png");
                        }}
                    >
                        Crop Image
                    </button>
                </>
                }
                {crop && 
                        <canvas style={{
                            display: "none",
                            border: "1px solid black",
                            objectFit: "contain",
                            width: MIN_DIMENSION,
                            height: MIN_DIMENSION,
                        }} ref={canvasRef} />}
            </div>
        </div>
    );
}