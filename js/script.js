var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var count = document.getElementById("count");
var category = document.getElementById("category");
var btnCreate = document.getElementById("btnCreate");
var search = document.getElementById("search");
var btnSearchTitle = document.getElementById("btnSearchTitle");
var btnSearchCatg = document.getElementById("btnSearchCatg");
var tbody = document.getElementById("tbody");
var btnDeleteAll = document.getElementById("deleteAll");
let mode = "create";
let value;
//////////////////////////////////////////////////////////////
// console.log(title,price,taxes,ads,discount,total,count,category,btnCreate,search,btnSearchTitle,btnSearchCatg);

// count total
let result = "";
function getTotal() {
  if (price.value != "") {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#12b512";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#970606";
  }
}
// create Items and save they in local storage
var arrProd;
if (localStorage.products != null) {
  arrProd = JSON.parse(localStorage.products);
} else {
  arrProd = [];
}
function addItems() {
  if (title.value != "" && price.value != "" && category.value != "") {
    let objProd = {
      titles: title.value.toLowerCase(),
      prices: price.value,
      taxe: taxes.value,
      adv: ads.value,
      disc: discount.value,
      tot: total.innerHTML,
      counts: count.value,
      categories: category.value.toLowerCase(),
    };
    //count
    if (mode === "create") {
      if (objProd.counts > 1) {
        for (var i = 0; i < objProd.counts; i++) {
          arrProd.push(objProd);
        }
      } else {
        arrProd.push(objProd);
      }
    } else {
      arrProd[value] = objProd;
      count.style.display = "block";
      btnCreate.innerHTML = "Create";
      mode = "create";
    }
    localStorage.setItem("products", JSON.stringify(arrProd));
  } else {
    console.log("wrong, you had one or more inputs were empty");
  }
  clearItems();
  readProd();
}
btnCreate.addEventListener("click", addItems);
// clear inputs
function clearItems() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// Read
var table;
function readProd() {
  getTotal();
  table = ""; // Clear the table content before rebuilding it
  for (var i = 0; i < arrProd.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${arrProd[i].titles}</td>
        <td>${arrProd[i].prices}</td>
        <td>${arrProd[i].taxe}</td>
        <td>${arrProd[i].adv}</td>
        <td>${arrProd[i].disc}</td>
        <td>${arrProd[i].tot}</td>
        <td>${arrProd[i].categories}</td>
        <td><button onclick="updateItems(${i})" class="update">update</button></td>
        <td><button onclick="deleteItem(${i})" class="delete">delete</button></td>
      </tr>
    `;
  }
  tbody.innerHTML = table;
  if (arrProd.length > 0) {
    btnDeleteAll.style.display = "block";
  } else {
    btnDeleteAll.style.display = "none";
  }
}
readProd();
//delete just one item
function deleteItem(index) {
  arrProd.splice(index, 1);
  localStorage.products = JSON.stringify(arrProd);
  readProd();
}
//delete all data
function deleteAll() {
  arrProd = [];
  localStorage.products = JSON.stringify(arrProd);
  readProd();
}
//update the items
function updateItems(index) {
  title.value = arrProd[index].titles;
  price.value = arrProd[index].prices;
  taxes.value = arrProd[index].taxe;
  ads.value = arrProd[index].adv;
  discount.value = arrProd[index].disc;
  getTotal();
  category.value = arrProd[index].categories;
  count.style.display = "none";
  btnCreate.innerHTML = "Update";
  mode = "update";
  value = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let mood;
function getMood(id) {
  if (id == "btnSearchTitle") {
    mood = "Search By Title";
  } else {
    mood = "Search By Category";
  }
  search.placeholder = "Search By" + mood;
  search.focus();
  search.value = "";
  readProd();
}
function searchItems(value) {
  let table = "";
  for (var i = 0; i < arrProd.length; i++) {
    if (
      mood === "Search By Title" &&
      arrProd[i].titles.toLowerCase().includes(value.toLowerCase())
    ) {
      table += `
      <tr>
        <td>${i + 1}</td>
        <td>${arrProd[i].titles}</td>
        <td>${arrProd[i].prices}</td>
        <td>${arrProd[i].taxe}</td>
        <td>${arrProd[i].adv}</td>
        <td>${arrProd[i].disc}</td>
        <td>${arrProd[i].counts}</td>
        <td>${arrProd[i].categories}</td>
        <td><button onclick="updateItems(${i})" class="update">update</button></td>
        <td><button onclick="deleteItem(${i})" class="delete">delete</button></td>
      </tr>
    `;
    } else if (
      mood === "Search By Category" &&
      arrProd[i].categories.toLowerCase().includes(value.toLowerCase())
    ) {
      table += `
      <tr>
        <td>${i + 1}</td>
        <td>${arrProd[i].titles}</td>
        <td>${arrProd[i].prices}</td>
        <td>${arrProd[i].taxe}</td>
        <td>${arrProd[i].adv}</td>
        <td>${arrProd[i].disc}</td>
        <td>${arrProd[i].counts}</td>
        <td>${arrProd[i].categories}</td>
        <td><button onclick="updateItems(${i})" class="update">update</button></td>
        <td><button onclick="deleteItem(${i})" class="delete">delete</button></td>
      </tr>
    `;
    }
  }
  tbody.innerHTML = table;
}
