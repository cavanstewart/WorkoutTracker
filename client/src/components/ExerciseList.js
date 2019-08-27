import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, getItemsDay } from '../actions/itemActions';
import PropTypes from 'prop-types';


class ExerciseList extends Component {

    componentDidMount() {
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();
        this.props.getItemsDay(d, m, y);
    }

    static propTypes = {
        getItemsDay: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };
    

    render() {
        const { items } = this.props.item;
    
        return(
            <Container>
                <span className="left">Exercise:</span>
                <span className="right">Reps:</span>
                
                <ListGroup>
                
                    <TransitionGroup className="exercise-list">
                        {items.map(({ _id, exercise, reps}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <span className="left">
                                    <Button 
                                     className="remove-btn"
                                     color="danger"
                                     size="sm"
                                     onClick={this.onDeleteClick.bind(this, _id)}
                                     >
                                        &times;
                                    </Button>
                                    {exercise}</span>
                                    <span className="right">{reps}</span>
                                    
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                
            </Container>
        );
    }
}



const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, getItemsDay })(ExerciseList);