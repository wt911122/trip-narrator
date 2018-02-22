import React, { Component } from 'react'

const Setting = ({onClick, title, datetime, content, active}) =>
  <section onClick={onClick} className={active? 'active': ''}>
      <h1>{title}</h1>
      <p>{datetime}</p>
      <p>{content}</p>
  </section>

export default Setting
