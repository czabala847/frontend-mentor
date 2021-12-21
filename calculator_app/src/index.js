const $containerPercent = document.querySelector(".group-percent") || null;
const $txtPeople = document.querySelector("#txt-people") || null;
const $txtBill = document.querySelector("#txt-bill") || null;
const $msgError = document.querySelector(".msg-error") || null;
const $custom = document.querySelector("#custom") || null;
const $btnReset = document.querySelector("#reset") || null;
const $form = document.querySelector("#form") || null;

const toggleButtonPercent = (e) => {
  e.preventDefault();

  const element = e.target.closest(".percent");
  //   const input = e.target.closest("input");

  if (element) {
    siblingEvent(element);
    calculate();
  }
};

const siblingEvent = (element) => {
  element.classList.toggle("active");
  [...element.parentNode.children].map((sibling) => {
    if (element.dataset.value != sibling.dataset.value) {
      sibling.classList.remove("active");
    }
  });

  if (element.localName !== "input" && $custom.value.length > 0) {
    $custom.value = "";
  }
};

const handleChange = (e) => {
  const value = parseInt(e.target.value);

  if (value === 0) {
    $msgError.style.display = "initial";
    $txtPeople.classList.add("error");
  } else {
    $msgError.style.display = "none";
    $txtPeople.classList.remove("error");

    calculate();
  }
};

const calculate = () => {
  const bill = parseFloat($txtBill.value) || 0;
  const nPerson = parseInt($txtPeople.value) || 0;
  let percent = 0;

  [...$containerPercent.children].map((element) => {
    if (element.classList.contains("active")) {
      if (element.localName === "button") {
        percent = parseInt(element.dataset.value);
      } else {
        percent = parseFloat($custom.value) || 0;
      }
    }
  });

  if (nPerson > 0) {
    const tip = (bill * percent) / 100;
    const tipAmount = tip / nPerson;
    const total = (bill + tip) / nPerson;

    document.querySelector("#tip-total").textContent =
      "$" + tipAmount.toFixed(2);
    document.querySelector("#total").textContent = "$" + total.toFixed(2);
  } else {
    document.querySelector("#tip-total").textContent = "$0.00";
    document.querySelector("#total").textContent = "$0.00";
  }

  $btnReset.disabled = false;
  $btnReset.classList.remove("disabled");
};

const reset = () => {
  $form.reset();
  document.querySelector("#tip-total").textContent = "$0.00";
  document.querySelector("#total").textContent = "$0.00";

  [...$containerPercent.children].map((element) => {
    element.classList.remove("active");
  });

  $btnReset.disabled = true;
  $btnReset.classList.add("disabled");
};

window.addEventListener("DOMContentLoaded", () => {
  $btnReset.disabled = true;

  if ($containerPercent) {
    $containerPercent.addEventListener("click", (e) => toggleButtonPercent(e));
  }

  if ($txtPeople) {
    $txtPeople.addEventListener("keyup", (e) => handleChange(e));
    $txtBill.addEventListener("keyup", calculate);
    $custom.addEventListener("keyup", calculate);
  }

  $btnReset.addEventListener("click", reset);
});
