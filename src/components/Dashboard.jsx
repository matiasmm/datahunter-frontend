import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import ProjectTab from './Tabs/ProjectTab';


const classesMap = {
    'project': ProjectTab
}

function createTab(tab, i) {
    const {type, menuDsc} = tab;
    return { menuItem: { content: (<div>{menuDsc}</div>) }, render: () =>
        React.createElement(classesMap[type], {...tab, key: i, tabPos: i}) }
}

export function Dashboard({activeItem, tabs, onTabChange}) {
    const renderDashboard = () => {
        return (<div>Dashboard</div>)
    }

    const renderTabs = () => {
        return tabs.map((e, i) => createTab(e, i));
    }

    const activeIndex = tabs.findIndex((t) => t.active);

    return tabs.length ? <Tab onTabChange={onTabChange} panes={renderTabs()} activeIndex={activeIndex} /> : renderDashboard();
}

Dashboard.propTypes = {
    activeItem: propTypes.oneOfType([propTypes.string, propTypes.number]),
}

function mapStateToProps(state) {
    return {
        activeItem: state.activeItem,
        tabs: state.tabs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTabChange: (e, data) => {
            dispatch({ type: 'TAB.ACTIVATE', index: data.activeIndex} );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
