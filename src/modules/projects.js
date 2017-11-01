import * as types from './types';
import axios from 'axios';


export default (projectState = [], {type , project, projects}) => {
    switch (type) {
        case types.PROJECT_NEW: {
            return [...projectState, project];
        }
        case types.PROJECT_EDIT: {
            return projectState.map((p, i) =>  (p.id === project.id)? project : p );
        }
        case types.PROJECT_PROJECTS_LOADED: {
            return projects;
        }
        default: {
            return projectState;
        }
    }
};


export function onProjectCreated(project) {
    return {
        type: types.PROJECT_NEW,
        project
    }
}

export function onProjectEdited(project) {
    return {
        type: types.PROJECT_EDIT,
        project
    }
}

export function editProject(project) {
    return (dispatch) => {
        axios.put('http://localhost:3000/api/projects', project)
            .then((response) => {
                dispatch(onProjectEdited(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function newProject(project, tabPos) {
    return (dispatch) => {
        axios.post('http://localhost:3000/api/projects', project)
            .then((response) => {
                dispatch(onProjectCreated(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function projectsLoaded(projects) {
    return
}

export function listProjects() {
    return (dispatch) => {
        axios.get('http://localhost:3000/api/projects')
            .then((response) => {
                dispatch({ type: types.PROJECT_PROJECTS_LOADED, projects: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
