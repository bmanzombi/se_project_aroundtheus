const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// wrapper//
const cardswrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardModal = document.querySelector("#add-card-modal");
const profileFormElement = document.forms["profile-edit-form"];
const addCardFormElement = addCardModal.querySelector(".modal__form");
const imageModal = document.querySelector("#image-modal");
const modalImageEl = document.querySelector(".modal__image");
const modalImageCaption = document.querySelector(".modal__image-caption");
// Buttons adn other DOM note

const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
// const addCardModalSubmitButton = addCardModal.querySelector(".modal__button");
const imageModalCloseButton = imageModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// forms data
const nameInput = profileFormElement.querySelector("#profile-title-input");
const jobInput = profileFormElement.querySelector("#profile-description-input");
// const profileEditButton = document.querySelector("#profile-edit-button");

// const profileEditForm = document.forms["profile-edit-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  //set the src of the image element to the link of the card
  //set the alt of the image element to the name of the card

  //querySelect the likebutton
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = cardData.link;
    modalImageEl.alt = cardData.name;
    modalImageCaption.textContent = cardData.name;
    openModal(imageModal);
  });

  //add an event listener to the like button so that when you click it, it toggles the card__like-button_active class on and off

  const cardElementDelete = cardElement.querySelector(".card__delete-button");
  cardElementDelete.addEventListener("click", () => {
    cardElement.remove();
    /*cardImageEl.alt = cardData.name;*/
  });
  return cardElement;
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditModal);
}
profileFormElement.addEventListener("submit", handleProfileEditFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardswrap);
  closeModal(addCardModal);
  evt.target.reset();
}
// set an event listener on the card form
// submit listener
// pass it handleaddCardSFormubmit
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

// set up event listener for add modal close button
profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

//add new card//

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

initialCards.forEach((cardData) => {
  cardswrap.prepend(getCardElement(cardData));
});
