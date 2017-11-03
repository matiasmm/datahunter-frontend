import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Menu, Icon } from 'semantic-ui-react';
import ProjectTab from './Tabs/ProjectTab';
import { activateTab, closeTab } from '../modules/tabs';
import { getDashboard } from '../modules/selectors';

const classesMap = {
  project: {
    'contentClass': ProjectTab,
    'getTitle': ({projectId, project, menuDsc}) => {
      if (projectId) {
        return project.name
      }
      return menuDsc;
    }
  }
};

function createTab(tab, i, onTabClose) {
  const { type } = tab;
  return {
    menuItem: <Menu.Item key={i}>{classesMap[type].getTitle(tab)}<Icon name="close" onClick={(e)=> onTabClose(e, i)}/></Menu.Item>,
    render: () =>
      React.createElement(classesMap[type]['contentClass'], { ...tab, tabPos: i })
  };
}

export function Dashboard({ tabs, onTabChange, onTabClose }) {
  const renderDashboard = () => (<div>Dashboard</div>),
        renderTabs = () => tabs.tabList.map((e, i) => createTab(e, i, onTabClose));
  return tabs.tabList.length ? <Tab onTabChange={onTabChange} panes={renderTabs()} activeIndex={tabs.activeTab} /> : renderDashboard();
}

Dashboard.propTypes = {
  activeItem: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

function mapStateToProps(state, ownProps) {
  return getDashboard(state, ownProps);
}

function mapDispatchToProps(dispatch) {
  return {
    onTabChange: (e, data) => {
      dispatch(activateTab(data.activeIndex));
    },
    onTabClose: (e, tabPos) => {
      dispatch(closeTab(tabPos));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
