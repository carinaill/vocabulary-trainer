class Util {
  static initializeNumberArray(length) {
    const numbers = [];
    for (let i = 0; i < length; i++) {
      numbers[i] = i;
    }
    return numbers;
  }

  static randomizeArray(arr) {
    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
