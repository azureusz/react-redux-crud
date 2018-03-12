import Game from '../models/Game';

export default interface StateType {
    readonly games: Game[];
}