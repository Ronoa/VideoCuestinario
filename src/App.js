import React, { Component } from 'react';
import { Button, Form, Input,Row,Col } from 'antd';
import 'antd/dist/antd.css'
// import './App.css';

class App extends Component {
  state ={
    
  }

 


componentDidMount(){
  this.parametrosvideo();  
}

async parametrosvideo(){ 
  if (navigator.mediaDevices === undefined) {
    console.log("undefined")
  }else{
    this.detectardispositivos();
  }
  this.solicitaraccesodispositivos();
}

// var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
async detectardispositivos(){
  navigator.mediaDevices.enumerateDevices()
  .then(devices => {
      devices.forEach(device=>{
          console.log(device.kind.toUpperCase(), device.label);
      })
  })
  .catch(err=>{
      console.log("ERR",err.name, err.message);
  })
}


solicitaraccesodispositivos(){
let constraintObj ={
  audio:true,
  video:{
    facingMode:'user',
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 } 
  }
}
  navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function(mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                video.srcObject = mediaStreamObj;
            } else {
                //old version
                video.src = window.URL.createObjectURL(mediaStreamObj);
            }
            
            video.onloadedmetadata = function(ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };
            
            //add listeners for saving video/audio
            let start = document.getElementById('btnStart');
            let stop = document.getElementById('btnStop');
            let vidSave = document.getElementById('vid2');
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];
            
            start.addEventListener('click', (ev)=>{
                mediaRecorder.start();
                console.log(mediaRecorder.state);
            })
            stop.addEventListener('click', (ev)=>{
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
            });
            mediaRecorder.ondataavailable = function(ev) {
              console.log(ev.data)  
              chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev)=>{
                let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
                chunks = [];
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
            }
        })
        .catch(function(err) { 
            console.log(err.name, err.message); 
        });
}



  render() {
    console.log("2", this.state.constraintObj);
    
    return (
      <div className="App">
        
        <Form layout="horizontal">
          <div>
            <Button type="primary" shape="circle" icon="video-camera" id="btnStart"></Button>
            <Button type="secundari" shape="circle" icon="pause" id="btnStop"></Button>
            <br></br>
            <video controls></video>
          </div>
          <br></br>
          <video id="vid2" controls></video>
          <Button type="primary">Guardar video</Button>

          <h1>hola mundo</h1>

        </Form>
      </div>
    );
  }
}

export default App;
