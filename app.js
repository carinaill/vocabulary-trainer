class App {
  initialized = false;

  async startTraining() {
    this.hideElement("#startButton");
    if (!this.initialized) {
      await this.initialiseTraining();
    }
    this.initialiseWordsOrder();
    this.reset();
    this.renderCard();
    this.showElement("#card");
  }

  async initialiseTraining() {
    await this.loadVocabulary();
    this.initialiseCards();
    this.initialized = true;
  }

  showElement(selector) {
    const element = document.querySelector(selector);
    element.classList.remove("hidden");
  }

  hideElement(selector) {
    const element = document.querySelector(selector);
    element.classList.add("hidden");
  }

  async loadVocabulary() {
    const msg = await fetch("vocabulary.json");
    this.json = await msg.json();
  }

  initialiseCards() {
    const card = document.querySelector("#card").addEventListener;
    const right = document.querySelector("#rightButton").addEventListener;
    const wrong = document.querySelector("#wrongButton").addEventListener;

    document.querySelector("#card").addEventListener("click", (ev) => {
      this.update();
      this.render();
    });
    document.querySelector("#wrongButton").addEventListener("click", (ev) => {
      this.wordsOrder.push(this.currentWord);
    });
  }

  initialiseWordsOrder() {
    const numbers = Util.initializeNumberArray(this.json.vocabulary.length);
    this.wordsOrder = Util.randomizeArray(numbers);
  }

  update() {
    this.finished = false;
    if (this.isFinished()) {
      this.finished = true;
      this.reset();
    } else {
      this.updateCard();
    }
  }

  render() {
    if (this.finished) {
      this.returnToStart();
    } else {
      this.renderCard();
    }
  }

  isFinished() {
    return (
      this.wordsOrderIndex == this.wordsOrder.length && this.spanish == false
    );
  }

  reset() {
    this.currentWord = this.wordsOrder[0];
    this.wordsOrderIndex = 1;
    this.spanish = true;
  }

  returnToStart() {
    this.hideElement("#card");
    this.showElement("#startButton");
    this.hideElement("#rightButton");
    this.hideElement("#wrongButton");
  }

  updateCard() {
    if (this.spanish) {
      this.showElement("#rightButton");
      this.showElement("#wrongButton");
      this.spanish = false;
    } else {
      this.hideElement("#rightButton");
      this.hideElement("#wrongButton");
      this.currentWord = this.wordsOrder[this.wordsOrderIndex];

      this.wordsOrderIndex++;
      this.spanish = true;
    }
  }

  renderCard() {
    const word = this.json.vocabulary[this.currentWord];
    const text = this.spanish ? word.es : word.de;

    document.querySelector("#card h2").innerText = text;
  }
}

const app = new App();
