import * as React from 'react';
import Game from '../models/Game';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export interface GameCardProps {
    game: Game;
}

export const GameCard: React.SFC<GameCardProps> = (props: GameCardProps) => {

    return (
        <Card>
            <Image src={props.game.cover} alt={'Cover image'}/>
            <Card.Content>
                <Card.Header>
                    {props.game.title}
                </Card.Header>
            </Card.Content>
            <Card.Content extra={true}>
                <div className="ui two buttons">
                    <Button as={Link} to={`/game/${props.game._id}`}basic color="green">Edit</Button>
                    <Button basic color="red">Delete</Button>
                </div>
            </Card.Content>
        </Card>
    );
};