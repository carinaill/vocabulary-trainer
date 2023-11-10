class App {
  async initialize() {
    this.hideElement("#app")
    await this.initializeStartButton();
    await this.loadVocabulary("sets.json");
    await this.initializeSets();

    this.initializeSpanishCard();
    this.initializeGermanCard();
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

  async initializeStartButton() {
    let div = document.createElement("div");
    div.className = "startButton";
    div.id = "startButton";
    document.body.appendChild(div);

    document.querySelector("#startButton").innerHTML = "<span class=\"vocabulary\">Start</span>";

    div.addEventListener("click", async (ev) => {
      await this.chooseSet();
    });
  }

  async initializeSets() {
    let row = document.createElement("div");
    row.className = "row hidden";
    row.id = "sets";

    for (let i = 0; i < this.json.sets.length; i++) {
      let div = document.createElement("div")
      div.className = "card";
      div.id = `card${i}`;
      row.appendChild(div);
      document.body.appendChild(row);

      document.querySelector(
        `#card${i}`
      ).innerHTML = `<span class=\"vocabulary\">Lerne die ${this.json.sets[i].name} auf Spanisch</span>`;

      div.addEventListener("click", async (ev) => {
        this.vocabularySet = this.json.sets[i].filename;
        await this.startTraining();
      });
    }
  }

  initializeSpanishCard() {
    const card = this.initializeCard("spanish");

    card.addEventListener("click", (ev) => {
      this.update();
      this.render();
    });
  }
  
  initializeGermanCard() {
    const card = this.initializeCard("german");

    const wrongButton = this.initializeButton(card, "wrong");
    wrongButton.innerHTML = "Falsch";
    wrongButton.addEventListener("click", (ev) => {
      this.wordsOrder.push(this.currentWord);
      this.update();
      this.render();
    });

    const rightButton = this.initializeButton(card, "right");
    rightButton.innerHTML = "Richtig";
    rightButton.addEventListener("click", (ev) => {
      this.update();
      this.render();
    });
  }

  initializeFrame(id) {
    const frame = document.createElement("div");
    frame.className = "frame hidden";
    frame.id = `${id}Box`;
    document.body.appendChild(frame);
    return frame
  }

  initializeCard(id) {
    const frame = this.initializeFrame(id);

    const card = document.createElement("div");
    card.className = `${id} card` ;
    card.id = `${id}Card`;
    frame.appendChild(card);
    card.innerHTML = "<span class=\"vocabulary\">kV</span>";
    return card
  }
  
  initializeButton(card, buttonId) {
    let button = document.createElement("div");
    button.className = `${buttonId}Button`;
    button.id = `${buttonId}Button`;
    card.appendChild(button);
    return button;
  }

  async chooseSet(){
    this.hideElement("#startButton");
    await this.loadVocabulary("sets.json");
    this.showElement("#sets");
  }

  async startTraining() {
    this.hideElement("#sets");
    await this.loadVocabulary(this.vocabularySet);
    this.setWordsOrder();
    this.reset();
    this.renderCard();
  }

  setWordsOrder() {
    const numbers = Util.initializeNumberArray(this.json.vocabulary.length);
    this.wordsOrder = Util.randomizeArray(numbers);
  }

  reset() {
    this.currentWord = this.wordsOrder[0];
    this.wordsOrderIndex = 1;
    this.spanish = true;
  }

  renderCard() {
    const word = this.json.vocabulary[this.currentWord];
    const text = this.spanish ? word.es : word.de;
    const toHide = this.spanish ? "#germanBox" : "#spanishBox";
    const toShow = this.spanish ? "#spanishBox" : "#germanBox";
    const card = `${toShow} .vocabulary`;

    document.querySelector(card).innerText = text;

    this.hideElement(toHide);
    this.showElement(toShow);
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

  returnToStart() {
    this.hideElement("#spanishBox");
    this.hideElement("#germanBox");
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
}

document.addEventListener("DOMContentLoaded", (ev) =>{
  const app = new App();
  app.initialize();
})