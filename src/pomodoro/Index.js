import React from 'react'
import {App} from './App';
import "./Index.css"

function Index () {
  return (
    <App 
      defaultBreakLength='5' 
      defaultSessionLength='25'
    />
  )
}

export {Index as Pomodoro};