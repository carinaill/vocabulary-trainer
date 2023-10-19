class App {
  async onClick() {
    const msg = await fetch("vocabulary.json");
    const json = await msg.json();
  }
}
const app = new App;
