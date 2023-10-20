class App {
  async startTraining() {
    this.hideElement("#startButton");
    await this.loadVocabulary();
    this.initialiseCards();
    this.renderCard();
    this.showElement("#card");
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
    this.currentWord = 0;
    this.spanish = true;
    document.querySelector("#card").addEventListener("click", (ev) => {
      this.updateCard();
      this.renderCard();
    });
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
