import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Manager from './manager';

export default class AllCountDown extends Component {
    constructor(props) {
        super(props);
        this.ready=false;
        this.state={
            value: 0,
            previous_value: 0,
            vm_valueRender: undefined
        };
        Manager.callManager("create_from_component",this);
    }
    static propTypes = {
        name:PropTypes.string.isRequired,
        part:PropTypes.string,
        days: PropTypes.number,
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
        tenths: PropTypes.number,
        hundredths: PropTypes.number,
        miliseconds: PropTypes.number,
        countDownStyle: PropTypes.object,
        timesUpHandler: PropTypes.func,
        zeroHandler: PropTypes.func,
        valueRender: PropTypes.oneOfType(
            [PropTypes.func,PropTypes.object]
        ),
        visible: PropTypes.bool,
        circular: PropTypes.bool,
        startAfterMount: PropTypes.bool
    }
    static defaultProps = {
        part: "second",
        days:0,
        hours:0,
        minutes:0,
        seconds:0,
        tenths:0,
        hundredths:0,
        miliseconds:0,
        countDownStyle:{},
        visible:true,
        circular:false,
        startAfterMount:true
    }
	static start(name,time) {
		if (Manager) {
			Manager.start(name,time);
		} else {
			throw new Error("there's no timer manager");
		}
	}
	static stop(name) {
		if (Manager) {
			Manager.stop(name);
		} else {
			throw new Error("there's no timer manager");
		}
	}
    removeTimer=() => {
        Manager.removeTimer(this.name);
    }
    updateValue=(data) => {
        const previous_value = this.state.value;
        const value = data[this.props.part];
        this.setState({
            previous_value,
            value
        });
    }
    tellManagerDestroy=() => {
        Manager.callManager("destroy_from_component",this);
    }
    componentDidMount() {
        Manager.callManager("mount_from_component",this);
    }
    componentWillUnmount() {
        this.tellManagerDestroy();
    }
    render() {
        const {value}=this.state;
        const {countDownStyle,visible}=this.props;
        const ValueRender=this.props.valueRender;
        if (visible && !ValueRender) {
            return (
            <span style={countDownStyle}>{value}</span>
            )
        } else if (visible && ValueRender) {
            return (
                <ValueRender value={value}></ValueRender>
            )
        } else {
            return null;
        }
    }
}