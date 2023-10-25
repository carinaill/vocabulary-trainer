class App {
  initialized = false;

  async startTraining() {
    this.hideElement("#startButton");
    if (!this.initialized) {
      await this.initialiseTraining();
    }
    this.initialiseWordsOrder();
    this.reset();
    this.card = "#spanishCard h2";
    this.renderCard();
    this.showElement("#spanishCard");
  }

  async initialiseTraining() {
    await this.loadVocabulary();
    this.initialiseSpanishCard();
    this.initialiseGermanCard();
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

  initialiseSpanishCard() {
    document.querySelector("#spanishCard").addEventListener("click", (ev) => {
      this.update();
      this.render();
    });
  }

  initialiseGermanCard() {
    document.querySelector("#rightButton").addEventListener("click", (ev) => {
      this.update();
      this.render();
    });

    document.querySelector("#wrongButton").addEventListener("click", (ev) => {
      this.wordsOrder.push(this.currentWord);
      this.update();
      this.render();
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
    this.hideElement("#spanishCard");
    this.hideElement("#germanCard");
    this.showElement("#startButton");
  }

  updateCard() {
    if (this.spanish) {
      this.hideElement("#spanishCard");
      this.showElement("#germanCard");
      this.spanish = false;
      this.card = "#germanCard h2";
    } else {
      this.hideElement("#germanCard");
      this.showElement("#spanishCard");
      this.currentWord = this.wordsOrder[this.wordsOrderIndex];
      this.wordsOrderIndex++;
      this.spanish = true;
      this.card = "#spanishCard h2";
    }
  }

  renderCard() {
    const word = this.json.vocabulary[this.currentWord];
    const text = this.spanish ? word.es : word.de;
    
    document.querySelector(this.card).innerText = text;
  }
}

const app = new App();
