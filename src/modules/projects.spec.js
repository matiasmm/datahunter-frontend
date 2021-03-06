import reducer, { onProjectCreated, onProjectEdited, onProjectDeleted, projectsLoaded } from './projects';
import v1 from 'uuid';

describe('Project reducer', () => {
    describe('newProject()', () => {
        it('success', () => {
            let id = v1();
            expect(reducer(undefined, onProjectCreated({id, name: 'p', 'description': 'p', 'code': ''})))
                .toEqual([{id, name: 'p', 'description': 'p', 'code': ''}]);
        });
    });

    describe('onProjectEdited()', () => {
        it('success', () => {
            let id = v1();
            expect(reducer([{id, name: 'n1', 'description': 'd1', 'code': 'c1'}],
                onProjectEdited({id, name: 'n2', 'description': 'd2', 'code': 'c2'})))
                .toEqual([{id, name: 'n2', 'description': 'd2', 'code': 'c2'}]);
        });
    });

    describe('onProjectDeleted()', () => {
        it('success', () => {
            let id = v1();
            expect(reducer([{id: 1},{id, name: 'n1', 'description': 'd1', 'code': 'c1'}, {id: 2}], onProjectDeleted(id)))
                .toEqual([{id: 1}, {id: 2}]);
        });
    });
    describe('projectsLoaded()', () => {
        it('success', () => {
            let id = v1();
            expect(reducer(undefined, projectsLoaded([{id, name: 'n1', 'description': 'd1', 'code': 'c1'}])))
                .toEqual([{id, name: 'n1', 'description': 'd1', 'code': 'c1'}]);
        });
    });
});