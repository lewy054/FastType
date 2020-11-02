import React from 'react';
import Keyboard from './keyboard/keyboard';
import LeftHands from './leftHand/leftHand';
import RightHand from './rightHand/rightHand';
import TextInstructions from './textInstructions/textInstructions';


import './handsWithKeyboard.css'


let rightShift;
let leftShift;
export default class HandsWithKeyboard extends React.Component {
    constructor() {
        super();
        leftShift = false;
        rightShift = false;
        this.state = {
            letter: '',
            win: false,
        }
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
        leftShift = false;
        switch (this.state.letter) {
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
                return 'little'
            //chars from the right hand(shift)
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
            case '^':
            case '*':
            case '&':
            case '(':
            case ')':
            case ':':
            case '?':
            case '_':
            case '{':
            case '}':
            case '+':
            case '|':
            case '"':
            case '<':
            case '>':
                leftShift = true;
                return 'little'
            default:
                return 'none'
        }
    }

    whichFingerRightHand = () => {
        rightShift = false;
        switch (this.state.letter) {
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
            case ')':
            case 'p':
            case 'P':
            case '0':
            case ';':
            case ':':
            case '?':
            case '/':
            case '-':
            case '_':
            case '[':
            case ']':
            case '{':
            case '}':
            case "'":
            case '"':
            case '+':
            case '=':
            case 'Delete':
            case '\\':
            case '|':
            case 'Enter':
                return 'little'
            //chars from the left hand(shift)
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
            case '$':
            case '%':
            case '@':
            case '!':
            case '#':
                rightShift = true;
                return 'little'
            default:
                return 'none'
        }
    }

    renderInstructions = (leftFinger, rightFinger) => {
        if (this.props.withInstructions) {
            return <TextInstructions letter={this.state.letter} leftFinger={leftFinger} rightFinger={rightFinger} leftShift={leftShift} rightShift={rightShift} />

        }
    }

    render() {
        let leftFinger = this.whichFingerLeftHand();
        let rightFinger = this.whichFingerRightHand();
        return (
            <div>
                {this.renderInstructions(leftFinger, rightFinger)}
                <div>
                    <div className="row">
                        <div>
                            <LeftHands whichFinger={leftFinger} />
                        </div>
                        <div className="col">
                            <Keyboard letter={this.state.letter} leftShift={leftShift} rightShift={rightShift} win={this.props.win} />
                        </div>
                        <div>
                            <RightHand whichFinger={rightFinger} />
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}