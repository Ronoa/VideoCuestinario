import {
  Component
  // PropTypes
} from 'react';

/* Templates */
import homeTemplate from './contenido.pug';

/* AntD components */
import { Layout} from 'antd';

/* Styles */
import './contenido.styl';

const { Header } = Layout;

class App extends Component {
  /* Constructor y render necesarios */
  constructor ( ...props ) {
    /* Super contructor de component */
    super ( ...props );

    /* variables de estado */
    this.state = {

    }
  }

  render () {

    const {
      courses,
    } = this.props;

    const propsAndComponents = {      
      Header,      
    }
    
    /* Return  template */
    return homeTemplate.call(this, propsAndComponents);
    
  }
}
/* Definimos los  tipos de propiedades */
// App.propTypes = {};

/* Definimos las propiedades por defecto */
// App.defaultProps = {};

/* Exportamos la clase App */
export default App;
