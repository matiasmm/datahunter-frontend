import axios from 'axios';

export function listProjects() {
    return (dispatch) => {
        axios.get('http://localhost:3000/api/projects')
            .then(function (response) {
                dispatch({type: 'PROJECT.PROJECTS_LOADED', projects: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export function createProject(project, tabPos) {
    return (dispatch) => {
        axios.post('http://localhost:3000/api/projects', project)
            .then(function (response) {
                dispatch({
                    type: 'PROJECT.NEW',
                    project: response.data,
                    tabPos: tabPos
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export function editProject(project, tabPos) {
    return (dispatch) => {
        axios.put('http://localhost:3000/api/projects', project)
            .then(function (response) {
                dispatch({
                    type: 'PROJECT.EDIT',
                    project: response.data,
                    tabPos: tabPos
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}