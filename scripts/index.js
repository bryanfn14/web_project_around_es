import { enableValidation, resetValidation } from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeProfilePopup = editProfilePopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const editModal = document.querySelector("#edit-profile-form");
const profileDescription = document.querySelector(".profile__description");
const editProfileName = editModal.querySelector(".popup__input_type_name");
const editProfileDescription = editModal.querySelector(
  ".popup__input_type_description",
);
const cardsContainer = document.querySelector(".cards__list");
const cardImagePopup = document.querySelector("#image-popup");
const closeImagePopup = cardImagePopup.querySelector(".popup__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const closeNewCardButton = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const editNewCardName = newCardForm.querySelector(
  ".popup__input_type_card-name",
);
const editNewCardLink = newCardForm.querySelector(".popup__input_type_url");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

let openedPopup = null;

function openModal(modal) {
  const formElement = modal.querySelector(".popup__form");
  modal.classList.add("popup_is-opened");
  if (formElement) {
    resetValidation(formElement);
  }
  openedPopup = modal;
}

function closeModal(modal) {
  const formElement = modal.querySelector(".popup__form");
  modal.classList.remove("popup_is-opened");
  if (formElement) {
    resetValidation(formElement);
    formElement.reset();
  }
  openedPopup = null;
}

function fillProfileForm() {
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;

  closeModal(editProfilePopup);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  function handleCardLikeBtn() {
    cardLikeBtn.classList.toggle("card__like-button_is-active");
  }

  function handleCardDeleteBtn() {
    cardElement.remove();
  }

  function handleCardImagePopup() {
    const imagePopup = cardImagePopup.querySelector(".popup__image");
    const captionPopup = cardImagePopup.querySelector(".popup__caption");

    imagePopup.src = link;
    imagePopup.alt = name;
    captionPopup.textContent = name;

    openModal(cardImagePopup);
  }

  cardLikeBtn.addEventListener("click", handleCardLikeBtn);

  cardDeleteBtn.addEventListener("click", handleCardDeleteBtn);

  cardImage.addEventListener("click", handleCardImagePopup);

  return cardElement;
}

function renderCard(name, link, cardsContainer) {
  const cardClone = getCardElement(name, link);
  cardsContainer.append(cardClone);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

function handleOpenCardModal() {
  openModal(newCardPopup);
}

function handleCloseCardModal() {
  closeModal(newCardPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardName = editNewCardName.value;
  const newCardLink = editNewCardLink.value;

  renderCard(newCardName, newCardLink, cardsContainer);

  closeModal(newCardPopup);
}

const setEventListeners = () => {
  addNewCardButton.addEventListener("click", handleOpenCardModal);

  closeNewCardButton.addEventListener("click", handleCloseCardModal);

  newCardForm.addEventListener("submit", handleCardFormSubmit);

  editModal.addEventListener("submit", handleProfileFormSubmit);

  closeImagePopup.addEventListener("click", function () {
    closeModal(cardImagePopup);
  });

  profileEditButton.addEventListener("click", handleOpenEditModal);

  closeProfilePopup.addEventListener("click", () => {
    closeModal(editProfilePopup);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && openedPopup !== null) {
      closeModal(openedPopup);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target === openedPopup) {
      closeModal(openedPopup);
    }
  });
  enableValidation();
};

setEventListeners();
