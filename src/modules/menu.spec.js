import reducer, { setActiveItem } from './menu';

describe('Menu reducer', () => {
    describe('setActiveItem()', () => {
        it('activate menu item success', () => {
            expect(reducer(undefined, setActiveItem(0)))
                .toEqual({activeItem: 0});
        });
    });
});