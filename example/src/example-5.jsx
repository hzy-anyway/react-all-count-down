import React, { Component } from 'react'
import { Modal,Button } from "react-bootstrap";

import AllCountDown from 'react-all-count-down';
import './example-5.css';

export default class Example5 extends Component {
    constructor(props) {
        super(props);
        this.state={
            run: true,
            popup_content:"5 seconds you have been here !!",
            block_2_style:{
                "display":"block",
                "width":"100px",
                "height":"100px",
                "backgroundColor":"red"
            },
            block_3_style:{
                "display":"block",
                "width":"100px",
                "height":"100px",
                "backgroundColor":"red"
            },
            block_4_style:{
                "display":"block",
                "width":"100px",
                "height":"100px",
                "backgroundColor":"red"
            },
            show_modal:false
        };
    }
    timesUpHandler_1=() => {
        this.handleModalShow();
    }
    timesUpHandler_2=() => {
        let style_new=Object.assign({},this.state.block_2_style);
        if (style_new["backgroundColor"]==="red") {
            style_new["backgroundColor"]="green";
        } else {
            style_new["backgroundColor"]="red";
        }
        this.setState({block_2_style:style_new});
    }
    timesUpHandler_3=() => {
        let style_new=Object.assign({},this.state.block_3_style);
        if (style_new["backgroundColor"]==="red") {
            style_new["backgroundColor"]="green";
        } else {
            style_new["backgroundColor"]="red";
        }
        this.setState({block_3_style:style_new});
    }
    timesUpHandler_4=() => {
        let style_new=Object.assign({},this.state.block_4_style);
        if (style_new["backgroundColor"]==="red") {
            style_new["backgroundColor"]="green";
        } else {
            style_new["backgroundColor"]="red";
        }
        this.setState({block_4_style:style_new});
    }
    handleModalClose=() => {
        this.setState({show_modal:false});
    }
    handleModalShow=() => {
        this.setState({show_modal:true});
    }
    
    render() {
        const {run,popup_content,block_2_style,block_3_style,block_4_style,show_modal}=this.state;
        return (
            <div className="example-5">
                <p>Example 5: being a timer invisibly</p>
                <div className="no-1">
                    <span>A modal will popup in 5 seconds</span>
                </div>
                <div className="no-2">
                    <span>Color switcher：a 'two seconds' interval</span>
                    <div className="block-2" style={block_2_style}>
                        
                    </div>
                </div>
                <div className="no-3">
                    <span>Color switcher：an 'one minute' interval</span>
                    <div className="block-3" style={block_3_style}>
                        
                    </div>
                </div>
                <div className="no-4">
                    <span>Color switcher：a 'tenth of a second' interval</span>
                    <div className="block-4" style={block_4_style}>
                        
                    </div>
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
                {/* <!-- timer: time's up in 5 seconds,not circular,the same as function 'setTimeout()' --> */}
                {run?<AllCountDown name="Example-5-No-1" visible={false} seconds={5} timesUpHandler={this.timesUpHandler_1} />:null}
                {/* <!-- timer: set a 'two seconds' interval --> */}
                {run?<AllCountDown name="Example-5-No-2" visible={false} seconds={2} circular={true} timesUpHandler={this.timesUpHandler_2} />:null}
                {/* <!-- timer: set an 'one minute' interval --> */}
                {run?<AllCountDown name="Example-5-No-3" visible={false} minutes={1} circular={true} timesUpHandler={this.timesUpHandler_3} />:null}
                {/* <!-- timer: set a 'tenth of a second' interval --> */}
                {run?<AllCountDown name="Example-5-No-4" visible={false} tenths={1} circular={true} timesUpHandler={this.timesUpHandler_4} />:null}
            </div>
        )
    }
}
