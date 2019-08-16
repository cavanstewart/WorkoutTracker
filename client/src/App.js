import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ExerciseList from './components/ExerciseList';
import ItemModal from './components/ItemModal'
import Home from './components/Home';
import WorkoutCalender from './components/Calender';

import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

class Workouts extends Component {
  render() {
    return (
      <Container>
        <ItemModal />
        <ExerciseList />
      </Container>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="Nav">
          <AppNavbar />
          
          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/workouts" component={Workouts} />
            <Route path="/calender" component={WorkoutCalender} />
            <Redirect to="/" />
         </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
