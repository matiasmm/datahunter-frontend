import * as types from './types';

function tabSetIsEdit(tabList, index, isEdit) {
    return tabList.map((t, i) => ((i === index) ? {...t, isEdit} : t));
}

function createTab(tabList, type, menuDsc, extraArgs={}) {
    return [...tabList.map(t => ({...t})), {
        type, menuDsc,
        ...extraArgs
    }];
}

function findByProjectId(tabList, id) {
    return tabList.findIndex((e) => e.type === 'project' && e.projectId === id);
}

export default (tabsState = {'tabList': [], 'activeTab': undefined}, action) => {
    switch (action.type) {
        case types.TABS_OPEN_CREATE_PROJECT: {
            let {tabList} = tabsState, opened = findByProjectId(tabList, undefined);
            if (opened === -1) {
                tabsState = {...tabsState, tabList: createTab(tabList, 'project', 'New project')};
                return {...tabsState, activeTab: tabsState.tabList.length - 1};
            }
            return {...tabsState, activeTab: opened};
        }
        case types.TABS_OPEN_PROJECT: {
            let opened = findByProjectId(tabsState.tabList, action.id);
            if (opened === -1) {
                let newTabList = createTab(tabsState.tabList, 'project', 'project-' + action.id, {projectId: action.id});
                return {...tabsState, tabList: newTabList, activeTab: newTabList.length - 1};
            }
            return {...tabsState, activeTab: opened};

        }
        case types.TABS_CLOSE: {
            return {...tabsState, tabList: [...tabsState.tabList.slice(0, action.tabPos),
                ...tabsState.tabList.slice(action.tabPos+1, tabsState.tabList.length)], activeTab: 0};
        }

        case types.PROJECT_DELETE: {
            let tabPos = tabsState.tabList.findIndex((t) => action.id == t.projectId);
            return (tabPos !== -1)? {...tabsState, tabList: [...tabsState.tabList.slice(0, tabPos),
                  ...tabsState.tabList.slice(tabPos+1, tabsState.tabList.length)], activeTab: 0}
                : tabsState;
        }
        case types.TABS_ACTIVATE: {
            let activeTab = (action.index < tabsState.tabList.length)? action.index : 0;
            return {...tabsState, activeTab };
        }
        case types.PROJECT_NEW:
        case types.PROJECT_EDIT:{
            let tabList = tabsState.tabList.map((t, i) => {
                if (action.tabPos === i || (t.projectId !== undefined && t.projectId === action.project.id)) {
                    t.projectId = action.project.id;
                    t.isEdit = false;
                }
                return {...t};
            });
            return {...tabsState, tabList};
        }
        case types.TABS_SET_EDIT_MODE: {
            return {...tabsState, tabList: tabSetIsEdit(tabsState.tabList, action.index, action.isEdit)};
        }
        default: {
            return tabsState;
        }
    }
};

export function openCreateProject() {
    return {
        type: types.TABS_OPEN_CREATE_PROJECT,
    };
}

export function openProject(projectId) {
    return {
        type: types.TABS_OPEN_PROJECT,
        id: projectId
    };
}

export function activateTab(index) {
    return {
        type: types.TABS_ACTIVATE,
        index
    };
}

export function setTabIsEdit(index, isEdit) {
    return {
        type: types.TABS_SET_EDIT_MODE,
        index,
        isEdit
    };
}

export function closeTab(tabPos) {
    return {
        type: types.TABS_CLOSE,
        tabPos
    };
}

