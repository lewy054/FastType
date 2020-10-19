import React, { Component } from 'react'
import hand from '../../../../images/hands/hand.png';
import pointer from '../../../../images/hands/pointer.png';
import little from '../../../../images/hands/little.png';
import middle from '../../../../images/hands/middle.png';
import ring from '../../../../images/hands/ring.png';
import thumb from '../../../../images/hands/thumb.png';

export default class RightHand extends Component {
    renderHand = () =>{
        switch(this.props.whichFinger){
            case 'pointer':
                return <img src={pointer} alt="wskazujący" />
            case 'little':
                return <img src={little} alt="mały" />
            case 'middle':
                return <img src={middle} alt="środkowy" />
            case 'ring':
                return <img src={ring} alt="serdeczny" />
            case 'thumb':
                return <img src={thumb} alt="kciuk" />
            default:
                return <img src={hand} alt="leftHand" />

        }
    }

    render() {
        return (
            <div className="col rightHand">
                {this.renderHand()}
            </div>
        )
    }
}
