import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import keyboardBlocks from '../../../../images/keyboard-blocks.png';
import './keyboardTips.css';


export default class KeyboardTips extends Component {
    render() {
        return (
            <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                <h1>Budowa klawiatury</h1>
                <p>Klawiatura jest podzielona na kilka bloków klawiszy..</p>
                <Image src={keyboardBlocks} alt="Bloki klawiatury" fluid></Image>
                <br />
                <div className="keysDescription">
                    <p>Podstawowym blokiem są klawisze z literami, które pozwalają na wprowadzanie tekstu. Znajdują się tam również klawisze pozwalające nawprowadzanie np. cyfr, nawiasów czy klawisz <b>Spacja</b>, która pozwala umieszczać odstępy między literami. Po prawej jak i lewej tego bloku znajdują się klawisze specjalne.</p>
                    <p><b>Backspace</b> pozwala na usunięcie jedego znaku przed kursorem.</p>
                    <p><b>Shift</b> to klawisz, który pozwala na wprowadzenie wielkiej litery poprzez przytrzymanie go oraz naciśniętej porządanej litery.</p>
                    <p>Podobną funkcje pełni klawisz <b>Capslock</b> jednak po jego wciśnięciu będziemy wprowadzać wielkie litery do momentu jego ponownego wciśnięcia.</p>
                    <p><b>Tab</b> pozwala na tworzenie wcięcia poprzez przesuwając kursor o określoną odległość w prawo, lub na przemieszczanie się pomiędzy elementami np. w tabeli.</p>
                    <p><b>Enter</b> służy do zatwierdzania wpisanego tekstu lub przechodzenia do następnej linii.</p>
                    <p><b>Alt</b> dzięki jego użyciu możliwe jest wprowadzenie polskich znaków takich jak: ą, ę, ł, ś. Z połączeniu z innym klawiszem pozwala również na uruchamianie innych funkcji systemu.</p>
                    <p><b>Blok strzałek</b> pozwala na poruszanie kursorem. Mogą być używane do tego celu zamiast myszki.</p>
                </div>
            </div>
        )
    }
}
