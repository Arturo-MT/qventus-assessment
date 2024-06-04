/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const render = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

render()

if (module.hot) {
  module.hot.accept('./app', () => {
    render()
  })
}
