import React, { Component } from 'react'
import {NavLink,Redirect,Route,Switch} from 'react-router-dom'

import Example1 from './example-1'
import Example2 from './example-2'
import Example3 from './example-3'
import Example4 from './example-4'
import Example5 from './example-5'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">react-all-count-down</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Example1" activeClassName="active">Example-1</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Example2" activeClassName="active">Example-2</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Example3" activeClassName="active">Example-3</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Example4" activeClassName="active">Example-4</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Example5" activeClassName="active">Example-5</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div>
            <Switch>
                <Route path="/Example1" component={Example1}></Route>
                <Route path="/Example2" component={Example2}></Route>
                <Route path="/Example3" component={Example3}></Route>
                <Route path="/Example4" component={Example4}></Route>
                <Route path="/Example5" component={Example5}></Route>
                <Redirect to="/Example1"></Redirect>
            </Switch>
        </div>
      </div>
    )
  }
}
