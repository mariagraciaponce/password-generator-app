
const slider = document.getElementById("length-range");
const lengthValue = document.getElementById("value");
const passwordDisplay = document.querySelector(".password-display span");
const copyBtn = document.querySelector(".copy-btn");
const copiedMsg = document.querySelector(".copied-message");
const generateBtn = document.querySelector(".generate-btn");
const strengthLabel = document.getElementById("strength-label");
const strengthBars = document.querySelectorAll(".bars-container .bar");


const uppercaseCb = document.getElementById("uppercase");
const lowercaseCb = document.getElementById("lowercase");
const numbersCb = document.getElementById("numbers");
const symbolsCb = document.getElementById("symbols");

// Aqui traemos del DOM las varibales que necesitamos, incluido 
// cada checkbox con su value

const chars = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*(){}[]=<>/,.?"
};
// estas son las opciones para la contraseña

slider.addEventListener("input", () => {
  lengthValue.textContent = slider.value;
  slider.style.setProperty("--value", (slider.value / slider.max) * 100);
});

//funcion para crear la contraseña 
function generatePassword() {
  const length = parseInt(slider.value);
  let pool = "";
  let password = "";

  if (uppercaseCb.checked) pool += chars.upper;
  if (lowercaseCb.checked) pool += chars.lower;
  if (numbersCb.checked) pool += chars.numbers;
  if (symbolsCb.checked) pool += chars.symbols;

  if (!pool) {
    passwordDisplay.textContent = "Select options!";
    updateStrength("");
    return;
    //si no han seleccionado ninguna checkbox, no se genera nada
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    password += pool[randomIndex];
    //aqui se genera cada letra/simbolo/numero de la contraseña
  }

  passwordDisplay.textContent = password;
  updateStrength(password);
}

function updateStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  // cada que tiene una de las caracteristicas le suma un punto
  // el puntaje max es 5

 
  strengthBars.forEach(bar => {
    bar.className = "bar";
  });

  if (score <= 2) {
    strengthLabel.textContent = "TOO WEAK!";
    strengthBars[0].classList.add("active", "red");
  } else if (score === 3) {
    strengthLabel.textContent = "WEAK";
    strengthBars[0].classList.add("active", "orange");
    strengthBars[1].classList.add("active", "orange");
  } else if (score === 4) {
    strengthLabel.textContent = "MEDIUM";
    strengthBars[0].classList.add("active", "yellow");
    strengthBars[1].classList.add("active", "yellow");
    strengthBars[2].classList.add("active", "yellow");
  } else if (score === 5) {
    strengthLabel.textContent = "STRONG";
    strengthBars[0].classList.add("active", "green");
    strengthBars[1].classList.add("active", "green");
    strengthBars[2].classList.add("active", "green");
    strengthBars[3].classList.add("active", "green");
  }
}


copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.textContent;
  if (!password || password === "Select options!") return;

  navigator.clipboard.writeText(password).then(() => {
    copiedMsg.style.display = "block";
    setTimeout(() => (copiedMsg.style.display = "none"), 2000);
  });
});

// --- GENERAR AL HACER CLICK ---
generateBtn.addEventListener("click", generatePassword);
