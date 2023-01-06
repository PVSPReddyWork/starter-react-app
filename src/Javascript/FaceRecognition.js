import { CustomLogger } from './CustomLogger.js';
import * as faceapi from 'face-api.js';
import * as mongoDataBase from './MongoDB.js';

export const loadModels = async () => {
  try {
    const MODELS_PATH = './models'; //path.join(__dirname, './../Models');
    CustomLogger.MessageLogger(MODELS_PATH);
    CustomLogger.MessageLogger('Testing');
    /*
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_PATH),
      faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_PATH),
      faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_PATH),
    ]).then(loadDescriptiors());
    */
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_PATH),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_PATH),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_PATH),
    ]).then(loadDescriptiors());
    /*
    faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_PATH).then((result) => {
      CustomLogger.MessageLogger('SSD model loaded');
      faceapi.nets.faceRecognitionNet
        .loadFromDisk(MODELS_PATH)
        .then((result) => {
          CustomLogger.MessageLogger('faceRecognitionNet model loaded');
          faceapi.nets.faceLandmark68Net
            .loadFromDisk(MODELS_PATH)
            .then((result) => {
              CustomLogger.MessageLogger('faceLandmark68Net model loaded');
              //loadDescriptiors();
            })
            .catch((error) => {
              CustomLogger.ErrorLogger(error);
            });
        })
        .catch((error) => {
          CustomLogger.ErrorLogger(error);
        });
    });*/
  } catch (ex) {
    CustomLogger.ErrorLogger(error);
  }
};

const LoadedModels = async () => {
  try {
    CustomLogger.MessageLogger('Loaded all the details');
  } catch (ex) {
    CustomLogger.ErrorLogger(error);
  }
};

const loadDescriptiors = async (faceAppoximity = 0.6) => {
  try {
    const labeledFaceDescriptorsData =
      await mongoDataBase.GetAllFaceDescriptiors();
    if (
      labeledFaceDescriptorsData !== null &&
      labeledFaceDescriptorsData !== undefined &&
      labeledFaceDescriptorsData.length > 0
    ) {
      let labeledFaceDescriptors = [];
      for (i = 0; i < labeledFaceDescriptorsData.length; i++) {
        for (
          j = 0;
          j < labeledFaceDescriptorsData[i].descriptions.length;
          j++
        ) {
          labeledFaceDescriptorsData[i].descriptions[j] = new Float32Array(
            Object.values(labeledFaceDescriptorsData[i].descriptions[j])
          );
        }
        /**/
        labeledFaceDescriptorsData[i] = new faceapi.LabeledFaceDescriptors(
          labeledFaceDescriptorsData[i].label,
          labeledFaceDescriptorsData[i].descriptions
        );
        /**/
      }
      //CustomLogger.ErrorLogger(`Result from mongo database /n ${JSON.stringify(labeledFaceDescriptorsData)}`);
      faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptorsData, 0.6);
      CustomLogger.MessageLogger('Data loading completed');
    }
  } catch (ex) {
    CustomLogger.ErrorLogger(ex);
  }
};

