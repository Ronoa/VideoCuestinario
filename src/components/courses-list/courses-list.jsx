import coursesListTemplate from './courses-list.pug';
import './courses-list.styl'

const components = {

};
/* no se usa Class por ser un componente sin estado */
const CoursesList = ( props ) => {

  return coursesListTemplate.call(this, components )

}

export default CoursesList;
