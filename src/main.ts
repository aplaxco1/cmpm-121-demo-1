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
const rateOfIncrease: number = 1; // increases by 1 cup of coffee per second

const counterText = document.createElement("div");
counterText.className = "buttonText";
counterText.innerHTML = `${counter} Cups of Coffee`;
app.append(counterText);

app.addEventListener("click", function () {
  counter += 1;
  counterText.innerHTML = `${counter} Cups of Coffee`;
});

let prevTimeStamp: number = 0;

function continuousIncrement(timeStamp: number) {
  const elapsedTime: number = timeStamp - prevTimeStamp;
  const increment: number = rateOfIncrease * (elapsedTime / 1000);
  counter += increment;
  counterText.innerHTML = `${counter.toFixed(0)} Cups of Coffee`;
  prevTimeStamp = timeStamp;
  requestAnimationFrame(continuousIncrement);
}

requestAnimationFrame(continuousIncrement);

// setInterval(function () {
//   counter += 1;
//   counterText.innerHTML = `${counter} Cups of Coffee`;
// }, 1000);
