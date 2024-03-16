//mobile menue
const mobileMenu = document.querySelector(".mobile__menu");
const mobileMenuItems = document.querySelectorAll(".navigation__item--mobile");

const backdrop = document.querySelector(".mobile__backdrop");
backdrop.addEventListener("click", toggleMobileMenu);

const mobileMenuBtn = document.querySelector(".fa-bars");
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

mobileMenuItems.forEach((ele) =>
	ele.addEventListener("click", toggleMobileMenu)
);

function toggleMobileMenu() {
	mobileMenu.classList.toggle("mobile__menu--show");
	backdrop.classList.toggle("mobile__backdrop--active");
}

//table
const actionBtn = document.querySelectorAll(".actions-btn");
actionBtn.forEach((ele) => ele.addEventListener("click", showActionsCard));

//form

// const photoUpload = document.getElementById("photo");
// const preview = document.getElementById("preview");
// photoUpload.addEventListener("change", showPhotoPreview);
const newProductBtn = document.querySelector(".control__button--new");
newProductBtn.addEventListener("click", showForm);

//functions

function showActionsCard(e) {
	const actionsCard = document.querySelector(".actions");
	actionsCard.classList.toggle("show-actions");
	const modal = getModal();
	modal.addEventListener("click", (e) => {
		actionsCard.classList.toggle("show-actions");
		removeModal();
	});
}

function getModal() {
	const modal = document.createElement("div");
	modal.classList.add("modal");
	document.body.prepend(modal);
	document.body.style.overflow = "hidden";
	return modal;
}

function removeModal(e) {

  const modal = document.body.querySelector(".modal");
	if (modal) {
		const form = modal.querySelector(".form__card");
		if (form) {
			document.body.append(form);
		}
		modal.remove();
		document.body.style.overflow = "auto";
	}
}
function removeItem(e) {
	removeModal(e);
}

function showPhotoPreview(e) {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = (e) => {
		if (file.name) {
			const img = createImg(e);
			preview.innerHTML = "";
			preview.append(img);
		}
	};
	reader.readAsDataURL(file);
}
function createImg(e) {
	const img = document.createElement("img");
	img.classList.add("photo-uploaded");
	img.src = e.target.result;
	img.alt = "Preview";

	return img;
}
function clearPreview() {
	const previewsPhoto = document.querySelector(".photo-uploaded");
	if (previewsPhoto) {
		previewsPhoto.remove();
	}
}

function showForm(e) {
  const modal = getModal();
  modal.style.background = 'rgba(0, 0, 0, 0.661)';
	const form = document.querySelector(".form__card");
	form.style.display = "block";
	modal.addEventListener("click", removeModal);
	modal.append(form);
}
