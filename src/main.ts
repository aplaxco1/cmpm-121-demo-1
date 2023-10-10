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

const buttons = document.createElement("container");

let upgrade1Cost = 10;
const upgrade1Rate = 0.1;
let upgrade1Purchased = 0;
let upgrade2Cost = 100;
const upgrade2Rate = 2;
let upgrade2Purchased = 0;
let upgrade3Cost = 1000;
const upgrade3Rate = 50;
let upgrade3Purchased = 0;

const upgradeButton1 = document.createElement("button");
upgradeButton1.className = "upgradeButton";
upgradeButton1.type = "button";
upgradeButton1.innerHTML = `<font size=+2><b>Coffee Bean Grinder</b></font><br> ${upgrade1Rate} Cups/Second<br>Cost: ${upgrade1Cost.toFixed(
  2,
)} Cups | Purchased: ${upgrade1Purchased}<br><font size=-2>Grinds coffee beans a little faster than by hand.</font>`;
upgradeButton1.disabled = true;

const upgradeButton2 = document.createElement("button");
upgradeButton2.className = "upgradeButton";
upgradeButton2.type = "button";
upgradeButton2.innerHTML = `<font size=+2><b>Pour-Over Filter</b></font><br> ${upgrade2Rate} Cups/Second<br>Cost: ${upgrade2Cost.toFixed(
  2,
)}Cups | Purchased: ${upgrade2Purchased}<br><font size=-2>Used to make pour-over coffee. Its a very methodical proccess.</font>`;
upgradeButton2.disabled = true;

const upgradeButton3 = document.createElement("button");
upgradeButton3.className = "upgradeButton";
upgradeButton3.type = "button";
upgradeButton3.innerHTML = `<font size=+2><b>Espresso Machine</b></font><br> ${upgrade3Rate} Cups/Second<br>Cost: ${upgrade3Cost.toFixed(
  2,
)} Cups | Purchased: ${upgrade3Purchased}<br><font size=-2>Used to make espresso-based coffees, like lattes and cappuccinos.`;
upgradeButton3.disabled = true;

buttons.appendChild(upgradeButton1);
buttons.appendChild(upgradeButton2);
buttons.appendChild(upgradeButton3);
app.append(buttons);

function updateUpgrade1Button() {
  upgradeButton1.innerHTML = `<font size=+2><b>Coffee Bean Grinder</b></font><br> ${upgrade1Rate} Cups/Second<br>Cost: ${upgrade1Cost.toFixed(
    2,
  )} Cups | Purchased: ${upgrade1Purchased}<br><font size=-2>Grinds coffee beans a little faster than by hand.</font>`;
  if (counter >= upgrade1Cost) {
    upgradeButton1.disabled = false;
  } else {
    upgradeButton1.disabled = true;
  }
}

function updateUpgrade2Button() {
  upgradeButton2.innerHTML = `<font size=+2><b>Pour-Over Filter</b></font><br> ${upgrade2Rate} Cups/Second<br>Cost: ${upgrade2Cost.toFixed(
    2,
  )}Cups | Purchased: ${upgrade2Purchased}<br><font size=-2>Used to make pour-over coffee. Its a very methodical proccess.</font>`;
  if (counter >= upgrade2Cost) {
    upgradeButton2.disabled = false;
  } else {
    upgradeButton2.disabled = true;
  }
}

function updateUpgrade3Button() {
  upgradeButton3.innerHTML = `<font size=+2><b>Espresso Machine</b></font><br> ${upgrade3Rate} Cups/Second<br>Cost: ${upgrade3Cost.toFixed(
    2,
  )} Cups | Purchased: ${upgrade3Purchased}<br><font size=-2>Used to make espresso-based coffees, like lattes and cappuccinos.`;
  if (counter >= upgrade3Cost) {
    upgradeButton3.disabled = false;
  } else {
    upgradeButton3.disabled = true;
  }
}

upgradeButton1.addEventListener("click", function () {
  if (counter >= upgrade1Cost) {
    counter -= upgrade1Cost;
    rateOfIncrease += upgrade1Rate;
    upgrade1Cost = priceIncrease(upgrade1Cost);
    upgrade1Purchased += 1;
  }
});

upgradeButton2.addEventListener("click", function () {
  if (counter >= upgrade2Cost) {
    counter -= upgrade2Cost;
    rateOfIncrease += upgrade2Rate;
    upgrade2Cost = priceIncrease(upgrade2Cost);
    upgrade2Purchased += 1;
  }
});

upgradeButton3.addEventListener("click", function () {
  if (counter >= upgrade3Cost) {
    counter -= upgrade3Cost;
    rateOfIncrease += upgrade3Rate;
    upgrade3Cost = priceIncrease(upgrade3Cost);
    upgrade3Purchased += 1;
  }
});

const currentRateText = document.createElement("div");
currentRateText.className = "rateText";
currentRateText.innerHTML = `${rateOfIncrease.toFixed(
  1,
)} Cups of Coffee per Second`;
app.append(currentRateText);

function priceIncrease(price: number): number {
  return price * 1.15;
}

// main animation loop
function update() {
  updateUpgrade1Button(); // update upgrade button (disabled/enabled)
  updateUpgrade2Button();
  updateUpgrade3Button();
  requestAnimationFrame(automaticIncrement); // update continuous growth
  counterText.innerHTML = `${counter.toFixed(0)} Cups of Coffee`; // update counter
  currentRateText.innerHTML = `${rateOfIncrease.toFixed(
    1,
  )} Cups of Coffee per Second`; // update rate of increase display
  requestAnimationFrame(update); // run update function
}

requestAnimationFrame(update);
