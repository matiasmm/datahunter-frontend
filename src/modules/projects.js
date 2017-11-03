import * as types from './types';
import axios from 'axios';


export default (projectState = [], {type , project, projects, id}) => {
    switch (type) {
        case types.PROJECT_NEW: {
            return [...projectState, project];
        }
        case types.PROJECT_EDIT: {
            return projectState.map((p, i) =>  (p.id === project.id)? project : p );
        }
        case types.PROJECT_DELETE: {
            let projIndex = projectState.findIndex((p, i) =>  p.id === id );
            return [...projectState.slice(0, projIndex), ...projectState.slice(projIndex + 1)];
        }
        case types.PROJECT_PROJECTS_LOADED: {
            return projects;
        }
        default: {
            return projectState;
        }
    }
};


export function onProjectCreated(project, tabPos) {
    return {
        type: types.PROJECT_NEW,
        project,
        tabPos
    }
}

export function onProjectEdited(project) {
    return {
        type: types.PROJECT_EDIT,
        project
    }
}

export function onProjectDeleted(projectId) {
    return {
        type: types.PROJECT_DELETE,
        id: projectId
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
                dispatch(onProjectCreated(response.data, tabPos));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function deleteProject(projectId) {
    return (dispatch) => {
        axios.delete('http://localhost:3000/api/projects/' + projectId)
            .then((response) => {
                dispatch(onProjectDeleted(projectId));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}



export function projectsLoaded(projects) {
    return { type: types.PROJECT_PROJECTS_LOADED, projects };
}

export function listProjects() {
    return (dispatch) => {
        axios.get('http://localhost:3000/api/projects')
            .then((response) => {
                dispatch(projectsLoaded(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
