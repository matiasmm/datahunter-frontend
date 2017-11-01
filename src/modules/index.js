import { combineReducers } from 'redux';
import tabs from './tabs';
import menu from './menu';
import projects from './projects';

export default combineReducers({
  tabs,
  menu,
  projects,
});
