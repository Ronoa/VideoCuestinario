import React, { Component } from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css'
import './App.css';
// import HeaderVOD from './components/HeaderVOD'
// import VOD from './components/VOD'
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
    


    pregunta1: [],
    pregunta2: [],
    pregunta3: [],
    pregunta4: [],
  }

  componentDidMount() {      
  }

  render() {    
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/videoentrevista" component={videoentrevista}/>
        <Route exact path="/videos" component={videoList} />

      </Router>
    );
  }
}

function Home() {
  return(
    <>
    <Homebase></Homebase>
    <Contenido></Contenido>
    <Footer></Footer>
    </>
  )
}
function videoList() {
  return(
    <>
    <Homebase></Homebase>
    <Videolist></Videolist>
    </>
  )
}
function videoentrevista() {
  
  const preguntasentrevista=[
      {id:1,pregunta:'¿Consideras tener una amplia experiencia en el tema de diseño de productos digitales?',estado:false},
      {id:2,pregunta:'¿En donde te ves en 5 años?',estado:false},
      {id:3,pregunta:'¿Cuáles son tus metas?',estado:false},
      {id:4,pregunta:'¿Cuáles son las primeras diferencias que encuentras entre UX y UI? Has tenido experiencia',estado:false},
      {id:5,pregunta:'¿Cuáles son las primeras diferencias que encuentras entre UX y UI?',estado:false}
  ]

  let dispositivos111=localStorage.getItem('dispositivos')
  // console.log("dispositivos111>>",dispositivos111)

  
  return (
    <div>
    <Homebase></Homebase>
    
    {/* afterChange={onChange} */}
    <Carousel  >
    {preguntasentrevista.map((list,l)=>
    <div key={l}  id={list.id}>
      <Entrevista
        pregunta={list}
      />
    </div>    
    )}
    </Carousel>
    
    </div>
  );
}




function onChange(a, b, c,d,e) {
  console.log(a, b, c,d,e);
}

export default App;
