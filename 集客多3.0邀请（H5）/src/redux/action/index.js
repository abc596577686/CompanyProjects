/*
 * action 类型
 */

export const type = {
    SWITCH_MENU : 'SWITCH_MENU',
    BACKGROUND_COLOR : 'red',
};

export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}