//State
const inventoryList = [
	{
		id: "1-AMZN-APP",
		provider: "AMAZON",
		name: "Men's Cotton T-Shirt",
		brand: "NIKE",
		color: "Black",
		size: "Medium",
		price: 29.99,
		quantity_available: 100,
		material: "Cotton",
		gender: "Men",
	},
	{
		id: "2-NK-SHO",
		provider: "NIKE",
		name: "Women's Running Shoes",
		brand: "NIKE",
		color: "Blue",
		size: "8",
		price: 59.99,
		quantity_available: 50,
		material: "Mesh",
		gender: "Women",
	},
	{
		id: "3-ADI-ACC",
		provider: "ALIBABA",
		name: "Leather Wallet",
		brand: "Addidas",
		color: "Brown",
		size: "Universal",
		price: 39.99,
		quantity_available: 200,
		material: "Genuine Leather",
		gender: "Men",
	},
];

const provider = [
	{ id: "AMZN", name: "AMAZON" },
	{ id: "ALBB", name: "ALIBABA" },
	{ id: "NK", name: "NIKE" },
	{ id: "ADI", name: "ADDIDAS" },
];
const category = [
	{ id: "SHO", name: "Shoes" },
	{ id: "APP", name: "Apparel" },
	{ id: "ACC", name: "Accessories" },
];

//On Created___________
window.addEventListener("load", () => {
	if (inventoryList.length > 0) {
		inventoryList.forEach((ele) => createTableItem(ele));
  } else {
    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML = "No products added"
  }
});

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

// const actionBtn = document.querySelectorAll(".actions-btn");
// actionBtn.forEach((ele) => ele.addEventListener("click", showActionsCard));

function showActionsCard(e) {
	e.target.nextElementSibling.classList.toggle("show-actions");
	const modal = getModal();
	modal.addEventListener("click", () => {
		e.target.nextElementSibling.classList.toggle("show-actions");
	});
}

function createTableItem(item) {
	const itemList = [
		item.id,
		item.name,
		item.brand,
		item.provider,
		item.quantity_available,
		item.price,
		item.quantity_available > 0 ? "In Stock" : "Out of Stock",
	];

	const tableRow = document.createElement("tr");
	tableRow.classList.add("table__row", "table__row--body");

	itemList.forEach((ele) => {
		const tableData = document.createElement("td");
		tableData.innerText = ele;
		tableRow.append(tableData);
	});

	const tableData = document.createElement("td");
	tableData.classList.add("table__row--actions");
	const dotIcon = document.createElement("i");
	dotIcon.classList.add("fa-solid", "fa-ellipsis", "actions-btn");
	dotIcon.addEventListener("click", showActionsCard);
	tableData.append(dotIcon);

	const actionsCard = document.createElement("div");
	actionsCard.classList.add("actions");

	const editBtn = document.createElement("p");
	editBtn.classList.add("actions__items");
	editBtn.addEventListener("click", (e) => showForm(e, item.id));
	const editIcon = document.createElement("i");
	editIcon.classList.add("fa-regular", "fa-pen-to-square");
	editBtn.append(editIcon);
	editBtn.append("Edit");

	const delBtn = document.createElement("p");
	delBtn.classList.add("actions__items");
	delBtn.addEventListener("click", (e) => showForm(e, item.id));
	const delIcon = document.createElement("i");
	delIcon.classList.add("fa-solid", "fa-trash-can");
	delBtn.append(delIcon);
	delBtn.append("Delete");

	actionsCard.append(editBtn);
	actionsCard.append(delBtn);

	tableData.append(actionsCard);

	tableRow.append(tableData);

	const tableBody = document.getElementById("table-body");
	tableBody.append(tableRow);
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
	const cancelBtn = document.querySelector(".btn__cancel");
	cancelBtn.addEventListener("click", removeModal);
	cancelBtn.addEventListener("click", (e) => keepFormAlive(e, form));
	modal.addEventListener("click", (e) => keepFormAlive(e, form));
	modal.append(form);
}
function keepFormAlive(e, form) {
	if (
		e.target.classList.contains("modal") ||
		e.target.classList.contains("btn__cancel")
	) {
		document.body.append(form);
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
	}
	if (e.target.classList.contains("btn__cancel")) {
		e.target.closest(".modal").remove();
		e.stopPropagation();
	}
	document.body.style.overflow = "auto";
}

//Reusable End----------
