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

    }
  }

  render () {
    // console.log("2")
    // console.log('dispositivos props', this.props.pregunta)
    const propsAndComponents = {
      Header,
      Row,
      Col
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
