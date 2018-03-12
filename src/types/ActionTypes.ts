enum ActionTypes {
    DEFAULT = 'DEFAULT',
    SET_GAMES = 'SET_GAMES'
}

export default ActionTypes;

export interface ActionType {
    type: ActionTypes;
    [propName: string]: Object | Object[];
}