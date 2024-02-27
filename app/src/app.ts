import { NegotiationController } from "./controllers/negotiation.controller.js";

const controller = new NegotiationController();
const form = document.querySelector(".form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  controller.add();
});

const importBtn = document.querySelector("#botao-importa");
if (importBtn) {
  importBtn.addEventListener("click", () => controller.importData());
} else {
  throw Error("Import button was not founded");
}
