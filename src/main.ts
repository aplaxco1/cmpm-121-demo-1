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

const counterText = document.createElement("div");
counterText.className = "buttonText";
counterText.innerHTML = `${counter} Cups of Coffee`;
app.append(counterText);

app.addEventListener("click", function () {
  counter += 1;
  counterText.innerHTML = `${counter} Cups of Coffee`;
});
