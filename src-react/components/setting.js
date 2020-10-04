import React, { Component } from 'react'

const Setting = ({
  onClick,
  title,
  datetime,
  content,
  active,
  price,
  tip,
  url
}) =>
  <section onClick={onClick} className={active? 'active': ''}>
      <h1>{title}{price && (<span>{price}</span>)}{url && (<a href={url}>link</a>)}</h1>
      <p>{datetime}</p>
      <p>{content}{tip && (<strong>{tip}</strong>)}</p>
  </section>

export default Setting
