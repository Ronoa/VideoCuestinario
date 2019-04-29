import React, { Component } from 'react';
import { Row, Col } from 'antd';

// import styled from 'styled-components'

import {solicitaraccesodispositivos} from './baseconfig'

// const Videopresent = styled(Col)`    
//     height: 517px;    
//     //background-image: url("../css/icon/Group18Mask.png") no-repeat center top  
//     background-color: #fa8c16;
//     position:relative;
//     margin:0 auto;
//     border-radius: 5px;    
//     font-weight: bold;
// `

// const SiguientePregunta = styled(Col)`    
    
//     height: 160px;	
//     width: 240px; 
//     margin-top:-80px
//     border-radius: 8px;
//     color: #fa8c16;
//     font-size:30px;
//     margin-left:160px;
//     background-color: #FFFFFF;
    
// `

// const ContenidovideoPresentacion = styled(Col)`
//     height: 567px;	
//     width: 1090px;    
    
//     // opacity: 0.1;
//     margin: -124px 70px 0px;
//     // backgrounk-color: #f5222d;
// `

class VideoPresentacion extends Component{
    constructor(props){
        super(props);  
    }

//     componentDidMount(){
//         console.log("0")
//         this.funcionalgo();
//     }

    
//     async funcionalgo(){
//         // let video = document.querySelector('video');
//          let video2 = document.getElementById('vid3');
//         // console.log("video",video2)
//         console.log("1")
//          console.log("xxxxxxx",this.props.dispositivos);
//          if ("srcObject" in video2) {
//             video2.srcObject = this.props.dispositivos;
//           } else {
//             video2.src = window.URL.createObjectURL(this.props.dispositivos);
//           }
//     }


    render(){
        console.log("2")
        console.log('dispositivos props', this.props.dispositivos)
        return(
            // <Row >
            //     <ContenidovideoPresentacion span={10}>
            //        <Videopresent >
                    
            //         <video id="vid3" controls autoPlay></video>
            //         </Videopresent> 
                    
            //     </ContenidovideoPresentacion>
            //     <SiguientePregunta span={2}>ass</SiguientePregunta>
            // </Row>
            <div>

            </div>
        );
    }
}

export default VideoPresentacion;