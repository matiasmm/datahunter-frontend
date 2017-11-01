import React from 'react';
import propTypes from 'prop-types';
import { Menu as SemanticMenu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setActiveItem } from '../modules/menu';
import { openProject } from '../modules/tabs';

export function ProjectList(props) {
  const projects = props.projects.map(project =>
    (<SemanticMenu.Item key={project.id} active={props.activeItem === project.id} onClick={e => props.handleClick(project.id)}>
      {project.name}
    </SemanticMenu.Item>));
  return (<div>{projects}</div>);
}

ProjectList.propTypes = {
  projects: propTypes.array.isRequired,
  activeItem: propTypes.oneOfType([propTypes.string, propTypes.number])
};

const mapStateToProps = ({ projects }) => ({
  projects
});

const mapDispatchToProps = dispatch => ({
  handleClick: (id) => {
    dispatch(setActiveItem(id));
    dispatch(openProject(id));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);