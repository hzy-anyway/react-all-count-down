import React, { Component } from 'react'
import { Modal,Button } from "react-bootstrap";

import AllCountDown from 'react-all-count-down';
import './example-2.css';

export default class Example2 extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false,
            count_down_style_1: {
                "fontSize": "60px",
                "color": "red"
            },
            count_down_style_2: {
                "fontSize": "20px",
                "color": "green"
            },
            show_modal:false
        };
    }
    buttonOneOnClick=() => {
        this.setState({show:true});
    }
    buttonTwoOnClick=() => {
        this.setState({show:false});
    }
    buttonThreeOnClick=() => {
        AllCountDown.stop("Example-2-No-1");
    }
    buttonFourOnClick=() => {
        AllCountDown.stop("Example-2-No-2");
    }
    buttonFiveOnClick=() => {
        AllCountDown.start("Example-2-No-1");
    }
    buttonSixOnClick=() => {
        AllCountDown.start("Example-2-No-2");
    }
    buttonSevenOnClick=() => {
        AllCountDown.start("Example-2-No-1",{seconds:120});
        AllCountDown.start("Example-2-No-2",{seconds:120});
    }
    timesUpHandler=() => {
        this.handleModalShow();
    }
    handleModalClose=() => {
        this.setState({show_modal:false});
    }
    handleModalShow=() => {
        this.setState({show_modal:true});
    }
    
    render() {
        const {show,count_down_style_1,count_down_style_2,show_modal}=this.state;
        return (
            <div className="example-2">
                <p>Example 2: start several countdowns at the same time</p>
                {show?(
                    <div className="text-content">
                        <AllCountDown name="Example-2-No-1" part="day" seconds={5*24*60*60} timesUpHandler={this.timesUpHandler} />
                        :<AllCountDown name="Example-2-No-1" part="hour" countDownStyle={count_down_style_1} />
                        :<AllCountDown name="Example-2-No-1" part="minute" />
                        :<AllCountDown name="Example-2-No-1" part="second" seconds={10} />
                    </div>
                ):null}
                {show?(
                    <div className="text-content">
                        <AllCountDown name="Example-2-No-2" part="day" days={3} timesUpHandler={this.timesUpHandler} />
                        :<AllCountDown name="Example-2-No-2" part="hour" hours={1} />
                        :<AllCountDown name="Example-2-No-2" part="minute" countDownStyle={count_down_style_2} />
                        :<AllCountDown name="Example-2-No-2" part="second" />
                    </div>
                ):null}
                <div className="button-sp-area">
                    <button disabled={show} onClick={this.buttonOneOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-one">start</button>
                    <button disabled={!show} onClick={this.buttonTwoOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-two">stop</button>
                    <button disabled={!show} onClick={this.buttonThreeOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-three">pause the first</button>
                    <button disabled={!show} onClick={this.buttonFourOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-four">pause the second</button>
                    <button disabled={!show} onClick={this.buttonFiveOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-five">resume the first</button>
                    <button disabled={!show} onClick={this.buttonSixOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-six">resume the second</button>
                    <button disabled={!show} onClick={this.buttonSevenOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-seven">start both at 120s</button>
                </div>
                <Modal  show={show_modal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Time's up !!!</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleModalClose}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
