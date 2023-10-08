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
let rateOfIncrease: number = 0; // increases by 1 cup of coffee per second

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

const upgradeButton1 = document.createElement("button");
upgradeButton1.className = "upgradeButton";
upgradeButton1.type = "button";
upgradeButton1.innerHTML = "Upgrade 1";
upgradeButton1.disabled = true;
app.append(upgradeButton1);

const upgrade1Cost = 10;

function updateUpgrade1Button() {
  if (counter >= upgrade1Cost) {
    upgradeButton1.disabled = false;
  } else {
    upgradeButton1.disabled = true;
  }
}

upgradeButton1.addEventListener("click", function () {
  if (counter >= upgrade1Cost) {
    counter -= upgrade1Cost;
    rateOfIncrease += 1;
  }
});

// main animation loop
function update() {
  updateUpgrade1Button(); // update upgrade button (disabled/enabled)
  requestAnimationFrame(automaticIncrement); // update continuous growth
  counterText.innerHTML = `${counter.toFixed(0)} Cups of Coffee`; // update counter
  requestAnimationFrame(update); // run update function
}

requestAnimationFrame(update);
