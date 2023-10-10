import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Autumn's Incremental Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.className = "mainButton";
button.type = "button";
button.innerHTML = "☕";
app.append(button);

let counter: number = 0;
let rateOfIncrease: number = 0;
const costFactor: number = 1.15;

const counterText = document.createElement("div");
counterText.className = "buttonText";
counterText.innerHTML = `${counter} Cups of Coffee`;
app.append(counterText);

button.addEventListener("click", function () {
  counter += 1;
  counterText.innerHTML = `${counter} Cups of Coffee`;
});

let prevTimeStamp: number = 0;

function automaticIncrement(timeStamp: number) {
  const elapsedTime: number = timeStamp - prevTimeStamp;
  const increment: number = rateOfIncrease * (elapsedTime / 1000);
  counter += increment;
  prevTimeStamp = timeStamp;
}

// setInterval(function () {
//   counter += 1;
//   counterText.innerHTML = `${counter} Cups of Coffee`;
// }, 1000);

interface Item {
  name: string;
  cost: number;
  rate: number;
  purchased: number;
  description: string;
}

function itemButtonHTML(item: Item): string {
  return (
    `<font size=+2><b>` +
    item.name +
    `</b></font><br>` +
    item.rate +
    ` Cups/Second<br>Cost: ` +
    item.cost.toFixed(2) +
    ` Cups | Purchased: ` +
    item.purchased +
    `<br><font size=-2>` +
    item.description +
    "</font"
  );
}

function updateItemButton(item: Item, itemButton: HTMLButtonElement): void {
  itemButton.innerHTML = itemButtonHTML(item);
  if (counter >= item.cost) {
    itemButton.disabled = false;
  } else {
    itemButton.disabled = true;
  }
}

function purchaseItem(item: Item) {
  if (counter >= item.cost) {
    counter -= item.cost;
    rateOfIncrease += item.rate;
    item.cost = costIncrease(item);
    item.purchased += 1;
  }
}

function costIncrease(item: Item): number {
  return item.cost * costFactor;
}

const availableItems: Item[] = [
  {
    name: "Coffee Bean Grinder",
    cost: 10,
    rate: 0.1,
    purchased: 0,
    description: "Grinds coffee beans a little faster than by hand.",
  },
  {
    name: "Pour-Over Filter",
    cost: 100,
    rate: 2,
    purchased: 0,
    description:
      "Used to make pour-over coffee. Its a very methodical proccess.",
  },
  {
    name: "Espresso Machine",
    cost: 1000,
    rate: 50,
    purchased: 0,
    description:
      "Used to make espresso-based coffees, like lattes and cappuccinos.",
  },
];

const itemButtonsContainer = document.createElement("container");
const itemButtons: HTMLButtonElement[] = [];

for (const item of availableItems) {
  const upgradeButton = document.createElement("button");
  upgradeButton.className = "upgradeButton";
  upgradeButton.type = "button";
  upgradeButton.innerHTML = itemButtonHTML(item);

  upgradeButton.addEventListener("click", () => {
    purchaseItem(item);
  });

  itemButtonsContainer.append(upgradeButton);
  itemButtons.push(upgradeButton);
}

app.append(itemButtonsContainer);

const currentRateText = document.createElement("div");
currentRateText.className = "rateText";
currentRateText.innerHTML = `<br>${rateOfIncrease.toFixed(
  1,
)} Cups of Coffee per Second`;
app.append(currentRateText);

// main animation loop
function update() {
  for (let button = 0; button < availableItems.length; button += 1) {
    updateItemButton(availableItems[button], itemButtons[button]); // update each button
  }
  requestAnimationFrame(automaticIncrement); // update continuous growth
  counterText.innerHTML = `${counter.toFixed(0)} Cups of Coffee`; // update counter
  currentRateText.innerHTML = `${rateOfIncrease.toFixed(
    1,
  )} Cups of Coffee per Second`; // update rate of increase display
  requestAnimationFrame(update); // run update function
}

requestAnimationFrame(update); // start animation loop
