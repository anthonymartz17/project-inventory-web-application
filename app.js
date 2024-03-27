//State

let isEditMode = false;
let productId = null;
const newProduct = {};
let inventoryList = [
	{
		id: "1-AMZ-APP",
		provider: "AMAZON",
		name: "Men's Cotton T-Shirt",
		brand: "NIKE",
		color: "Black",
		size: "Medium",
		price: 29.99,
		quantity_available: 100,
		category: "APPAREL",
		img: "./assets/Screenshot 2024-03-20 at 8.55.49 PM.png",
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
		category: "SHOES",
		img: "./assets/Screenshot 2024-03-20 at 8.57.10 PM.png",
	},
	{
		id: "3-ADI-ACC",
		provider: "ALIBABA",
		name: "Leather Wallet",
		brand: "Adidas",
		color: "Brown",
		size: "Universal",
		price: 39.99,
		quantity_available: 200,
		category: "ACCESSORIES",
		img: "./assets/Screenshot 2024-03-20 at 8.58.56 PM.png",
	},
];

const providerList = [
	{ id: "AMZ", name: "AMAZON" },
	{ id: "ALB", name: "ALIBABA" },
	{ id: "NK", name: "NIKE" },
	{ id: "ADI", name: "ADIDAS" },
];
const categoryList = [
	{ id: "SHO", name: "SHOES" },
	{ id: "APP", name: "APPAREL" },
	{ id: "ACC", name: "ACCESSORIES" },
];

//Queries
const searchBar = document.querySelector(".control__search");
searchBar.addEventListener("keyup", searchItem);
const filters = document.getElementById("filters");
const tableBody = document.querySelector("#table-body");
filters.addEventListener("change", applyFilter);

