import React, { Component } from 'react'

const Setting = ({
  onClick,
  title,
  datetime,
  content,
  active,
  price,
  url
}) =>
  <section onClick={onClick} className={active? 'active': ''}>
      <h1>{title}{price && (<span>{price}</span>)}{url && (<a href="url">link</a>)}</h1>
      <p>{datetime}</p>
      <p>{content}</p>
  </section>

export default Setting
