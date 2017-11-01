import { createSelector } from 'reselect';

function getTabsWithProjects(tabList, projects) {
    return tabList.map((t) => {
        if (t.type === 'project' && t.projectId) {
            return {...t, project: projects.find((p) => t.projectId === p.id) };
        }
        return t;
    });
}

export const getDashboard = createSelector([
    (state) => state.tabs,
    (state) => state.tabs.tabList,
    (state) => state.activeItem,
    (state) => state.projects
], (tabsState, tabList, activeItem, projects) => {
    const tabs = {...tabsState, tabList: getTabsWithProjects(tabList, projects)};
    return { activeItem, tabs }
});