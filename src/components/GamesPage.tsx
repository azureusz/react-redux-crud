import * as React from 'react';
import { connect } from 'react-redux';
import StateType from '../types/StateType';
import { GamesList } from './GamesList';
import Game from '../models/Game';
import { getGames } from '../actions';

export interface GamesPageProps {
    games: Game[];
    getGames: Function;
}

export interface GamesPageDispatch {
    getGames: () => (dispatch: Function) => void;
}

export class GamesPage extends React.Component<GamesPageProps & GamesPageDispatch, StateType> {
    componentDidMount() {
        this.props.getGames();
    }
    render() {
        return(
            <div>
                <h1>Games List</h1>

                <GamesList games={this.props.games}/>
            </div>
        );
    }
}

function mapStateToProps(state: StateType) {
    return {
        games: state.games
    };
}

export default connect(mapStateToProps, { getGames })(GamesPage);