//On Created___________
window.addEventListener("load", () => {
	const year = document.getElementById("current-year");
	const currentYear = new Date();
	year.append(currentYear.getFullYear());

	if (inventoryList.length > 0) {
		inventoryList.forEach((ele) => {
			if (ele.img) {
			}
			const tableRow = createTableItem(ele);
			tableBody.append(tableRow);
		});
	} else {
		const tableBody = document.getElementById("table-body");
		tableBody.innerHTML = "";
		tableBody.innerText = "No products added";
		tableBody.style.textAlign = "center";
		tableBody.style.paddingTop = "2em";
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

function showActionsCard(e) {
	const lastRow = tableBody.childNodes[tableBody.childNodes.length - 1];
	const lastRowActionCard = lastRow.querySelector(".actions");
	lastRowActionCard.style.top = "-50px";

	e.target.nextElementSibling.classList.toggle("show-actions");
	const modal = getModal();
	modal.addEventListener("click", closeActionCard);
}
function getModal() {
	const modal = document.createElement("div");
	modal.classList.add("modal");
	document.body.prepend(modal);
	document.body.style.overflow = "hidden";
	return modal;
}

function closeActionCard() {
	document.querySelector(".modal").remove();
	document.querySelector(".show-actions").classList.toggle("show-actions");
	document.body.style.overflow = "auto";
}

function applyFilter(e) {
	let filtered = [];

	switch (e.target.value) {
		case "SHOES":
			filtered = inventoryList.filter((ele) => ele.category === "SHOES");
			break;
		case "APPAREL":
			filtered = inventoryList.filter((ele) => ele.category === "APPAREL");
			break;
		case "ACCESSORIES":
			filtered = inventoryList.filter((ele) => ele.category === "ACCESSORIES");
			break;
		case "AMAZON":
			filtered = inventoryList.filter((ele) => ele.provider === "AMAZON");

			break;
		case "ALIBABA":
			filtered = inventoryList.filter((ele) => ele.provider === "ALIBABA");

			break;
		case "NIKE":
			filtered = inventoryList.filter((ele) => ele.provider === "NIKE");
			break;
		case "ADIDAS":
			filtered = inventoryList.filter((ele) => ele.provider === "ADIDAS");
			break;
		case "instock":
			filtered = inventoryList.filter((ele) => ele.quantity_available > 0);

			break;
		case "outOfStock":
			filtered = inventoryList.filter((ele) => ele.quantity_available === 0);
			break;
		case "priceLowHigh":
			filtered = [...inventoryList].sort((a, b) => a.price - b.price);
			break;
		case "priceHighLog":
			filtered = [...inventoryList].sort((a, b) => b.price - a.price);
			break;

		default:
			filtered = inventoryList;
	}

	if (filtered.length === 0) {
		tableBody.innerHTML = `No products found under ${e.target.value}`;
		tableBody.style.textAlign = "center";
		tableBody.style.paddingTop = "1em";
	} else {
		tableBody.innerHTML = "";
		filtered.forEach((ele) => {
			const tableRow = createTableItem(ele);
			tableBody.append(tableRow);
		});
	}
}

function searchItem(e) {
	const searchWord = e.target.value.toLowerCase();
	tableBody.innerHTML = "";
	const filteredList = inventoryList.filter((ele) =>
		Object.values(ele).some((item) =>
			String(item).toLocaleLowerCase().includes(searchWord)
		)
	);
	if (filteredList.length === 0) {
		tableBody.innerHTML = `No products found under - "${e.target.value}"`;
		tableBody.style.textAlign = "center";
		tableBody.style.paddingTop = "1em";
	} else {
		filteredList.forEach((ele) => {
			const tableRow = createTableItem(ele);
			tableBody.append(tableRow);
		});
	}
}

//Table End----------

//Form Start----------

const newProductBtn = document.querySelector(".control__button--new");
const form = document.querySelector(".form__form");
form.addEventListener("submit", handleSubmit);
newProductBtn.addEventListener("click", showForm);
const photoUpload = document.getElementById("photo");
const preview = document.getElementById("preview");
photoUpload.addEventListener("change", (e) => {
	const file = e.target.files[0];
	const appendTo = preview;
	return showPhotoPreview(file, appendTo);

});

function showForm(e, id) {
	if (id) {
		isEditMode = true;
		productId = id;
		const product = inventoryList.find((ele) => ele.id === id);
		setSelectedProductOnForm(product);
	}

	document.body.style.overflow = "hidden";
	const form = document.querySelector(".form__modal");

	form.style.display = "flex";
	const cancelBtn = document.querySelector(".btn__cancel");
	cancelBtn.addEventListener("click", closeForm);
}

function closeForm(e) {
	const classList = ["form__modal", "btn__cancel", "form__card", "btn__submit"];

	if (classList.some((ele) => e.target.classList.contains(ele))) {
		e.target.closest(".form__modal").style.display = "none";
		document.body.style.overflow = "auto";
		form.reset();
		preview.innerHTML = `
		<i class="fa-solid fa-file-arrow-up upload-icon"></i>
		<span style="display: block">Upload File</span>
		`;
		e.stopPropagation();
	}
}

function setSelectedProductOnForm(data) {
	document.getElementById("name").value = data.name;
	document.getElementById("qty").value = data.quantity_available;
	document.getElementById("provider").value = data.provider;
	document.getElementById("category").value = data.category;
	document.getElementById("brand").value = data.brand;
	document.getElementById("color").value = data.color;
	document.getElementById("size").value = data.size;
	document.getElementById("price").value = data.price;
	if (data.file) {
		showPhotoPreview(data.file, preview);
	} else {
		const img = createImg(data.img);
		preview.innerHTML = "";
		preview.append(img);
	}
}

function showPhotoPreview(file, appendTo) {
	const reader = new FileReader();
	reader.onload = (e) => {
		newProduct.file = file;
		if (file.name) {
			const img = createImg(e.target.result);
			appendTo.innerHTML = "";
			appendTo.append(img);
		}
	};
	reader.readAsDataURL(file);
}

function createImg(imgSrc) {
	const img = document.createElement("img");
	img.classList.add("photo-uploaded");
	img.src = imgSrc;
	img.alt = "Preview";

	return img;
}

function clearPreview() {
	const previewsPhoto = document.querySelector(".photo-uploaded");
	if (previewsPhoto) {
		previewsPhoto.remove();
	}
}

function handleSubmit(e) {
	e.preventDefault();
	const product = getFormValues(e);
	if (isEditMode) {
		updateProduct(product, productId);
	} else {
		product.id = generateId(product.provider, product.category);
		inventoryList.push(product);
		const tableRow = createTableItem(product);
		tableBody.append(tableRow);
	}

	closeForm(e);
	isEditMode = false;
	productId = null;
}

function getFormValues(e) {
	newProduct.provider = e.target.provider.value;
	newProduct.category = e.target.category.value;
	newProduct.name = e.target.name.value;
	newProduct.brand = e.target.brand.value;
	newProduct.color = e.target.color.value;
	newProduct.size = e.target.size.value;
	newProduct.price = e.target.price.value;
	newProduct.quantity_available = e.target.qty.value;

	return newProduct;
}

function generateId(provider, category) {

	const prov = providerList.find((ele) => ele.name === provider);
	const cat = categoryList.find((ele) => ele.name === category);
	return `${inventoryList.length + 1}-${prov.id}-${cat.id}`;
}

function updateProduct(product, id) {
	const productToUpdate = inventoryList.find((ele) => ele.id === id);
	Object.assign(productToUpdate, product);
	updateDom(productToUpdate);
}

function updateDom(product) {
	const row = document.getElementById(product.id);
	row.querySelector("#td_name").innerText = product.name;
	row.querySelector("#td_brand").innerText = product.brand;
	row.querySelector("#td_provider").innerText = product.provider;
	row.querySelector("#td_price").innerText = product.price;
	row.querySelector("#td_quantity_available").innerText =
		product.quantity_available;
	row.querySelector("#td_status").innerText =
		product.quantity_available > 0 ? "In Stock" : "Out of Stock";
}

function createTableItem(item) {
	const itemList = [
		{ innerText: item.id },
		{ innerText: item.name, tableData_id: "td_name" },
		{ innerText: item.brand, tableData_id: "td_brand" },
		{ innerText: item.provider, tableData_id: "td_provider" },
		{
			innerText: item.quantity_available,
			tableData_id: "td_quantity_available",
		},
		{ innerText: item.price, tableData_id: "td_price" },
		{
			innerText: item.quantity_available > 0 ? "In Stock" : "Out of Stock",
			tableData_id: "td_status",
		},
	];

	const tableRow = document.createElement("tr");
	tableRow.classList.add("table__row", "table__row--body");
	tableRow.id = item.id;
	const tdImg = document.createElement("td");
	tdImg.id = "td_img";
	if (item.file) {
		showPhotoPreview(item.file, tdImg);
	} else {
		const img = createImg(item.img);
		tdImg.append(img);
	}
	tableRow.append(tdImg);

	itemList.forEach((ele) => {
		const tableData = document.createElement("td");
		tableData.innerText = ele.innerText;
		if (ele.tableData_id) {
			tableData.id = ele.tableData_id;
		}
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
	editBtn.addEventListener("click", closeActionCard);
	const editIcon = document.createElement("i");
	editIcon.classList.add("fa-regular", "fa-pen-to-square");
	editBtn.append(editIcon);
	editBtn.append("Edit");

	const delBtn = document.createElement("p");
	delBtn.classList.add("actions__items");
	delBtn.addEventListener("click", closeActionCard);
	delBtn.addEventListener("click", (e) =>
		removeProduct(e.target.closest(".table__row").id)
	);
	const delIcon = document.createElement("i");
	delIcon.classList.add("fa-solid", "fa-trash-can");
	delBtn.append(delIcon);
	delBtn.append("Delete");

	actionsCard.append(editBtn);
	actionsCard.append(delBtn);

	tableData.append(actionsCard);

	tableRow.append(tableData);
	return tableRow;
}

function removeProduct(id) {
	inventoryList = inventoryList.filter((ele) => ele.id !== id);
	document.getElementById(id).remove();
	if (inventoryList.length === 0) {
		tableBody.innerHTML = "No products added";
		tableBody.style.textAlign = "center";
		tableBody.style.paddingTop = "1em";
	}
}
//Form End----------
