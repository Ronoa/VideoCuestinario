import React, { Component } from 'react';
import { Row, Col } from 'antd';
import VideoPresentacion from './VideoPresentacion'
import '../css/mystyle.css'
import styled from 'styled-components'

const VideoHeader = styled(Col)`
  background-color: #002766;
  height: 188px;
  padding: 20px;
  color: white;
  font-size: 14px;
  font-weight: bold;
`
const VideoContainer = styled(Row)`
  background-color: #EAEAEA;
  height: 100vh;
`


class VOD extends Component {
  constructor(props){
    super(props);
  }


  render() {
    // console.log("aa",this.props.mediaRecorder)
    return (
      <div>
        <VideoContainer>
          <VideoHeader>Cuestionario para Diseñador UX / UI</VideoHeader>
          <VideoPresentacion 
            dispositivos={this.props.dispositivos}
            mediaRecorder={this.props.mediaRecorder}
          />
          
        </VideoContainer>
      </div>
    );
  }
}

export default VOD;