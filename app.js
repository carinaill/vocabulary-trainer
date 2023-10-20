class App {
  initialise = true;

  async startTraining() {
    this.hideElement("#startButton");
    if (this.initialise) {
      await this.initialiseTraining();
    }
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
    this.reset();
    document.querySelector("#card").addEventListener("click", (ev) => {
      if (this.finished()) {
        this.reset();
        this.returnToStart();
      } else {
        this.updateCard();
        this.renderCard();
      }
    });
  }

  finished() {
    return (
      this.currentWord == this.json.vocabulary.length - 1 &&
      this.spanish == false
    );
  }

  reset() {
    this.currentWord = 0;
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
      this.currentWord++;
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
