import styled from "styled-components";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam  from "react-webcam";
import React, { useRef, useEffect } from "react";
import { drawBox } from "./helper";

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runModel = async () =>{
    //Loading and running the model in 1 millisecond interverl
    const model = await cocossd.load();
    setInterval(()=>{modelDetection(model)},10)

  }

  const modelDetection = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
     
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await model.detect(video);
      console.log(obj);
      const ctx = canvasRef.current.getContext("2d");
      drawBox(obj,ctx);
      
    }
  }

  useEffect(()=>{
    runModel();
  },[]);

  return (
  
  <Container>
     <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            zindex: 9,
            width: 640,
            height: 480,
            borderRadius: 16,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
  </Container>
  );
}

export default App;


const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(to top, #4F6072, #8699AA);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`