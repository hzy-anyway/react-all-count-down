import React, { Component } from 'react'

import AllCountDown from 'react-all-count-down'
import ValueRenderExample from './components/value-render-example/value-render-example.jsx'
import './example-4.css';

export default class Example4 extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false
        };
    }
    buttonOneOnClick=() => {
        this.setState({show:true});
    }
    buttonTwoOnClick=() => {
        this.setState({show:false});
    }
    
    render() {
        const {show}=this.state;
        return (
            <div className="example-4">
                <p>Example 4: the usage of prop 'valueRender'</p>
                {show?(
                    <div className="text-content">
                        <AllCountDown name="Example-4-No-1" part="day" valueRender={ValueRenderExample} />
                        :<AllCountDown name="Example-4-No-1" part="hour" valueRender={ValueRenderExample} />
                        :<AllCountDown name="Example-4-No-1" part="minute" minutes={1} valueRender={ValueRenderExample} />
                        :<AllCountDown name="Example-4-No-1" part="second" seconds={5} valueRender={ValueRenderExample} />
                    </div>
                ):null}
                <div className="button-sp-area">
                    <button disabled={show} onClick={this.buttonOneOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-one">start</button>
                    <button disabled={!show} onClick={this.buttonTwoOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-two">stop</button>
                </div>
            </div>
        )
    }
}
