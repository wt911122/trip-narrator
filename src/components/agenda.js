import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueId } from 'lodash'
import Setting from './setting'
import { moveOnTogo } from '../actions/index'



const Agenda = ({agendaplan, onTogoClick, center}) =>
  <div className="agenda">
    {agendaplan.map((plan) =>
      <Setting key={uniqueId('agenda_')} {...plan} active={plan.coordinate === center} onClick={() => onTogoClick(plan)}/>)}
  </div>

const mapStateToProps = (state) =>  ({center: state.coordinate})

const mapDispatchToProps = dispatch => {
  return {
    onTogoClick: togo => {
      dispatch(moveOnTogo(togo))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Agenda);
