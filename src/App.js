import React, { Component } from 'react';
import { Button, Form,Carousel } from 'antd';
import 'antd/dist/antd.css'
import './App.css';
import HeaderVOD from './components/HeaderVOD'
import VOD from './components/VOD'
// import {solicitaraccesodispositivos} from './components/baseconfig'
import Homebase from './components/home/home';
import Entrevista from './components/entrevista/entrevista';
import Contenido from './components/contenido/contenido';
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
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

  componentDidMount() {
    // this.parametrosvideo();

  }

  async parametrosvideo() {
    if (navigator.mediaDevices === undefined) {
      console.log("undefined")
    } else {
      this.detectardispositivos();
    }
    this.solicitaraccesodispositivos();
  }

  async detectardispositivos() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        devices.forEach(device => {
          console.log(device.kind.toUpperCase(), device.label);
        })
      })
      .catch(err => {
        console.log("ERR", err.name, err.message);
      })
  }

  async  solicitaraccesodispositivos() {
    let constraintObj = {
      audio: true,
      video: {
        facingMode: 'user',

      }
    }
    const resultmedia = await navigator.mediaDevices.getUserMedia(constraintObj)
      .catch(function (err) {
        console.log(err.name, err.message);
      });
    let multi = await resultmedia;

    if (multi === undefined) {
      alert('se requiere activar camara y audio')
    }


    this.setState({ dispositivos: multi, ismedia: true }, () => this.updateDevices())

  }

  updateDevices() {
    let video = document.querySelector('video');

    console.log("video", video)
    console.log("dispositivos66666", this.state.dispositivos)

    if ("srcObject" in video) {
      video.srcObject = this.state.dispositivos;
    } else {
      video.src = window.URL.createObjectURL(this.state.dispositivos);
    }

    let mediaRecorder = new MediaRecorder(this.state.dispositivos);
    this.setState({
      mediaRecorder
    })

    let chunks = [];
    let actual = this;
    mediaRecorder.ondataavailable = function (ev) {
      console.log(ev.data)
      chunks.push(ev.data);
      actual.setState({ chunks })
    }
  }

  caputara = (e) => {
    let vidSave = document.getElementById('vid2');
    if (!this.state.recording) {
      this.state.mediaRecorder.start();
      this.setState({ recording: true })

    } else {
      this.state.mediaRecorder.stop();
      this.setState({ recording: false })

      let actual = this;
      this.state.mediaRecorder.onstop = (ev) => {
        let blob = new Blob(this.state.chunks, { 'type': 'video/mp4;' });
        actual.setState({ pregunta1: blob, chunks: [] })

        let videoURL = window.URL.createObjectURL(this.state.pregunta1);
        vidSave.src = null;
        vidSave.src = videoURL;
      }
    }
  }

  render() {

    return (
      <Router>
        {/* <Header /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/videoentrevista" component={videoentrevista} />
        <div className="App">
          {/* 
        <Form layout="horizontal">
          <div>
            <Button type="primary"  icon="video-camera" id="btnStart" onClick={this.caputara}>{this.state.recording?'Stop':'Iniciar'}</Button>
            <br></br>
            <video controls autoPlay></video>
          </div>
          <br></br>
          <video id="vid2" controls></video>
          <Button type="primary">Guardar video</Button>
        </Form> */}

          {/* <HeaderVOD />
        {this.state.ismedia>0 &&
          <VOD  
            dispositivos={this.state.dispositivos}
            mediaRecorder={this.state.mediaRecorder}
            
          />
        } */}
          {/* <Button type="primary">Guardar video</Button> */}
          {/* <Homebase></Homebase> */}
        </div>
      </Router>
    );
  }
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Inicio</Link>
      </li> 
      <li>
        <Link to="/videoentrevista">video</Link>
      </li>     
    </ul>
  );
}
function Home() {
  return( 
    <>
    <Homebase></Homebase>
    <Footer></Footer>
    <Contenido></Contenido>    
    </>
  )
}
function videoentrevista() {
  return (
    <>
    <Homebase></Homebase>
    <Carousel  afterChange={onChange}>
    <div><h3><Entrevista></Entrevista></h3></div>
    <div><h3><Entrevista></Entrevista></h3></div>
    <div><h3><Entrevista></Entrevista></h3></div>
    <div><h3><Entrevista></Entrevista></h3></div>
    </Carousel>
    
    </>
  );
}
function onChange(a, b, c) {
  console.log(a, b, c);
}

export default App;
