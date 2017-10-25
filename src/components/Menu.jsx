import React from 'react'
import {Menu as SemanticMenu, Button} from 'semantic-ui-react'
import ProjectList from './ProjectList';
import {connect} from 'react-redux';

export function Menu(props) {
    return (
        <SemanticMenu pointing secondary vertical fixed="left">
            <div className="container">
                <Button primary onClick={props.onCreateProject}>Create project</Button>
            </div>
            <ProjectList activeItem={props.activeItem}/>
        </SemanticMenu>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateProject: function () {
            dispatch({type: 'MENU.CREATE_PROJECT'});
        }
    }
}

function mapStateToProps(state) {
    return {
        activeItem: state.activeItem
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);