/*
const faceapiModule = require('./Modules/face-api.min.js');
//const faceapiModule = require('face-api.js');
const { CustomLogger } = require('./CustomLogger.js');
const { Helper } = require('./Helper.js');
const path = require('path');
const mongoDataBase = require('./MongoDB.js');
const canvas = require('canvas');
const nodeFetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
//npm install node-fetch@^2.6.6

var faceapi = faceapiModule;
var labeledImagesPaths = [];
var faceMatcher = null;
var percentageDataLoaded = 0;

// Make face-api.js use that fetch implementation
const { Canvas, Image, loadImage, ImageData } = canvas;
faceapi.env.monkeyPatch({ fetch: nodeFetch });
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const loadRequiredModels = async () => {
  try {
    const MODELS_PATH = path.join(__dirname, './../Models');
    CustomLogger.MessageLogger(MODELS_PATH);
    faceapi.nets.ssdMobilenetv1
      .loadFromDisk(MODELS_PATH)
      .then((result) => {
        CustomLogger.MessageLogger('SSD model loaded');
        faceapi.nets.faceRecognitionNet
          .loadFromDisk(MODELS_PATH)
          .then((result) => {
            CustomLogger.MessageLogger('faceRecognitionNet model loaded');
            faceapi.nets.faceLandmark68Net
              .loadFromDisk(MODELS_PATH)
              .then((result) => {
                CustomLogger.MessageLogger('faceLandmark68Net model loaded');
                loadDescriptiors();
              })
              .catch((error) => {
                CustomLogger.ErrorLogger(error);
              });
          })
          .catch((error) => {
            CustomLogger.ErrorLogger(error);
          });
      })
      .catch((error) => {
        CustomLogger.ErrorLogger(error);
      });
    /*
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_PATH),
      faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_PATH),
      faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_PATH),
    ]).then(AccessLocalImages()); //(AccessDriveImages(FolderAccessCode));
    * /
  } catch (ex) {
    CustomLogger.ErrorLogger(ex);
  }
};

async function loadDescriptiors(faceAppoximity = 0.6) {
  try {
    const labeledFaceDescriptorsData =
      await mongoDataBase.GetAllFaceDescriptiors();
    if (
      labeledFaceDescriptorsData !== null &&
      labeledFaceDescriptorsData !== undefined &&
      labeledFaceDescriptorsData.length > 0
    ) {
      let labeledFaceDescriptors = [];
      for (i = 0; i < labeledFaceDescriptorsData.length; i++) {
        for (
          j = 0;
          j < labeledFaceDescriptorsData[i].descriptions.length;
          j++
        ) {
          labeledFaceDescriptorsData[i].descriptions[j] = new Float32Array(
            Object.values(labeledFaceDescriptorsData[i].descriptions[j])
          );
        }
        /** /
        labeledFaceDescriptorsData[i] = new faceapi.LabeledFaceDescriptors(
          labeledFaceDescriptorsData[i].label,
          labeledFaceDescriptorsData[i].descriptions
        );
        /** /
      }
      //CustomLogger.ErrorLogger(`Result from mongo database /n ${JSON.stringify(labeledFaceDescriptorsData)}`);
      faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptorsData, 0.6);
      CustomLogger.MessageLogger('Data loading completed');
    }
  } catch (ex) {
    CustomLogger.ErrorLogger(ex);
  }
}

async function SearchForFaces(imageData) {
  let response = await Helper.createResponseObject(
    Helper.CodeServerError,
    null,
    ''
  );
  try {
    /** /
    if (faceMatcher !== null && faceMatcher !== undefined) {
      CustomLogger.MessageLogger('Got the Data');
      const imgToDetect = await canvas.loadImage(imageData.filesPath);
      //CustomLogger.MessageLogger('Image Prepared');

      let canvasInput = faceapi.createCanvasFromMedia(imgToDetect);
      var context = canvasInput.getContext('2d');
      context.drawImage(imgToDetect, 10, 10);

      const displaySize = {
        width: imgToDetect.width,
        height: imgToDetect.height,
      };
      //CustomLogger.MessageLogger('Canvas Prepared');
      faceapi.matchDimensions(canvasInput, displaySize);
      CustomLogger.MessageLogger('Dimensions Adjusted');
      const detections = await faceapi
        .detectAllFaces(imgToDetect)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedWithDetections = faceapi.resizeResults(
        detections,
        displaySize
      );
      const results = resizedWithDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );
      /** /
      let responseImage = "";
      results.forEach((result, i) => {
        const box = resizedWithDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString(),
        });
        drawBox.draw(canvasInput);
        responseImage = canvasInput.toDataURL(imageData.mime)
      });
      return responseImage;
      /** /
      response = await Helper.createResponseObject(
        Helper.CodeSuccess,
        results,
        'Process is completed'
      );
    } else {
      response = await Helper.createResponseObject(
        Helper.CodeServerError,
        null,
        'Faces database not loaded completely, please wait ssometime and try again'
      );
    }
    /** /
  } catch (ex) {
    response = await Helper.createResponseObject(
      Helper.CodeClientError,
      null,
      'Invalid or wrong format image is loaded, please try with a base64 formated jpg or jpeg or png formated image data for better results, thank you!'
    );
    CustomLogger.ErrorLogger(ex);
  }
  return response;
}

loadRequiredModels();

module.exports = {
  loadRequiredModels,
  SearchForFaces,
  loadDescriptiors,
};
*/
