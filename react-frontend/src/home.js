import React from 'react';
import ReactDOM from 'react-dom'
import './css/home.css';
class App extends React.Component {



  handleClick = () => {
   var hamburger = document.querySelector('.hamburger');
   var  nav = document.querySelector('.navigation');
  hamburger.classList.toggle('hamburger--active');
  nav.classList.toggle('navigation--active');
}


  render() {
    return (
      <div>
        <div class="menu">
          <button class="hamburger" onClick={this.handleClick}>
            <span class="hamburger__box">
              <span class="hamburger__inner"></span>
            </span>
          </button>

          <h1 class="logo">
            FastType
          </h1>
        </div>


        <div class="navigation">
          <ul class="navigation__list">
            <li class="navigation__item"><a href="">Lorem</a></li>
            <li class="navigation__item"><a href="">Ipsum</a></li>
            <li class="navigation__item"><a href="">Dolor</a></li>
            <li class="navigation__item"><a href="">Sit</a></li>
          </ul>
        </div>



      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('home'))