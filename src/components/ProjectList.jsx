import React from 'react';
import propTypes from 'prop-types';
import { Menu as SemanticMenu } from 'semantic-ui-react'
import { connect } from 'react-redux';

export function ProjectList(props)  {
    const projects = props.projects.map((project, i) =>
        <SemanticMenu.Item  key={project.id} active={props.activeItem === project.id} onClick={(e) => props.handleClick(project.id)}>
            {project.name}
        </SemanticMenu.Item>);
    return (<div>{projects}</div>)
}

ProjectList.propTypes = {
    projects: propTypes.array.isRequired,
    activeItem: propTypes.string
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }};

const mapDispatchToProps = dispatch => {
    return {
        handleClick: (id) => {
            dispatch({type: 'MENU.SET_ACTIVE_ITEM', item: id});
            dispatch({type: 'MENU.OPEN_PROJECT', id});
        }
    }};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);


