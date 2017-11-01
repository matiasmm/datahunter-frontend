import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import ProjectTab from './Tabs/ProjectTab';
import { activateTab } from '../modules/tabs';
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

function createTab(tab, i) {
  const { type } = tab;
  return {
    menuItem: { content: (<div>{classesMap[type].getTitle(tab)}</div>) },
    render: () =>
      React.createElement(classesMap[type]['contentClass'], { ...tab, key: i, tabPos: i })
  };
}

export function Dashboard({ tabs, onTabChange }) {
  const renderDashboard = () => (<div>Dashboard</div>),
        renderTabs = () => tabs.tabList.map((e, i) => createTab(e, i));
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
