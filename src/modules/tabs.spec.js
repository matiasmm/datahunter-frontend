import reducer, {openCreateProject, openProject, activateTab, setTabIsEdit, closeTab } from './tabs';


describe('Tabs reducer', () => {
    describe('openCreateProject()', () => {
        it('open create project tab success', () => {
            expect(reducer(undefined, openCreateProject()))
                .toEqual({activeTab: 0, tabList:[{type: 'project', menuDsc: 'New project'}]});
        });

        it('open create activates success', () => {
            expect(reducer({activeTab: 10, tabList:[{type: 'project', menuDsc: 'New project'}]}, openCreateProject()))
                .toEqual({activeTab: 0, tabList:[{type: 'project', menuDsc: 'New project'}]});
        });
    });

    describe('openProject()', () => {
        it('open project tab success', () => {
            expect(reducer(undefined, openProject(1)))
                .toEqual({activeTab: 0, tabList:[{type: 'project', menuDsc: 'project-1', projectId: 1}]});
        });
        it('open project activates tab success', () => {
            expect(reducer({activeTab: undefined, tabList:[{type: 'project', menuDsc: 'project', projectId: 1}]},
                openProject(1)))
                .toEqual({activeTab: 0, tabList:[{type: 'project', menuDsc: 'project', projectId: 1}]});
        });
    });

    describe('activateTab()', () => {
        it('activate existing index', () => {
            expect(reducer({activeTab: undefined, tabList: [{type: 'project', menuDsc: 'tab1'}]}, activateTab(0)))
                .toEqual({activeTab: 0, tabList: [{type: 'project', menuDsc: 'tab1'}]});
        });
        it('activate exceeded index should return 0', () => {
            expect(reducer({activeTab: undefined, tabList: [{type: 'project', menuDsc: 'tab1'}]}, activateTab(1)))
                .toEqual({activeTab: 0, tabList: [{type: 'project', menuDsc: 'tab1'}]});
        });
    });

    describe('setTabIsEdit()', () => {
        it('set tab 0 isEdit=true', () => {
            expect(reducer({activeTab: undefined, tabList: [{type: 'project', menuDsc: 'tab1'}]}, setTabIsEdit(0, true)))
                .toEqual({activeTab: undefined, tabList: [{type: 'project', menuDsc: 'tab1', isEdit: true}]});
        });
        it('set tab 0 isEdit=false', () => {
            expect(reducer({activeTab: undefined, tabList: [{type: 'project', menuDsc: 'tab1'}]}, setTabIsEdit(0, false)))
                .toEqual({activeTab: undefined, tabList: [{type: 'project', menuDsc: 'tab1', isEdit: false}]});
        });
    });

    describe('closeTab()', () => {
        it('success', () => {
            expect(reducer({activeTab: undefined, tabList: [{type: 'project', menuDsc: 'tab1'}]}, closeTab(0)))
                .toEqual({activeTab: 0, tabList: []});
        });
    });
});
