// import coursesListTemplate from './lists-video.pug';
// import './lists-video.styl'
//
// const components = {
//   Card,
// };
// /* no se usa Class por ser un componente sin estado */
// const CoursesList = ( props ) => {
//   return coursesListTemplate.call(this, components )
//
// }
//
// export default CoursesList;
//

import {
  Component
  //React
  // PropTypes
} from 'react';
// import React from 'react';

import videoListTemplate from './lists-video.pug';
import './lists-video.styl'
/* Templates */
import { Card } from 'antd';
/* AntD components */
// import Entrevista from './entrevista';


class App extends Component {
// export default class entrevista extends React.PureComponent {
  /* Constructor y render necesarios */
  constructor ( ...props ) {
    /* Super contructor de component */
    super ( ...props );

    /* variables de estado */
    this.state = {

    }
  }



  render () {
    let pregunta=this.props.pregunta
    const propsAndComponents = {
      Card,
      pregunta,
    }

    /* Return  template */
    return videoListTemplate.call(this, propsAndComponents);
  }
}
/* Definimos los  tipos de propiedades */
// App.propTypes = {};

/* Definimos las propiedades por defecto */
// App.defaultProps = {};

/* Exportamos la clase App */
export default App;
