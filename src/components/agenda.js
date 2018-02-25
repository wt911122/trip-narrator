import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueId } from 'lodash'
import Setting from './setting'
import { moveOnTogo } from '../actions/index'



const Agenda = ({agendaplan, onTogoClick, center}) =>
  <div className="agenda">
    {agendaplan.map((plan, index) =>
      <Setting key={uniqueId('agenda_')} {...plan} active={plan.coordinate === center} onClick={() => onTogoClick(plan, index)}/>)}
  </div>

const mapStateToProps = (state) =>  ({center: state.coordinate})

const mapDispatchToProps = dispatch => {
  return {
    onTogoClick: (togo, index) => {
      dispatch(moveOnTogo(togo, index))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Agenda);
