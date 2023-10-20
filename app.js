class App {
  async startTraining() {
    this.hideElement("#startButton");
    await this.loadVocabulary();
    this.updateCard();
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

  updateCard() {
    document.querySelector("#card h2").innerText = this.json.vocabulary[0].es;
  }
}

const app = new App();
