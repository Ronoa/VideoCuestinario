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
import Videolist from './components/lists-video/lists-video';
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
    preguntasentrevista:[
      {id:1,pregunta:'¿Consideras tener una amplia experiencia en el tema de diseño de productos digitales?',estado:false},
      {id:2,pregunta:'¿En donde te ves en 5 años?',estado:false},
      {id:3,pregunta:'¿Cuáles son tus metas?',estado:false},
      {id:4,pregunta:'¿Cuáles son las primeras diferencias que encuentras entre UX y UI? Has tenido experiencia',estado:false},
      {id:5,pregunta:'¿Cuáles son las primeras diferencias que encuentras entre UX y UI?',estado:false}],


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
        <Route exact path="/" component={Home} />
        <Route exact path="/videoentrevista" component={videoentrevista} />
        <Route exact path="/videos" component={videoList} />

      </Router>
    );
  }
}

// function Header() {
//   return (
//     <ul>
//       <li>
//         <Link to="/">Inicio</Link>
//       </li>
//       <li>
//         <Link to="/videoentrevista">video</Link>
//       </li>
//     </ul>
//   );
// }
function Home() {
  return(
    <>
    <Homebase></Homebase>
    <Contenido></Contenido>
    <Footer></Footer>
    </>
  )
}
<<<<<<< HEAD
function videoentrevista(props) {
  console.log("aqui1",props.state)
  const preguntasentrevista=[]
  
=======
function videoList() {
  return(
    <>
    <Homebase></Homebase>
    <Videolist></Videolist>
    </>
  )
}
function videoentrevista() {
>>>>>>> a9815c0b0eabf3a82846ff7121b76689876af36e
  return (
    <div>
    <Homebase></Homebase>
    {preguntasentrevista &
    // afterChange={onChange}
    <Carousel  >
    {preguntasentrevista.map((list,l)=>
    <div key={l}  id={list.id}>
      {/* <Entrevista/> */}
    </div>    
    )}
    </Carousel>
    }
    </div>
  );
}
function onChange(a, b, c,d,e) {
  console.log(a, b, c,d,e);
}

export default App;
