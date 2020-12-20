import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import keyboardUse from '../../../../images/keyboardUse.png';

export default class KeyboardUse extends Component {
    render() {
        return (
            <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                <h1>Jak układać palce na klawiaturze?</h1>
                <p>Nauczysz się tutaj poprawnie układać  palce, żeby pisać litery, numery i znaki specjalne jak najbardziej efektywnie.</p>
                <p>Podstawowymi klawiszami rozpoczynającymi układanie palców na klawiaturze są F i J, które posiadają na sobie małą wypustke która je wskazuje. Przyciski te obsługujemy za pomocą <b>palców wskazujących</b></p>
                <p>Palce lewej ręki powinny być ułożone nad klawiszami A,S, D i F, natomiast palce prawej ręki powinny znajdować się nad przyciskami J, K, L i ;</p>
                <br/>
                <p>Są to przyciski wiersza głównego. Jest to rząd gdzie twoje palce odpoczywają, gdy nie są używane. Pozwala to na szybsze pisanie poprzez możliwość szybszego
                dostepu do klawiszy dookoła.</p>
                <p>Kciuki powinny znajdować się w powietrzu albo lekko dotykając spację.</p>
                <Image src={keyboardUse} alt="Podział klawiatury" fluid></Image>
            </div>
        )
    }
}
