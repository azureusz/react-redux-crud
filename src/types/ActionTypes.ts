enum ActionTypes {
    DEFAULT = 'DEFAULT'
}

export default ActionTypes;

export interface ActionType {
    type: ActionTypes;
}