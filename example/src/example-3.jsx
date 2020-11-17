import React, { Component } from 'react'
import { Modal,Button } from "react-bootstrap";

import AllCountDown from 'react-all-count-down';
import './example-3.css';

export default class Example3 extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false,
            popup_content:"Time's up !!!",
            show_modal:false
        };
    }
    buttonOneOnClick=() => {
        this.setState({show:true});
    }
    buttonTwoOnClick=() => {
        this.setState({show:false});
    }
    minuteZeroHandler=() => {
        this.setState({popup_content:"Part 'minute' comes to 0",show_modal:true});
        console.log(this.state.popup_content);
    }
    secondZeroHandler=() => {
        this.setState({popup_content:"Part 'second' comes to 0",show_modal:true});
        console.log(this.state.popup_content);
    }
    handleModalClose=() => {
        this.setState({show_modal:false});
    }
    handleModalShow=() => {
        this.setState({show_modal:true});
    }
    
    render() {
        const {show,popup_content,show_modal}=this.state;
        return (
            <div className="example-3">
                <p>Example 3: the usage of prop 'zeroHandler'</p>
                {show?(
                    <div className="text-content">
                        <AllCountDown name="Example-3-No-1" part="day" />
                        :<AllCountDown name="Example-3-No-1" part="hour" />
                        :<AllCountDown name="Example-3-No-1" part="minute" minutes={1} zeroHandler={this.minuteZeroHandler} />
                        :<AllCountDown name="Example-3-No-1" part="second" seconds={5} zeroHandler={this.secondZeroHandler} />
                    </div>
                ):null}
                <div className="button-sp-area">
                    <button disabled={show} onClick={this.buttonOneOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-one">start</button>
                    <button disabled={!show} onClick={this.buttonTwoOnClick} type="button" className="btn btn-outline-primary btn-lg btn-block button-two">stop</button>
                </div>
                <Modal  show={show_modal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{popup_content}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleModalClose}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
