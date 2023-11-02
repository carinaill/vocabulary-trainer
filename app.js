class App {
  initialized = false;

  async chooseSet() {
    this.hideElement("#startButton");
    await this.loadVocabulary("sets.json");
    if (!this.initialized) {
      await this.initialiseSets();
    } else {
      this.showElement(".flexbox");
    }
  }

  async startTraining() {
    this.hideElement(".flexbox");
    await this.loadVocabulary(this.vocabularySet);
    if (!this.initialized) {
      await this.initialiseTraining();
    }
    this.initialiseWordsOrder();
    this.reset();
    this.renderCard();
  }

  async initialiseSets() {
    let box = document.createElement("div");
    box.className = "flexbox";

    for (let i = 0; i < this.json.sets.length; i++) {
      let div = document.createElement("div");
      div.className = "card";
      div.id = `card${i}`;
      box.appendChild(div);
      document.body.appendChild(box);

      document.querySelector(
        `#card${i}`
      ).innerHTML = `<h2>Lerne die ${this.json.sets[i].name} auf Spanisch</h2>`;

      div.addEventListener("click", async (ev) => {
        this.vocabularySet = this.json.sets[i].dateiname;
        console.log(this.vocabularySet);
        await this.startTraining();
      });
    }
  }

  async initialiseTraining() {
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

  async loadVocabulary(selector) {
    const msg = await fetch(selector);
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
    const toHide = this.spanish ? "#germanCard" : "#spanishCard";
    const toShow = this.spanish ? "#spanishCard" : "#germanCard";
    const card = `${toShow} h2`;

    document.querySelector(card).innerText = text;

    this.hideElement(toHide);
    this.showElement(toShow);
  }
}

const app = new App();
