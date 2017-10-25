import React from 'react';
import ProjectForm from '../ProjectForm';
import { Tab, Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import v1 from 'uuid/v1';


function ProjectTab(props) {

    let menu = () => {
        return (<Menu icon>
            <Menu.Item name='write' onClick={() => {props.onEditProject()}}>
                <Icon name='write' />
            </Menu.Item>

            <Menu.Item name='play' onClick={() => {}}>
                <Icon name='play' />
            </Menu.Item>

            <Menu.Item name='video play' onClick={() => {}}>
                <Icon name='video play' />
            </Menu.Item>
        </Menu>)
    }

    let content;
    if (props.project.id && props.isEdit == false) {
        const {description} = props.project;
        content = (<div>
            <p>{description}</p>
            {menu()}
        </div>);
    } else {
        content = <ProjectForm project={props.project} onSubmit={props.onSubmit} />
    }
    return (
        <Tab.Pane>
            {content}
        </Tab.Pane>
    );
}

ProjectTab.propTypes =  {
    type: propTypes.string,
    menuDsc: propTypes.string,
    tabPos: propTypes.number.isRequired,
    project: propTypes.object
}


const mapStateToProps = (state, ownProps) => {
    const { tabPos, project={}, isEdit=false } =  ownProps;
    return {
        project,
        isEdit
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onEditProject: (isEdit) => {
        dispatch({
            type: 'TAB.SET_EDIT_MODE',
            isEdit: true,
            index: ownProps.tabPos

        });
    },
    onSubmit: (newProject) => {
        if (newProject.id) {
            dispatch({
                type: 'PROJECT.EDIT',
                project: newProject,
                tabPos: ownProps.tabPos
            });
        } else {
            newProject.id = v1();
            dispatch({
                type: 'PROJECT.NEW',
                project: newProject,
                tabPos: ownProps.tabPos
            });
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTab);