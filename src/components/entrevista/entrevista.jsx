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
  constructor ( ...props ) {
    /* Super contructor de component */
    super ( ...props );

    /* variables de estado */
    this.state = {
      recording: false,
      dispositivos: {},
      mediaRecorder: {},
      chunks: [],
      datamedia: [],
      isrender: true,
      ismedia: false,
    }
  }
  componentDidMount() {
    this.parametrosvideo();  
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
        // devices.forEach(device => {
        //   console.log(device.kind.toUpperCase(), device.label);
        // })
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
    console.log("dispositivos",this.state.dispositivos.id)
    localStorage.setItem('dispositivos', [this.state.dispositivos.id])
    
    if(video==undefined) return
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

  render () {
    //  console.log("2")
    //  console.log('dispositivos props', this.props.pregunta)
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
