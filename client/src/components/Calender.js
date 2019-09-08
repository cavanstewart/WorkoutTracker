import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItemsDay } from '../actions/itemActions';
import PropTypes from 'prop-types';

import Calender from 'react-calendar'
import { changeDate } from '../actions/dateActions';

class WorkoutCalender extends Component {
    state = {
        date: new Date(),
    }

    /*componentDidMount() {
        var day = this.state.date.getDate();
        var month = this.state.date.getMonth();
        var year = this.state.date.getFullYear();
        this.props.getItemsDay(day, month, year);
    }*/

    componentDidUpdate(prevProps) {
        //console.log(prevProps.user)
        //console.log(this.props.user)
        if (prevProps.user !== this.props.user && this.props.user !== undefined && this.props.user !== null) {


            const { _id } = this.props.user
            const y = this.state.date.getFullYear();
            const m = this.state.date.getMonth();
            const d = this.state.date.getDate();
            console.log(this.state.date)
            this.props.changeDate(this.state.date)
            this.props.getItemsDay(d, m, y, _id);
            
        }
        //console.log(user)
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };

    onChange = date => {
        if(this.props.user) {
        this.setState({ date });
        console.log(date);
        
        const { _id } = this.props.user;
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        
        
        this.props.getItemsDay(d, m, y, _id);
        this.props.changeDate(date);

}
    }

    render() {
        const { items, loading } = this.props.item;
        //console.log(items.length === 0)
        return (
            <Container>
                <Calender className = "calender-position"
                    onChange={this.onChange}
                    value={this.state.date}
                />
            
            { loading ?
            <ListGroup className="mt-5 mb-5">
                <ListGroupItem>
                    <span className="welcome-name">Loading...</span>
                </ListGroupItem>
            </ListGroup>
            :
            <ListGroup className="mt-5 mb-5">
                { (items.length !== 0) ?
                <Fragment>
                <ListGroupItem>
                    <span className="left">Exercise:</span>
                    <span className="right">Reps:</span>
                </ListGroupItem>
                <TransitionGroup className="date-list">
                {items.map(({ _id, exercise, reps}) => (
                    <CSSTransition key={_id} timeout={500} className="appear">
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
                </Fragment>
                :
                <ListGroupItem>
                    <span className="welcome-name">No Workouts</span>
                </ListGroupItem>
                }
                    
                </ListGroup>
            }
            </Container>
        );
    }
}


WorkoutCalender.propTypes = {
    getItemsDay: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    item: state.item,
    user: state.auth.user
});

export default connect(mapStateToProps, {getItemsDay, changeDate})(WorkoutCalender)