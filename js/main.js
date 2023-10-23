// select Element
let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let submit = document.querySelector(".submit");
let btnDelete = document.querySelector(".deleteAll");
let searchInput = document.querySelector(".search")
let tbody = document.querySelector(".tbody")


let dataProduct = [];
let table;
let temp;
let mood = "create";
let searchMood = "title";

// get total
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#51025f";
    }
}

// create product
if (window.localStorage.getItem("product")) {
    dataProduct = JSON.parse(window.localStorage.getItem("product"));
    showData();
}
submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if (title.value != "" && price.value != "" && category.value != "") {
        if (mood === "create") {
            if (+count.value > 1 && +count.value <= 50) {
                for (let i = 0; i < +count.value; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[temp] = newProduct;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block";
        }
        clearData();
    }
    window.localStorage.setItem("product", JSON.stringify(dataProduct));
    showData();
};

// clear data inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// show Data the page
function showData() {
    table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick = "updateData(${i})" class="update">Update</button></td>
        <td><button onclick = "deleteData(${i})" class="delete">Delete</button></td>
        </tr>`;
    }
    tbody.innerHTML = table;
    if (dataProduct.length > 0) {
        btnDelete.innerHTML = `DeleteAll (${dataProduct.length})`;
        btnDelete.style.display = "block";
    } else {
        btnDelete.style.display = "none";
    }
    getTotal();
}

// delete product
function deleteData(item) {
    dataProduct.splice(item, 1);
    window.localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// update Product
function updateData(item) {
    title.value = dataProduct[item].title;
    price.value = dataProduct[item].price;
    taxes.value = dataProduct[item].taxes;
    ads.value = dataProduct[item].ads;
    discount.value = dataProduct[item].discount;
    category.value = dataProduct[item].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "UpDate";
    mood = "update";
    temp = item;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// delete all
btnDelete.onclick = function () {
    window.localStorage.clear();
    dataProduct = [];
    showData();
};

// search product
function getSearchMood(Id) {
    if (Id == "searchTitle") {
        searchMood = "title"
    } else if (Id == "searchCategory") {
        searchMood = "category"
    }
    searchInput.placeholder = `Search By ${searchMood}`
    searchInput.focus();
    searchInput.value = "";
    showData()
}

// search with by start writing
searchInput.oninput = function () {
    table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == "title") {
            if (dataProduct[i].title.toLowerCase().includes(this.value.toLowerCase())) {
                table += `<tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick = "updateData(${i})" class="update">Update</button></td>
                    <td><button onclick = "deleteData(${i})" class="delete">Delete</button></td>
                </tr>`;
            }
        } else if (searchMood == "category") {
            if (dataProduct[i].category.toLowerCase().includes(this.value.toLowerCase())) {
                table += `<tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick = "updateData(${i})" class="update">Update</button></td>
                    <td><button onclick = "deleteData(${i})" class="delete">Delete</button></td>
                </tr>`;
            }
        }
    }
    tbody.innerHTML = table;
}