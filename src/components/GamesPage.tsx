import * as React from 'react';
import { connect } from 'react-redux';
import StateType from '../types/StateType';
import { GamesList } from './GamesList';
import Game from '../models/Game';

export interface GamesPageProps {
    games: Game[];
}

export class GamesPage extends React.Component<GamesPageProps, StateType> {
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

export default connect<GamesPageProps>(mapStateToProps)(GamesPage);