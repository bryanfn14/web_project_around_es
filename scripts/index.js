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

initialCards.forEach((card) => {
  console.log(card.name);
});

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");
const closeProfilePopup = editProfilePopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

profileEditButton.addEventListener("click", handleOpenEditModal);

closeProfilePopup.addEventListener("click", function () {
  closeModal(editProfilePopup);
});

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-profile-form");
const editProfileName = editModal.querySelector(".popup__input_type_name");
const editProfileDescription = editModal.querySelector(
  ".popup__input_type_description",
);

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

editModal.addEventListener("submit", handleProfileFormSubmit);
