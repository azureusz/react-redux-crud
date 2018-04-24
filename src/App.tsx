import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import GamesPage from './components/GamesPage';
import GameForm from './components/GameForm';
import { Container, Menu } from 'semantic-ui-react';

const Nav = props => (
    <NavLink
        exact
        {...props}
        activeClassName="active"
    />
);

class App extends React.Component {
    render() {
        return (
            <Container>
                <Menu>
                    <Menu.Item
                        name="Home"
                        as={Nav}
                        to="/"
                    />
                    <Menu.Item
                        name="Games"
                        as={Nav}
                        to="/games"
                    />
                    <Menu.Item
                        name="Add game"
                        as={Nav}
                        to="/games/new"
                    />

                </Menu>
                <Route exact={true} path={'/games'} component={GamesPage}/>
                <Route path={'/games/new'} component={GameForm}/>
                <Route path={'/game/:_id'} component={GameForm}/>
            </Container>
        );
    }
}

export default App;
