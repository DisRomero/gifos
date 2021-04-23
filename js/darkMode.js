const colorSwitch = document.getElementById("color-switch");
colorSwitch.addEventListener("click", checkMode);

export function checkMode() {
  if (colorSwitch.checked) {
    console.log("dark mode");
    darkModeOn();
  } else {
    console.log("light mode");
    darkModeOff();
  }
}

function darkModeOn() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "true");
  // replace text mode
  const txtMode = document.getElementById("text-color-switch");
  txtMode.innerHTML = txtMode.innerHTML.replace("nocturno", "diurno");
}

function darkModeOff() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", "false");
  // replace text mode
  const txtMode = document.getElementById("text-color-switch");
  txtMode.innerHTML = txtMode.innerHTML.replace("diurno", "nocturno");
}

// get value of dark-mode into local storage
if (localStorage.getItem("dark-mode") === "true") {
  colorSwitch.checked = true;
  darkModeOn();
} else {
  colorSwitch.classList.remove("active");
  darkModeOff();
}
