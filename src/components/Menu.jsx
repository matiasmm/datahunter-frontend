import React, { Component } from 'react'
import {Menu as SemanticMenu, Button} from 'semantic-ui-react'
import ProjectList from './ProjectList';
import {connect} from 'react-redux';
import { listProjects } from '../actions/project';

export class Menu extends Component {

    componentDidMount() {
        this.props.onListProjects();
    }

    render() {
        return (
            <SemanticMenu pointing secondary vertical fixed="left">
                <div className="container">
                    <Button primary onClick={this.props.onCreateProject}>Create project</Button>
                </div>
                <ProjectList activeItem={this.props.activeItem}/>
            </SemanticMenu>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateProject: function () {
            dispatch({type: 'MENU.CREATE_PROJECT'});
        },
        onListProjects: function() {
            return dispatch(listProjects());
        }
    }
}

function mapStateToProps(state) {
    return {
        activeItem: state.activeItem
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);