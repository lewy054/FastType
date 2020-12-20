import React, { Component } from 'react'
import sitting from '../../../../images/sitting.jpg'
import { Image } from 'react-bootstrap';
import './positionTips.css';


export default class Position extends Component {
    render() {
        return (
            <div style={{marginTop:'5%', marginBottom:'5%'}}>
                <h2>Jak siedzieć przy biurku?</h2>
                <p>
                    Często marginalizowaną rzeczą przy korzystaniu z komputera jest poprawne siedzenie. Odpowiednie ustawienie stanowiska pozwala na uzyskanie komfortu pracy oraz uchroni nas przed wieloma dolegliwościami.
                    <br />
                    Najbardziej popularnymi problemami są:
                <ul>
                        <li>sztywność karku</li>
                        <li>ból szyi</li>
                        <li>zespół cieśni nadgarstka</li>
                        <li>zgarbienie pleców</li>
                    </ul>
                </p>
                <div className="howToSit">
                    <Image src={sitting} fluid />
                    <a className="designedBy" href="http://www.freepik.com">Designed by macrovector / Freepik</a>
                </div>
                <h1 style={{marginTop:"50px"}}>Krzesło</h1>
                <p>
                    Powinno posiadać jak najwięcej opcji regulacji po to by dostosować je pod swoje ciało. Równie ważną rzeczą są podłokietniki, które pozwolą naszym ręką przyjąc optymalną pozycję. Powinny one być ustawione na wysokości blatu.
                    Siedzisko należy ustawić w taki sposób by podczas pisania plecy były oparte, a łokcie położone na podłokietnikach. Jego wysokość powinna być regulowana w zakresie 40 a 50 cm w zależności od długości podudzia, kąt zgięcia w biodrach powinien wynosić około 90 stopni, podobnie jak w kolanach.
                </p>
                <br />
                <h1>Monitor</h1>
                <p>
                    Powinien być ustawiony przynajmniej w odległości 50 cm od twarzy, górna krawędź powinna znajdować się na lub pod linią oczu. Ekran powinno się odchylić do tyłu o 5-10 stopni.
                    W monitorach stosuje się szereg technologii poprawiających komfort pracy. Przy kupnie na warto poświęcić troche czasu na wybór odpowiedniego ekranu oferującego najlepsze funkcję.
                </p>
                <br />
                <h1>Klawiatura</h1>
                <p>
                    W przypadku pracy na klawiaturach wysokoprofilowych, warto zastosować podkładkę pod nadgarstki, która pozwala na utrzymanie nadgarstków w prawidłowej pozycji. Współczesne klawiatury często oferują zintegrowaną podkładke z klawiaturą, lecz nie zawsze. Wtedy warto dokupić ją osobo, w celu zapewnienia jak najwyższego komfortu.
                </p>
                <br/>
                <h1>Przerwy</h1>
                <p>
                    Nie należy siedzieć zbyt długo w tej samej pozycji. Powinno się zmieniać swoją pozycje tak często jak jest to możliwe. Nieprzerwana praca przy monitorze powinna trwać nie dłużej niż 45 minut. Częste krótkie przerwy są lepsze dla pleców niż mniej długich przerw. Daje to mięśniom szansę na rozluźnienie się.
                </p>
            </div>
        )
    }
}
