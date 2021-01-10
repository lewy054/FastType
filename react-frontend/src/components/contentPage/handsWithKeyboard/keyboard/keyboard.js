import React from 'react';

import './keyboard.css';
import clickSound from '../../../../sounds/button_sound.mp3';

let buttonName;
let audio;
export default class Keyboard extends React.Component {
    constructor() {
        super()
        this.state = {
            letter: '',
            test: false,
            size: '9',
        }
        this.keyboard = React.createRef()
        audio = new Audio(clickSound);
    }
    componentDidMount() {
        this.resize();
        document.addEventListener("keydown", this.onButtonClick, false);
        window.addEventListener('resize', this.resize, false);
        this.highLightButtons()
    }
    componentDidUpdate() {
        try {
            document.getElementById("button" + this.mapButtons(buttonName)).classList.remove("button--active--correct");
            document.getElementById("buttonshiftright").classList.remove("button--active--correct");
            document.getElementById("buttonshiftleft").classList.remove("button--active--correct");
        } catch (error) {
            console.log(error);
        }
        this.highLightButtons();
        if (this.props.win) {
            document.removeEventListener("keydown", this.onButtonClick, false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onButtonClick, false);
        window.removeEventListener('resize', this.resize, false);
    }

    resize = () => {
        let size = this.keyboard.clientWidth / 90;
        this.setState({
            size: size,
        })
    }

    onButtonClick = (event) => {
        let key = event.key.toLowerCase();
        if (key === 'shift') {
            audio.play();
            this.highLightClickedButton('shiftleft');
            this.highLightClickedButton('shiftright');
        }
        else if (key === 'control') {
            audio.play();
            this.highLightClickedButton('ctrlleft');
            this.highLightClickedButton('ctrlright');
        }
        else if (key === 'alt') {
            audio.play();
            this.highLightClickedButton('altleft');
            this.highLightClickedButton('altright');
        }
        else {
            audio.play();
            this.highLightClickedButton(this.mapButtons(key));
        }
    }

    highLightClickedButton = (key) => {
        let div = document.getElementById("button" + key);
        if (div) {
            if (div.classList.contains('button--active')) {
                div.classList.toggle('button--active', false);
                void div.offsetWidth;
                div.classList.toggle('button--active', true);
            }
            else {
                div.classList.toggle('button--active', true);
            }
        }
    }

    highLightButtons = () => {
        if (this.props.letter) {
            buttonName = this.props.letter.toLowerCase();
            let div = document.getElementById("button" + this.mapButtons(buttonName));
            if (div) {
                div.classList.add("button--active--correct");
            }
            if (this.props.rightShift) {
                document.getElementById("buttonshiftright").classList.add("button--active--correct");
            }
            if (this.props.leftShift) {
                document.getElementById("buttonshiftleft").classList.add("button--active--correct");
            }
        }
    }

    mapButtons = (char) => {
        switch (char) {
            case '`':
                return '~'
            case 'Dead':
                return '~'
            case '!':
                return '1'
            case '@':
                return '2'
            case '#':
                return '3'
            case '$':
                return '4'
            case '%':
                return '5'
            case '^':
                return '6'
            case '&':
                return '7'
            case '*':
                return '8'
            case '(':
                return '9'
            case ')':
                return '0'
            case '_':
                return '-'
            case '=':
                return '+'
            case '[':
                return '{'
            case ']':
                return '}'
            case '\\':
                return '|'
            case ';':
                return ':'
            case '"':
                return "'"
            case ',':
                return '<'
            case '.':
                return '>'
            case '/':
                return '?'
            default:
                return char;
        }
    }


    render() {
        return (
            <div>
                <div className="keyboard" ref={elem => this.keyboard = elem} style={{ fontSize: `${this.state.size}px` }}>
                    <div className="keyboard__row">
                        <div id="button~" className="key--double" data-key="192">
                            <div>~</div>
                            <div>`</div>
                        </div>
                        <div id="button1" className="key--double" data-key="49">
                            <div>!</div>
                            <div>1</div>
                        </div>
                        <div id="button2" className="key--double" data-key="50">
                            <div>@</div>
                            <div>2</div>
                        </div>
                        <div id="button3" className="key--double" data-key="51">
                            <div>#</div>
                            <div>3</div>
                        </div>
                        <div id="button4" className="key--double" data-key="52">
                            <div>$</div>
                            <div>4</div>
                        </div>
                        <div id="button5" className="key--double" data-key="53">
                            <div>%</div>
                            <div>5</div>
                        </div>
                        <div id="button6" className="key--double" data-key="54">
                            <div>^</div>
                            <div>6</div>
                        </div>
                        <div id="button7" className="key--double" data-key="55">
                            <div>{'&'}</div>
                            <div>7</div>
                        </div>
                        <div id="button8" className="key--double" data-key="56">
                            <div>*</div>
                            <div>8</div>
                        </div>
                        <div id="button9" className="key--double" data-key="57">
                            <div>{'('}</div>
                            <div>9</div>
                        </div>
                        <div id="button0" className="key--double" data-key="48">
                            <div>{')'}</div>
                            <div>0</div>
                        </div>
                        <div id="button-" className="key--double" data-key="189">
                            <div>_</div>
                            <div>-</div>
                        </div>
                        <div id="button+" className="key--double" data-key="187">
                            <div>+</div>
                            <div>=</div>
                        </div>
                        <div id="buttonbackspace" className="key--bottom-right key--word key--w4" data-key="8">
                            <span>backspace</span>
                        </div>
                    </div>
                    <div className="keyboard__row">
                        <div id="buttontab" className="key--bottom-left key--word key--w4" data-key="9">
                            <span>tab</span>
                        </div>
                        <div id="buttonq" className="key--letter" data-char="Q">Q</div>
                        <div id="buttonw" className="key--letter" data-char="W">W</div>
                        <div id="buttone" className="key--letter" data-char="E">E</div>
                        <div id="buttonr" className="key--letter" data-char="R">R</div>
                        <div id="buttont" className="key--letter" data-char="T">T</div>
                        <div id="buttony" className="key--letter" data-char="Y">Y</div>
                        <div id="buttonu" className="key--letter" data-char="U">U</div>
                        <div id="buttoni" className="key--letter" data-char="I">I</div>
                        <div id="buttono" className="key--letter" data-char="O">O</div>
                        <div id="buttonp" className="key--letter" data-char="P">P</div>
                        <div id="button{" className="key--double" data-key="219" data-char="{[">
                            <div>{'{'}</div>
                            <div>[</div>
                        </div>
                        <div id="button}" className="key--double" data-key="221" data-char="}]">
                            <div>{'}'}</div>
                            <div>]</div>
                        </div>
                        <div id="button|" className="key--double" data-key="220" data-char="|\">
                            <div>|</div>
                            <div>\</div>
                        </div>
                    </div>
                    <div className="keyboard__row">
                        <div id="buttoncapslock" className="key--bottom-left key--word key--w5" data-key="20">
                            <span>caps lock</span>
                        </div>
                        <div id="buttona" className="key--letter" data-char="A">A</div>
                        <div id="buttons" className="key--letter" data-char="S">S</div>
                        <div id="buttond" className="key--letter" data-char="D">D</div>
                        <div id="buttonf" className="key--letter" data-char="F">F</div>
                        <div id="buttong" className="key--letter" data-char="G">G</div>
                        <div id="buttonh" className="key--letter" data-char="H">H</div>
                        <div id="buttonj" className="key--letter" data-char="J">J</div>
                        <div id="buttonk" className="key--letter" data-char="K">K</div>
                        <div id="buttonl" className="key--letter" data-char="L">L</div>
                        <div id="button:" className="key--double" data-key="186">
                            <div>:</div>
                            <div>;</div>
                        </div>
                        <div id="button'" className="key--double" data-key="222">
                            <div>"</div>
                            <div>'</div>
                        </div>
                        <div id="buttonenter" className="key--bottom-right key--word key--w5" data-key="13">
                            <span>enter</span>
                        </div>
                    </div>
                    <div className="keyboard__row">
                        <div id="buttonshiftleft" className="key--bottom-left key--word key--w6" data-key="16">
                            <span>shift</span>
                        </div>
                        <div id="buttonz" className="key--letter" data-char="Z">Z</div>
                        <div id="buttonx" className="key--letter" data-char="X">X</div>
                        <div id="buttonc" className="key--letter" data-char="C">C</div>
                        <div id="buttonv" className="key--letter" data-char="V">V</div>
                        <div id="buttonb" className="key--letter" data-char="B">B</div>
                        <div id="buttonn" className="key--letter" data-char="N">N</div>
                        <div id="buttonm" className="key--letter" data-char="M">M</div>
                        <div id="button<" className="key--double" data-key="188">
                            <div>&lt;</div>
                            <div>,</div>
                        </div>
                        <div id="button>" className="key--double" data-key="190">
                            <div>&gt;</div>
                            <div>.</div>
                        </div>
                        <div id="button?" className="key--double" data-key="191">
                            <div>?</div>
                            <div>/</div>
                        </div>
                        <div id="buttonshiftright" className="key--bottom-right key--word key--w6" data-key="16-R">
                            <span>shift</span>
                        </div>
                    </div>
                    <div className="keyboard__row keyboard__row--h3">
                        <div id="buttonctrlleft" className="key--bottom-left key--word key--w1">
                            <span>ctrl</span>
                        </div>
                        <div id="buttonfn" className="key--bottom-left key--word key--w1" data-key="17">
                            <span>fn</span>
                        </div>
                        <div id="buttonaltleft" className="key--bottom-left key--word key--w1" data-key="18">
                            <span>alt</span>
                        </div>
                        <div id="button " className="key--double key--right key--space" data-key="32" data-char=" ">
                            &nbsp;
                        </div>
                        <div id="buttonaltright" className="key--bottom-left key--word key--w3" data-key="93-R">
                            <span>alt</span>
                        </div>
                        <div id="buttonfnright" className="key--bottom-left key--word key--w1" data-key="18-R">
                            <span>fn</span>
                        </div>
                        <div id="buttonctrlright" className="key--bottom-left key--word key--w1" data-key="18-R">
                            <span>ctrl</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}