import React from 'react';
import {Tab, Menu, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import ProjectForm from '../ProjectForm';
import {newProject, editProject, deleteProject} from '../../modules/projects';
import {setTabIsEdit} from '../../modules/tabs';


function ProjectTab(props) {
    const menu = () => (<Menu icon>
        <Menu.Item name="write" onClick={() => {
            props.onClickEdit();
        }}>
            <Icon name="write"/>
        </Menu.Item>

        <Menu.Item name="trash" onClick={() => {
            props.onClickDelete();
        }}>
            <Icon name="trash"/>
        </Menu.Item>

        <Menu.Item name="play" onClick={() => {
        }}>
            <Icon name="play"/>
        </Menu.Item>

    </Menu>);

    let content;
    if (props.project.id && props.isEdit === false) {
        const {description} = props.project;
        content = (<div>
            <p>{description}</p>
            {menu()}
        </div>);
    } else {
        content = <ProjectForm project={props.project} onSubmit={props.onSubmit}/>;
    }
    return (
        <Tab.Pane>
            {content}
        </Tab.Pane>
    );
}

ProjectTab.propTypes = {
    type: propTypes.string,
    menuDsc: propTypes.string,
    tabPos: propTypes.number.isRequired,
    project: propTypes.object,
};


const mapStateToProps = (state, ownProps) => {
    const {project = {}, isEdit = false, tabPos} = ownProps;
    return {project, isEdit, projects: state.projects, tabPos};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatch,
    onClickEdit: () => {
        dispatch(setTabIsEdit(ownProps.tabPos, true));
    },
    onClickDelete: () => {
        if (window.confirm('Are you sure you want to delete this project')) {
            dispatch(deleteProject(ownProps.project.id));
        }
    }
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps, ...dispatchProps,
    onSubmit: (project) => {
        const found = stateProps.projects.find((p) => p.name === project.name && project.id !== p.id);
        if (found) {
            alert(`There is already a project called: ${project.name}`);
            return ;
        }

        if (project.id) {
            dispatchProps.dispatch(editProject(project));
        } else {
            delete project.id;
            dispatchProps.dispatch(newProject(project, stateProps.tabPos));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProjectTab);
