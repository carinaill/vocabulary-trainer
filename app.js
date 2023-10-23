class App {
  initialise = true;

  async startTraining() {
    this.hideElement("#startButton");
    if (this.initialise) {
      await this.initialiseTraining();
    }
    this.initialiseOrderArray();
    this.reset();
    this.renderCard();
    this.showElement("#card");
  }

  async initialiseTraining() {
    await this.loadVocabulary();
    this.initialiseCards();
    this.initialise = false;
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
    document.querySelector("#card").addEventListener("click", (ev) => {
      this.update();
      this.render();
    });
  }

  initialiseOrderArray() {
    this.wordsOrder = [];
    for (let i = 0; i < this.json.vocabulary.length; i++) {
      this.wordsOrder[i] = i;
    }
    this.shuffleArray();
  }

  shuffleArray() {
    for (let i = this.wordsOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.wordsOrder[i], this.wordsOrder[j]] = [
        this.wordsOrder[j],
        this.wordsOrder[i],
      ];
    }
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
  }

  updateCard() {
    if (this.spanish) {
      this.spanish = false;
    } else {
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
