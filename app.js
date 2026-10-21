const body = document.body;
/* =========================================
   SAS D'ACCÈS + POPUP DE BIENVENUE
========================================= */

// Mot de passe temporaire de la maquette
const ACCESS_PASSWORD = "SECRETCORNER";

const accessGate = document.getElementById("accessGate");
const accessForm = document.getElementById("accessForm");
const sitePassword = document.getElementById("sitePassword");
const accessError = document.getElementById("accessError");

const welcomeModal = document.getElementById("welcomeModal");
const welcomeClose = document.getElementById("welcomeClose");
const welcomeContinue = document.getElementById("welcomeContinue");

// La session garde l'accès pendant la navigation
const hasAccess =
  sessionStorage.getItem("theCornerAccess") === "granted";

if (hasAccess) {
  accessGate.classList.add("is-hidden");
} else {
  body.classList.add("modal-open");

  setTimeout(() => {
    sitePassword.focus();
  }, 300);
}

function openWelcomeModal() {
  welcomeModal.classList.add("is-open");
  welcomeModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function closeWelcomeModal() {
  welcomeModal.classList.remove("is-open");
  welcomeModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredPassword = sitePassword.value.trim();

  if (enteredPassword === ACCESS_PASSWORD) {
    sessionStorage.setItem("theCornerAccess", "granted");

    accessError.textContent = "";
    accessGate.classList.remove("has-error");
    accessGate.classList.add("is-hidden");

    setTimeout(() => {
      openWelcomeModal();
    }, 500);

    return;
  }

  accessError.textContent =
    "Mot de passe incorrect. Essaie encore.";

  accessGate.classList.remove("has-error");

  // Relance l'animation si elle était déjà présente
  void accessGate.offsetWidth;

  accessGate.classList.add("has-error");
  sitePassword.select();
});

welcomeClose.addEventListener("click", closeWelcomeModal);
welcomeContinue.addEventListener("click", closeWelcomeModal);

welcomeModal.addEventListener("click", (event) => {
  if (event.target === welcomeModal) {
    closeWelcomeModal();
  }
});

const header = document.getElementById("siteHeader");
const mainNav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");

const conceptDetail = document.getElementById("conceptDetail");
const conceptNumber = document.getElementById("conceptNumber");
const conceptCategory = document.getElementById("conceptCategory");
const conceptTitle = document.getElementById("conceptTitle");
const conceptDescription = document.getElementById("conceptDescription");
const conceptAddress = document.getElementById("conceptAddress");
const conceptMood = document.getElementById("conceptMood");
const conceptImageOne = document.getElementById("conceptImageOne");
const conceptImageTwo = document.getElementById("conceptImageTwo");
const conceptImageLabel = document.getElementById("conceptImageLabel");

const locationTabs = document.querySelectorAll(".location-tab");

const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalAvailability = document.getElementById("modalAvailability");

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

/* DONNÉES DES CONCEPTS */

const locations = {
  arras: {
    number: "01 / ARRAS",
    category: "BARBER & CONCEPT STORE",
    title: "Le corner bleu.",
    description:
      "Un espace bleu électrique où la mode, le barber et l’expérience The Corner se retrouvent dans un même lieu.",
    address: "Arras",
    mood: "Urban / Premium",
    imageOne: "assets/arras-barber.jpg",
    imageTwo: "assets/arras-vetements.jpg",
    imageLabel: "ARRAS / 01"
  },

  bethune: {
    number: "02 / BÉTHUNE",
    category: "CONCEPT STORE",
    title: "Le corner orange.",
    description:
      "Un lieu chaleureux et énergique pensé pour découvrir les collections, les nouveautés et l’univers The Corner.",
    address: "Béthune",
    mood: "Warm / Dynamic",
    imageOne: "assets/bethune-interieur.jpg",
    imageTwo: "assets/bethune-vetements.jpg",
    imageLabel: "BÉTHUNE / 02"
  },

  montigny: {
    number: "03 / MONTIGNY",
    category: "BARBER & MODE",
    title: "Le corner vert.",
    description:
      "Un concept store reconnaissable par son identité verte, son espace mode et son ambiance de quartier.",
    address: "Montigny-en-Gohelle",
    mood: "Fresh / Local",
    imageOne: "assets/montigny-exterieur.jpg",
    imageTwo: "assets/montigny-interieur.jpg",
    imageLabel: "MONTIGNY / 03"
  }
};

/* MENU MOBILE */

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");

  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* HEADER AU SCROLL */

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 30);
});

/* CHANGEMENT DE CONCEPT */

function updateConcept(locationKey) {
  const location = locations[locationKey];

  if (!location) {
    return;
  }

  conceptDetail.classList.add("is-changing");

  setTimeout(() => {
    body.dataset.theme = locationKey;

    conceptNumber.textContent = location.number;
    conceptCategory.textContent = location.category;
    conceptTitle.textContent = location.title;
    conceptDescription.textContent = location.description;
    conceptAddress.textContent = location.address;
    conceptMood.textContent = location.mood;
    conceptImageOne.src = location.imageOne;
    conceptImageTwo.src = location.imageTwo;
    conceptImageOne.alt = `The Corner ${location.address}`;
    conceptImageTwo.alt = `Vêtements The Corner ${location.address}`;
    conceptImageLabel.textContent = location.imageLabel;

    locationTabs.forEach((tab) => {
      tab.classList.toggle(
        "is-active",
        tab.dataset.location === locationKey
      );
    });

    conceptDetail.classList.remove("is-changing");
  }, 180);
}

locationTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    updateConcept(tab.dataset.location);
  });
});

/* ANIMATIONS AU SCROLL */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* MODALE PRODUITS */

const products = {
  hoodie: {
    title: "Corner Hoodie",
    description:
      "Un hoodie essentiel inspiré de l’identité The Corner. Cette fiche présente la collection textile de manière temporaire.",
    category: "Collection The Corner / Essentials",
    availability: "Disponibilité et prix bientôt disponibles"
  },

  tshirt: {
    title: "Corner T-Shirt",
    description:
      "Un t-shirt graphique et minimal pensé pour représenter l’univers mode et lifestyle de The Corner.",
    category: "Collection The Corner / New Drop",
    availability: "Disponibilité et prix bientôt disponibles"
  }
};

function openProduct(productKey) {
  const product = products[productKey];

  if (!product) {
    return;
  }

  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalCategory.textContent = product.category;
  modalAvailability.textContent = product.availability;

  productModal.classList.add("is-open");
  productModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function closeProduct() {
  productModal.classList.remove("is-open");
  productModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    openProduct(button.dataset.product);
  });
});

modalClose.addEventListener("click", closeProduct);

productModal.addEventListener("click", (event) => {
  if (event.target === productModal) {
    closeProduct();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProduct();
    closeWelcomeModal();
  }
});
