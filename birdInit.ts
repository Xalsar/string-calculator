class Bird {
  fly() {
    console.log("Bird is flying");
  }

  layEggs() {
    console.log("Bird is laying eggs");
  }
}

interface Talkable {
  talk(): void;
}

class Parrot extends Bird implements Talkable {
  talk() {
    console.log("Parrot is talking");
  }

  layEggs() {
    console.log("Parrot is laying eggs");
  }
}

class Pidgeon extends Bird {
  coo() {
    console.log("Pidgeon is cooing");
  }
}

function mainBird() {
  const birds: Bird[] = [new Parrot(), new Pidgeon()];

  birds.forEach((bird) => {
    bird.layEggs();
  });
}

mainBird();
