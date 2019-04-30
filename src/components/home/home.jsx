import {
  Component
  // PropTypes
} from 'react';

import CoursesList  from '../courses-list/courses-list';

/* Templates */
import homeTemplate from './home.pug';

/* AntD components */
import { Layout, Row, Col} from 'antd';

/* Styles */
import './home.styl';

const { Header } = Layout;

class App extends Component {
  /* Constructor y render necesarios */
  constructor ( ...props ) {
    /* Super contructor de component */
    super ( ...props );

    /* variables de estado */
    this.state = {
      courses : [
        {
          id : 1,
          name : 'react desde cero'
        },
        {
          id : 2,
          name : 'nodejs desde cero'
        }
      ]
    }
  }

  render () {

    const {
      courses,
    } = this.props;

    const propsAndComponents = {
      courses,
      Header,
      CoursesList,
      Row,
      Col
    }

    /* Return  template */
    return homeTemplate.call(this, propsAndComponents );
  }
}
/* Definimos los  tipos de propiedades */
// App.propTypes = {};

/* Definimos las propiedades por defecto */
// App.defaultProps = {};

/* Exportamos la clase App */
export default App;
