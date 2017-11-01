import * as types from './types';


export default (menuState = {}, action) => {
    switch (action.type) {
        case types.MENU_SET_ACTIVE_ITEM: {
            return {...menuState, activeItem: action.item};
        }
        default: {
            return menuState;
        }
    }
};


export function setActiveItem(item) {
    return {
        type: types.MENU_SET_ACTIVE_ITEM,
        item
    };
}