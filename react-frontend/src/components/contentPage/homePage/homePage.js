import React from 'react'
import { Jumbotron, Container, Nav, Tab } from 'react-bootstrap';
import KeyboardTips from './keyboardTips/keyboardTips';
import KeyboardUse from './keyboardUse/keyboardUse';
import Position from './positionTips/position';
export default class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            position: true,
            keyboard: false,
        }
    }

    renderTab = () => {
        this.setState({
            key: 'position'
        })
    }


    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container className="jumbo">
                        <h1>Cześć!</h1>
                        <p>
                            Właśnie wykonałeś pierwszy krok w dążeniu do poprawnego posługiwania się klawiaturą komputerową.
                            Nauczysz się tutaj jak poprawnie układać dłonie, obsługiwania konkretnych klawiszy odpowiednimi palcami oraz tworzenia kombinacji klawiszy by na przykład napisać wielką literę czy polski znak. Zanim przejdziesz do lekcji praktycznych zapoznaj się z poniższymi wpisami, zawierają one ważne informację na temat stanowiska pracy jak i również obsługi samej klawiatury. Powodzenia!
                            <br />
                        </p>
                    </Container>
                </Jumbotron>
                <Tab.Container id="left-tabs-example" defaultActiveKey="position">
                    <Nav justify variant="tabs" defaultActiveKey="first">
                        <Nav.Item>
                            <Nav.Link eventKey="position">Pozycja</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="keyboard">Klawiatura - budowa</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="keyboardUse">Używanie klawiatury</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content style={{ margin: '0 auto', width: '60%' }}>
                        <Tab.Pane eventKey="position">
                            <Position />
                        </Tab.Pane>
                        <Tab.Pane eventKey="keyboard">
                            <KeyboardTips />
                        </Tab.Pane>
                        <Tab.Pane eventKey="keyboardUse">
                            <KeyboardUse />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>


            </div>
        )
    }
}