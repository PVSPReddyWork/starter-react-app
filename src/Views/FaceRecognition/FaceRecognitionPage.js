import React, { useEffect } from 'react';
import { CustomLogger } from './../../Javascript/CustomLogger.js';
import { loadModels } from './../../Javascript/FaceRecognition.js';

const FaceRecognition_Page = (parms) => {
  useEffect(() => {
    try {
      loadModels();
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
    // imgRef.current && loadModels();
  }, []);
  return (
    <>
      <div className="divBody">
        <div className="divData">
          <div className="divDataInput">
            <input
              type="file"
              className="imageUpload"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <div className="divDataOutputDisplay"></div>
        </div>
      </div>
      {/* <div className="divPopup">
        <h1 className="textLoadingPopup">Loading</h1>
      </div> */}
    </>
  );
};

const FaceRecognitionPage = FaceRecognition_Page;
export default FaceRecognitionPage;
