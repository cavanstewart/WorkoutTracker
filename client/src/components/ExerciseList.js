import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { deleteItem, getItemsDay } from '../actions/itemActions';
import PropTypes from 'prop-types';


class ExerciseList extends Component {


    static propTypes = {
        getItemsDay: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user && this.props.user !== undefined && this.props.user !== null) {


            const user_id = this.props.user._id
            const date = new Date();
            const y = date.getFullYear();
            const m = date.getMonth();
            const d = date.getDate();
            //const user = 5
            this.props.getItemsDay(d, m, y, user_id);
            
        }
        //console.log(user)
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };
    

    render() {
        const { items } = this.props.item;
        const { isAuthenticated } = this.props.auth
    
        return(
            <div>
            { isAuthenticated && 
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
        }
        
        
        </div>
        );
    }
}



const mapStateToProps = state => ({
    item: state.item,
    auth: state.auth,
    user: state.auth.user
});

export default connect(mapStateToProps, { deleteItem, getItemsDay })(ExerciseList);