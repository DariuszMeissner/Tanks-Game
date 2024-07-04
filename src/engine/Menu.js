const DEFAULT_MENU_SELECTED = 0;

export class Menu {
  selectedOptions = DEFAULT_MENU_SELECTED;
  menuOptions;

  constructor() {
    this.keyStates = {
      ArrowUp: false,
      ArrowDown: false,
      Enter: false,
    };

    document.addEventListener('keydown', this.#keydown.bind(this));
    document.addEventListener('keyup', this.#keyup.bind(this));
  }

  drawMenu(context) {
    this.highlightSelectedOptions(context);
    this.move();
  }

  highlightSelectedOptions(context) {
    context.font = '40px Arial';

    this.menuOptions.forEach((option, index) => {
      if (index === this.selectedOptions) {
        context.fillStyle = 'green';
      } else {
        context.fillStyle = 'red';
      }

      context.fillText(option, 200, 100 + index * 50);
    });
  }

  move() {
    if (this.keyStates.ArrowUp) {
      this.selectedOptions = this.selectedOptions - 1 < 0 ? this.menuOptions.length - 1 : this.selectedOptions - 1;
      this.keyStates.ArrowUp = false;
      return;
    }

    if (this.keyStates.ArrowDown) {
      this.selectedOptions = this.selectedOptions + 1 > this.menuOptions.length - 1 ? 0 : this.selectedOptions + 1;
      this.keyStates.ArrowDown = false;
      return;
    }
  }

  #keydown = (e) => {
    if (this.keyStates.hasOwnProperty(e.code)) {
      this.#updateKeyState(e.code);
    }
  };

  #keyup = (e) => {
    if (this.keyStates.hasOwnProperty(e.code)) {
      this.keyStates[e.code] = false;
    }
  };

  #updateKeyState(eventKey) {
    if (this.keyStates.hasOwnProperty(eventKey)) {
      this.keyStates[eventKey] = true;
    }
  }
}
