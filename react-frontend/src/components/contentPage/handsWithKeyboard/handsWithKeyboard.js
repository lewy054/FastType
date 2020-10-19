import React from 'react';
import Keyboard from './keyboard/keyboard';
import LeftHands from './leftHand/leftHand';
import RightHand from './rightHand/rightHand';

import './handsWithKeyboard.css'


export default class HandsWithKeyboard extends React.Component {
    state = {
        letter: '',
    }

    static getDerivedStateFromProps(props, state) {
        if (props.letter !== state.letter) {
            return {
                letter: props.letter,
            }
        }
        return null;
    }

    whichFingerLeftHand = () => {
        console.log(this.props.letter)
        switch (this.props.letter) {
            case ' ':
                return 'thumb'
            case '$':
            case '%':
            case '4':
            case '5':
            case 'r':
            case 't':
            case 'f':
            case 'g':
            case 'v':
            case 'b':
                return 'pointer'
            case '#':
            case '3':
            case 'e':
            case 'd':
            case 'c':
                return 'middle'
            case '@':
            case '2':
            case 'w':
            case 's':
            case 'x':
                return 'ring'
            case '1':
            case '!':
            case 'q':
            case 'a':
            case 'z':
                return 'little'
            default:
                return 'none'
        }
    }

    whichFingerRightHand = () => {
        switch (this.props.letter) {
            case ' ':
                return 'thumb'
            case '^':
            case '6':
            case '&':
            case '7':
            case 'y':
            case 'u':
            case 'h':
            case 'j':
            case 'n':
            case 'm':
                return 'pointer'
            case '*':
            case '8':
            case 'i':
            case 'k':
            case '<':
            case ',':
                return 'middle'
            case '(':
            case '9':
            case 'o':
            case 'l':
            case '>':
            case '.':
                return 'ring'
            case '':
                return 'little'
            default:
                return 'none'
        }
    }

    render() {
        return (
            <div className="row">
                <LeftHands whichFinger={this.whichFingerLeftHand()} />
                <div className="col">
                    <Keyboard />
                </div>
                <RightHand whichFinger={this.whichFingerRightHand()} />
            </div>

        )
    }
}