import { html, render } from 'lit-html';
import { test_backend } from 'declarations/test_backend';
import { evaluate } from 'mathjs';
import logo from './logo2.svg';

class App {
  greeting = 'Hello! This is a Difinity Project on ICP blockchain';

  constructor() {
    this.#render();
    this.#attachEventListeners();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.greeting = await test_backend.greet(name);
    this.#render();
  };

  #clearDisplay = async (e) => {
    e.preventDefault();
    document.getElementById('display').value = '';
  };

  #calculate = async (e) => {
    e.preventDefault();
    const display = document.getElementById('display');
    const currentValue = display.value;

    if (!currentValue || /[+\-*/.]$/.test(currentValue)) {
      display.value = 'Error';
      return;
    }

    try {
      display.value = evaluate(currentValue);
    } catch (error) {
      console.log(error);
      display.value = 'Error';
    }
  };

  #appendToDisplay = async (e, value) => {
    e.preventDefault();
    const display = document.getElementById('display');
    const currentValue = display.value;

    const lastChar = currentValue.slice(-1);
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(value)) {
      if (operators.includes(lastChar)) {
        display.value = currentValue.slice(0, -1) + value;
      } else if (currentValue !== '') {
        display.value += value;
      }
    } else {
      display.value += value;
    }
  };

  #render() {
    let body = html`
      <main>
        <div class="difinity">
          <img src="${logo}" alt="DFINITY logo" />
          <form action="#">
            <label for="name">Enter your name: &nbsp;</label>
            <input id="name" alt="Name" type="text" placeholder="User enter your name"/>
            <button type="submit">Click Me!</button>
          </form>
          <section id="greeting">${this.greeting}</section>
        </div>

        <div class="calculator">
          <input type="text" id="display" class="calculator-display" disabled>
          <div class="calculator-keys">
            <button class="key" id="clear-btn">C</button>
            <button class="key" data-value="7">7</button>
            <button class="key" data-value="8">8</button>
            <button class="key" data-value="9">9</button>
            <button class="key" data-value="/">/</button>

            <button class="key" data-value="4">4</button>
            <button class="key" data-value="5">5</button>
            <button class="key" data-value="6">6</button>
            <button class="key" data-value="*">*</button>

            <button class="key" data-value="1">1</button>
            <button class="key" data-value="2">2</button>
            <button class="key" data-value="3">3</button>
            <button class="key" data-value="-">-</button>

            <button class="key" data-value="0">0</button>
            <button class="key" data-value=".">.</button>
            <button class="key" id="calculate-btn">=</button>
            <button class="key" data-value="+">+</button>
          </div>
        </div>
      </main>
    `;

    render(body, document.getElementById('root'));
  }

  #attachEventListeners() {
    // Attach listeners once after the initial render
    document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit);

    document.getElementById('clear-btn').addEventListener('click', this.#clearDisplay);
    document.getElementById('calculate-btn').addEventListener('click', this.#calculate);

    document.querySelectorAll('.key[data-value]').forEach((key) => {
      key.addEventListener('click', (e) => {
        this.#appendToDisplay(e, key.getAttribute('data-value'));
      });
    });
  }
}

export default App;