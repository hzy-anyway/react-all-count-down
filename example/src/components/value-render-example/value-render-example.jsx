import React, { Component } from 'react'
import PropTypes from 'prop-types'

import img_zero from "../../assets/images/zero.jpg";
import img_one from "../../assets/images/one.jpg";
import img_two from "../../assets/images/two.jpg";
import img_three from "../../assets/images/three.jpg";
import img_four from "../../assets/images/four.jpg";
import img_five from "../../assets/images/five.jpg";
import img_six from "../../assets/images/six.jpg";
import img_seven from "../../assets/images/seven.jpg";
import img_eight from "../../assets/images/eight.jpg";
import img_nine from "../../assets/images/nine.jpg";

export default class ValueRenderExample extends Component {
    constructor(props) {
        super(props);
        this.state={
            number_images: [
                img_zero,
                img_one,
                img_two,
                img_three,
                img_four,
                img_five,
                img_six,
                img_seven,
                img_eight,
                img_nine,
              ]
        };
    }
    static propTypes = {
        value:PropTypes.number.isRequired,
    }
    valueInString=(value) => {
        return value.toString();
    }
    
    render() {
        const {number_images}=this.state;
        const {value}=this.props;
        return (
            <div className="value-in-images">
                {this.valueInString(value).split('').map((char,index)=><img src={number_images[parseInt(char)]} key={index} />)}
            </div>
        )
    }
}
