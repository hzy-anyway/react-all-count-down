import React, { Component } from 'react'
import { Modal,Button } from "react-bootstrap";

import AllCountDown from 'react-all-count-down';
import './example-1.css';

export default class Example1 extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false,
            count_down_style: {
                "fontSize": "60px",
                "color": "red"
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
       AllCountDown.stop("Example-1-No-1");
    }
    buttonFourOnClick=() => {
        AllCountDown.start("Example-1-No-1");
    }
    buttonFiveOnClick=() => {
        AllCountDown.start("Example-1-No-1",{seconds:120});
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
        const {show,count_down_style,show_modal}=this.state;
        return (
            <div className="example-1">
                <p>Example 1: the basic usage</p>
                {show?(
                    <div className="text-content">
                        <AllCountDown name="Example-1-No-1" seconds={10} countDownStyle={count_down_style} timesUpHandler={this.timesUpHandler} /> seconds left !!
                    </div>
                ):null}
                <div className="button-sp-area">
                    <button disabled={show} onClick={this.buttonOneOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-one">start</button>
                    <button disabled={!show} onClick={this.buttonTwoOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-two">stop</button>
                    <button disabled={!show} onClick={this.buttonThreeOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-three">pause</button>
                    <button disabled={!show} onClick={this.buttonFourOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-four">resume</button>
                    <button disabled={!show} onClick={this.buttonFiveOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-five">start at 120s</button>
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
