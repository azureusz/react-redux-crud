import * as React from 'react';
import { connect } from 'react-redux';
import { fetchGame, saveGame } from '../actions';
import Game from '../models/Game';
import { Redirect } from 'react-router';
import { Form, Image, Button, Message } from 'semantic-ui-react';
import StateType from '../types/StateType';

export interface GameFormProps {
    match: any;
}

export interface GameFormDispatch {
    saveGame: (game: Game) => (dispatch: Function) => Promise<any>;
    fetchGame: (_id: string) => (dispatch: Function) => Promise<any>;
}

const initialState = {
    _id: null,
    title: '',
    cover: '',
    errors: {
        global: '',
        title: '',
        cover: ''
    },
    loading: false,
    done: false
};

export type GameFormState = typeof initialState;

class GameForm extends React.Component<GameFormProps & any, GameFormState> {

    state = {
        ...initialState,
        title: this.props.game ? this.props.game.title : '',
        cover: this.props.game ? this.props.game.cover : '',
        _id: this.props.game ? this.props.game._id : null
    };

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            _id: nextProps.game._id,
            title: nextProps.game.title,
            cover: nextProps.game.cover
        });
    }

    componentDidMount() {
        if (this.props.match.params._id) {
            this.props.fetchGame(this.props.match.params._id);
        }
    }

    handleChange = (e) => {
        let errors = Object.assign({}, this.state.errors);
        errors.global = '';
        if (!!this.state.errors[e.target.name]) {
            errors[e.target.name] = '';
        }

        this.setState({
            [e.target.name]: e.target.value,
            errors
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validation

        let error = {title: '', cover: '', global: ''};

        if (this.state.title === '') {
            error.title = 'Can\'t be empty!';
        }
        if (this.state.cover === '') {
            error.cover = 'Can\'t be empty!';
        }
        this.setState({errors: error});

        const isValid = Object.keys(error).every((x) => error[x] === '');

        if (isValid) {
            const {title, cover} = this.state;
            this.setState({loading: true});
            this.props.saveGame(new Game(title, cover)).then(
                () => { this.setState({ done: true });
                },
                (err) => err.response.json().then(({errors}) => {

                    this.setState({
                        errors: { title: errors.title || '' , cover: errors.cover || '', global: errors.global || '' },
                        loading: false
                    });
                })
            );

        }
    }

    render() {

        const form = (
            <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                <h1>Create new game</h1>
                {this.state.errors.global !== '' &&
                    <Message color={'red'} negative={true} content={this.state.errors.global}
                             display={'block !important'}/>}
                <Form.Input name={'title'} label="Title" placeholder="Title" value={this.state.title}
                            onChange={this.handleChange} error={this.state.errors.title !== ''}/>
                {this.state.errors.title !== '' && <label>{this.state.errors.title}</label>}
                <Form.Input name={'cover'} label="Cover" placeholder="Cover" value={this.state.cover}
                            onChange={this.handleChange} error={this.state.errors.cover !== ''}/>
                {this.state.errors.cover !== '' && <label>{this.state.errors.cover}</label>}
                <Form.Field>
                    {this.state.cover !== '' &&
                        <Image size={'small'} bordered={true} alt={'cover'} src={this.state.cover}/>}
                </Form.Field>
                <Button primary={true}>Save</Button>
            </Form>
        );

        return (
            <div>
                { this.state.done ? <Redirect to="/games" /> : form }
            </div>
        );
    }
}

function mapStateToProps(state: StateType, props: GameFormProps) {
    if (props.match.params._id) {
        return {
            game: state.games.find(item => item._id === props.match.params._id)
        };
    }
    return { game: null };
}
export default connect(mapStateToProps, {saveGame, fetchGame})(GameForm);