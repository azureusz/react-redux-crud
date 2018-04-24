enum ActionTypes {
    DEFAULT = 'DEFAULT',
    SET_GAMES = 'SET_GAMES',
    ADD_GAME = 'ADD_GAME',
    GAME_FETCHED = 'GAME_FETCHED'
}

export default ActionTypes;

export interface ActionType {
    type: ActionTypes;
    [propName: string]: any;
}