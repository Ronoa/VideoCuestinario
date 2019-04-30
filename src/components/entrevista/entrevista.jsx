import {
  Component
  //React
  // PropTypes
} from 'react';
// import React from 'react';

/* Templates */
import Entrevistapug from './entrevista.pug';
/* AntD components */
import { Layout, Row, Col} from 'antd';

/* Styles */
import './entrevista.styl';
// import Entrevista from './entrevista';

const { Header } = Layout;

class App extends Component {
// export default class entrevista extends React.PureComponent {
  /* Constructor y render necesarios */
  state = {
    recording: false,
    dispositivos: {},
    mediaRecorder: {},
    chunks: [],
    datamedia: [],
    isrender: true,
    ismedia: false,



    pregunta1: [],
    pregunta2: [],
    pregunta3: [],
    pregunta4: [],
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


  render () {
     console.log("2")
     console.log('dispositivos props', this.props.pregunta)
     let pregunta=this.props.pregunta
    const propsAndComponents = {
      Header,
      Row,
      Col,
      pregunta
    }

    /* Return  template */
    return Entrevistapug.call(this, propsAndComponents);
  }
}
/* Definimos los  tipos de propiedades */
// App.propTypes = {};

/* Definimos las propiedades por defecto */
// App.defaultProps = {};

/* Exportamos la clase App */
export default App;
