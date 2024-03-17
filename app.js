//Mobile Menu Start----------

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
//Mobile Menu End----------

//Table Start----------

const actionBtn = document.querySelectorAll(".actions-btn");
actionBtn.forEach((ele) => ele.addEventListener("click", showActionsCard));

function showActionsCard(e) {
	e.target.nextElementSibling.classList.toggle("show-actions");
	const modal = getModal();
	modal.addEventListener("click", () => {
		e.target.nextElementSibling.classList.toggle("show-actions");
	});
}

function removeItem(e) {
	removeModal(e);
}

//Table End----------

//Form Start----------

const newProductBtn = document.querySelector(".control__button--new");
newProductBtn.addEventListener("click", showForm);
const photoUpload = document.getElementById("photo");
photoUpload.addEventListener("change", showPhotoPreview);
const preview = document.getElementById("preview");

function showForm(e) {
	const modal = getModal();
	modal.style.background = "rgba(0, 0, 0, 0.661)";
	const form = document.querySelector(".form__card");
	form.style.display = "block";
	modal.addEventListener("click", keepFormAlive);
	modal.append(form);
}
function keepFormAlive(e) {
	if (e.target.classList.contains("modal")) {
		document.body.append(e.target.firstElementChild);
	}
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

//Form End----------

//Reusables Start----------

function getModal() {
	const modal = document.createElement("div");
	modal.classList.add("modal");
	document.body.prepend(modal);
	document.body.style.overflow = "hidden";
	modal.addEventListener("click", (e) => {
		removeModal(e);
	});
	return modal;
}

function removeModal(e) {
	if (e.target.classList.contains("modal")) {
		e.target.remove();
		document.body.style.overflow = "auto";
	}
}

//Reusable End----------
