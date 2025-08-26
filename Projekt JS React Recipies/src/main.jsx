import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import reducer from './redux/reducer.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

const STORE = createStore(reducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  /*<React.StrictMode>*/
    <BrowserRouter>
      <Provider store={STORE}>
        <App />
      </Provider>
    </BrowserRouter>
  /*</React.StrictMode>*/,
)
