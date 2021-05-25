const divWithoutContent = document.getElementById(
  "my-gifos-section-without-content"
);
const divWithContent = document.getElementById("my-gifos-section-with-content");
const gifoCreated = localStorage.getItem("gifCreated");

if (document.getElementById("my-gifos-section")) {
  if (gifoCreated == null) {
    divWithoutContent.style.display = "flex";
  }
  if (gifoCreated !== null) {
    console.log("Ya hay un gifo creado y guardado en el LS"); ////////////////
  }
}
