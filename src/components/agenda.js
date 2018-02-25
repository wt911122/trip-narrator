import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueId } from 'lodash'
import Setting from './setting'
import { moveOnTogo } from '../actions/index'
const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const getTag = (date) => (`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${days[date.getUTCDay()]}`)

const Agenda = ({agendaplan, onTogoClick, center}) =>
  <div className="agenda">
    {agendaplan.map((plan, index) => {
        const date = new Date(plan.datetime)
        let result = [];
        let foo = index === 0;
        if(index > 0) {
          const lastDate = new Date(agendaplan[index-1].datetime)
          foo = (lastDate.getDate() !== date.getDate())
        }
        if(foo)
          result = result.concat([<div className="datetime" key={uniqueId('agenda_date_')}>{getTag(date)}</div>])
        return result.concat([
          <Setting key={uniqueId('agenda_')} {...plan} active={plan.coordinate === center} onClick={() => onTogoClick(plan, index)}/>,
          ])
      })}
    }
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
