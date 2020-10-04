import React, { Component } from 'react';
import TripMapComponent from './components/map';
import Agenda from './components/agenda';
import './App.css';
import plan from './configs/agenda.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="aside">
          <Agenda agendaplan={plan}/>
        </div>
        <div className="main">
          <TripMapComponent agendaplan={plan}/>
        </div>
      </div>
    );
  }
}

export default App;
