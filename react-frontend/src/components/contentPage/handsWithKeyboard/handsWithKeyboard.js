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
            case 'R':
            case 'F':
            case 'G':
            case 'V':
            case 'T':
            case 'B':
                return 'pointer'
            case '#':
            case '3':
            case 'e':
            case 'd':
            case 'c':
            case 'E':
            case 'D':
            case 'C':
                return 'middle'
            case '@':
            case '2':
            case 'w':
            case 's':
            case 'x':
            case 'W':
            case 'S':
            case 'X':
                return 'ring'
            case '1':
            case '!':
            case 'q':
            case 'a':
            case 'z':
            case 'A':
            case 'Q':
            case 'Z':
            //capital letters from the right hand(shift)
            case 'Y':
            case 'U':
            case 'H':
            case 'J':
            case 'N':
            case 'M':
            case 'K':
            case 'I':
            case 'O':
            case 'L':
            case 'P':
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
            case 'Y':
            case 'U':
            case 'H':
            case 'J':
            case 'N':
            case 'M':
                return 'pointer'
            case '*':
            case '8':
            case 'i':
            case 'k':
            case '<':
            case ',':
            case 'K':
            case 'I':
                return 'middle'
            case '(':
            case '9':
            case 'o':
            case 'l':
            case '>':
            case '.':
            case 'O':
            case 'L':
                return 'ring'
            case 'p':
            case 'P':
            //capital letters from the left hand(shift)
            case 'R':
            case 'F':
            case 'G':
            case 'V':
            case 'T':
            case 'B':
            case 'E':
            case 'D':
            case 'C':
            case 'W':
            case 'S':
            case 'X':
            case 'A':
            case 'Q':
            case 'Z':
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