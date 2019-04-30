import coursesListTemplate from './lists-video.pug';
import './lists-video.styl'

import { Card } from 'antd';
const components = {
  Card
};
/* no se usa Class por ser un componente sin estado */
const CoursesList = ( props ) => {

  return coursesListTemplate.call(this, components )

}

export default CoursesList;
