
export default function reducer(state={projects:[], tabs: [], activeItem: 'dashboard'}, action) {
    switch (action.type) {
        case "MENU.CREATE_PROJECT":
            // tabs
            const opened = state.tabs.findIndex((e)=> e.type == 'project' && e.project == undefined);
            if (opened != -1) {
                return {...state, tabs: activateTab(state, opened)};
            } else {
                return {...state, tabs: [...state.tabs.map((t, i) => ({...t, active: false})),
                    {type: 'project', menuDsc: 'new project', active: true}]};
            }

            break;
        case "MENU.SET_ACTIVE_ITEM":
            // activeItem
            return setActiveItem(state, action);
        break;
        case "MENU.OPEN_PROJECT":
            // projects tabs
            return openProject(state, action);
        break;
        case "PROJECT.NEW":
            // projects tabs
            return addProject(state, action);
        break;
        case "PROJECT.EDIT":
            // project tabs
            return editProject(state, action);
        break;
        case "PROJECT.PROJECTS_LOADED":
            // project tabs
            return {...state, projects: action.projects};
            break;
        case "TAB.ACTIVATE":
            // tabs
            return {...state, tabs: state.tabs.map((t, i) => ({...t, active: i == action.index})) };
        break;
        case "TAB.SET_EDIT_MODE":
            // tabs
            return {...state, tabs: state.tabs.map((t, i) => { if (i == action.index) { t = {...t, isEdit: true} } return t; })};
        break;
        default:
           return state;
    } 
}

function activateTab(state, index){
    const newTabs = state.tabs.map((t, i) => {
        t.active = i == index;
        return {...t};
    });
    return newTabs;
}

function openProject(state, action) {
    const project = state.projects.find((p)=> p.id === action.id);
    if (project) {
        const opened = state.tabs.findIndex((e)=> e.project == project);
        if (opened != -1) {
            return {...state, tabs: activateTab(state, opened)};
        }
        return {...state, tabs: [...state.tabs, {project, type: 'project', menuDsc: project.name, active: true}]}
    }
    return state;
}

function setActiveItem(state, {item}) {
    return {...state, activeItem: item};
}

function validate(projects, newProject) {
    const found = projects.find((p)=> p.name === newProject.name);
    return found === undefined;
}

function addProject (state, action) {
    if (!validate(state.projects, action.project)) {
      alert("There is already a project called: " + action.project.name);
      return state;
    }

    return {...state, projects: [...state.projects, action.project], tabs: state.tabs.map( (t, i) => {
        if (action.tabPos == i) {
            t.menuDsc = action.project.name;
            t.project = action.project;
        }
        return {...t};
    })};
}

function editProject (state, action) {
    return {...state,
        projects: state.projects.map((p, i) => {
            if (p.id == action.project.id) {
                return action.project
            }
            return p;
        }),
        tabs: state.tabs.map( (t, i) => {
            if (action.tabPos == i) {
                t.menuDsc = action.project.name;
                t.project = action.project;
                t.isEdit = false;
            }
            return {...t};
    })};
}