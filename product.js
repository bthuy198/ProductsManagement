class Product {
    constructor(id, name, img, sku, condition, location, price, modified) {
        this.id = id;
        this.name = name;
        this.image = img;
        this.sku = sku;
        this.condition = condition;
        this.location = location;
        this.price = price;
        this.modified = modified;
    }
}

var totalPages = 0;
var paginationLimit = 5;
var currentPage = 1;

var checked_list = [];

var conditions = [
    'New',
    'Second hand'
];

var locations = [
    'Warehouse 1',
    'Warehouse 2',
    'Warehouse 3',
]

var products = [];

const products_db = 'products_db';
function init() {
    if (localStorage.getItem(products_db) == null) {
        products = [
            new Product(1, 'Dior Lip Glow', 'https://www.sephora.com/productimages/sku/s2316230-main-zoom.jpg?imwidth=612', 0001, 'New', 'Warehouse 1', 40, '2022-07-05'),
            new Product(2, 'NARS Creamy Concealer ', 'https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg?imwidth=612', 0201, 'New', 'Warehouse 2', 30, '2022-08-19'),
            new Product(3, 'Yves Saint Laurent Lipstick Balm', 'https://www.sephora.com/productimages/sku/s2511228-main-zoom.jpg?imwidth=612', 2001, 'New', 'Warehouse 3', 50, '2022-02-02'),
            new Product(4, 'Sulwhasoo Perfecting Cushion', 'https://vn-test-11.slatic.net/p/85c8d085c99da4a756975f413e47667d.jpg', 201, 'New', 'Warehouse 3', 100, '2021-03-02'),
            new Product(5, 'HUDA BEAUTY Eyeshadow Palette', 'https://www.sephora.com/productimages/sku/s2288090-main-zoom.jpg?imwidth=612', 267, 'New', 'Warehouse 2', 29, '2022-01-01'),
            new Product(6, 'KIKO Cosmetics Mascara', 'https://images.kikocosmetics.com/sys-master/images/hf4/h05/11889979686942/KC000000310001Bprincipale_900Wx900H', 456, 'New', 'Warehouse 2', 10, '2022-10-10')
        ];
        localStorage.setItem(products_db, JSON.stringify(products));
    }
    else {
        products = JSON.parse(localStorage.getItem(products_db));
    }
}

function renderTable() {
    let tbProduct = '';
    products.forEach(function (product) {
        tbProduct += `<tr>
                            <td><input class='check-box' id="checkbox_${product.id}" name='checkbox_${product.id}' type="checkbox" onchange='selectProducts(${product.id})'></td>
                            <td id='img_${product.id}'><img src="${product.image}" alt=""
                                    width="60">
                            </td>
                            <td id='name_${product.id}'>${product.name}</td>
                            <td id='sku_${product.id}'>${product.sku}</td>
                            <td id='condition_${product.id}'>${product.condition}</td>
                            <td id='location_${product.id}'>${product.location}</td>
                            <td id='price_${product.id}'>$ ${product.price}</td>
                            <td id='modified_${product.id}'>${product.modified}</td>
                    </tr>`
    })
    document.querySelector('.table>tbody').innerHTML = tbProduct;
}

//render location
function renderLocation() {
    let htmls = locations.map(function (value) {
        return `<option style="font-weight:bold;" value="${value}">${value}</option>`
    })
    document.getElementById('locations').innerHTML = htmls.join('');
}
//render location modal
function renderLocationModal() {
    let htmls = locations.map(function (value) {
        return `<option value="${value}">${value}</option>`
    })
    document.getElementById('modal_locations').innerHTML = htmls.join('');
}
//render condition
function renderCondition() {
    let htmls = conditions.map(function (value) {
        return `<option style="font-weight:bold;" value="${value}">${value}</option>`
    })
    document.getElementById('conditions').innerHTML = htmls.join('');
}

//render condition modal
function renderConditionModal() {
    let htmls = conditions.map(function (value) {
        return `<option value="${value}">${value}</option>`
    })
    document.getElementById('modal_conditions').innerHTML = htmls.join('');
}

function add() {
    let name = document.getElementById('productName').value;
    if (isEmpty(name)) {
        alert('Please enter information');
        return;
    }
    let id = getMaxId() + 1;
    let image = document.getElementById('image').value;
    if (isEmpty(image)) {
        alert('Please enter information');
        return;
    }
    let sku = document.getElementById('sku').value;
    if (isEmpty(sku)) {
        alert('Please enter information');
        return;
    }
    let location = document.getElementById('locations').value;
    if (isEmpty(location)) {
        alert('Please enter information');
        return;
    }
    let condition = document.getElementById('conditions').value;
    if (isEmpty(condition)) {
        alert('Please enter information');
        return;
    }
    let price = document.getElementById('price').value;
    if (isEmpty(price)) {
        alert('Please enter information');
        return;
    }
    let modified = document.getElementById('modified').value;
    if (isEmpty(modified)) {
        alert('Please enter information');
        return;
    }
    products.push(new Product(id, name, image, sku, condition, location, price, modified));

    renderTable();
    localStorage.setItem(products_db, JSON.stringify(products))
    resetAddForm();
}


function getMaxId() {
    let max = 0;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id > max) {
            max = products[i].id;
        }
    }
    return max;
}

function isEmpty(value) {
    return value == null || value.trim() == '';
}

function resetAddForm() {
    document.getElementById('productName').value = '';
    document.getElementById('image').value = '';
    document.getElementById('sku').value = '';
    document.getElementById('locations').value = '';
    document.getElementById('conditions').value = '';
    document.getElementById('price').value = '';
    document.getElementById('modified').value = '';
}

function selectAllProducts() {
    if (document.querySelector('#selectAllProducts').checked) {
        checked_list = [];
        for (let i = 0; i < products.length; i++) {
            checked_list.push(products[i].id);
            document.getElementById(`checkbox_${products[i].id}`).checked = true;
        }
    }
    else {
        for (let i = 0; i < products.length; i++) {
            checked_list = [];
            document.getElementById(`checkbox_${products[i].id}`).checked = false;
        }
    }
    console.log(checked_list);
}

function selectProducts(productId) {
    if (checked_list.includes(productId)) {
        checked_list = checked_list.filter(function (id) {
            return id != productId;
        })
    }
    else {
        checked_list.push(productId);
        // return;
    }
    document.querySelector('#selectAllProducts').checked = false;

    let n = checked_list.length;
    if (n === products.length) {
        document.querySelector('#selectAllProducts').checked = true;
        selectAllProducts();
    }

    console.log(checked_list);
}
//delete
function remove() {
    if (checked_list.length == 0) {
        alert('Please choose one to remove');
    }
    else {
        let confirmed = confirm('Are your sure to delete this?');
        if (confirmed) {
            for (let id of checked_list) {
                products = products.filter(function (product) {
                    return product.id != id;
                })
                localStorage.setItem(products_db, JSON.stringify(products));
                renderTable();
                checked_list = [];
                document.querySelector('#selectAllProducts').checked = false;
            }
        } else {
            document.querySelectorAll('.check-box').checked = false;
        }
    }
}

//edit
function edit() {
    if (checked_list.length == 0) {
        alert('Please choose one to edit');
        return; //== return undefined
    }
    if (checked_list.length > 1 || checked_list.length == products.length) {
        alert('Please choose ONE to edit');
        // checked_list = [];
        // document.querySelector('#selectAllProducts').click();
        // selectAllProducts();
        console.log(checked_list);
        return;
    }
    document.querySelector('.edit-modal').classList.remove('d-none');
    renderConditionModal();
    renderLocationModal();
    let id = checked_list[0];
    let product = products.find(function (product) {
        return product.id == id;
    })

    document.querySelector('#modal_productName').value = product.name;
    document.querySelector('#modal_image').value = product.image;
    document.querySelector('#modal_sku').value = product.sku;
    document.querySelector('#modal_conditions').value = product.condition;
    document.querySelector('#modal_locations').value = product.location;
    document.querySelector('#modal_price').value = product.price;
    document.querySelector('#modal_modified').value = product.modified;

}

function cancel() {
    checked_list = [];
    document.querySelector('.edit-modal').classList.add('d-none');
    start();
}

function saveChange() {
    let id = checked_list[0];
    let product = products.find(function (product) {
        return product.id == id;
    })

    product.name = document.querySelector('#modal_productName').value;
    product.image = document.querySelector('#modal_image').value;
    product.sku = document.querySelector('#modal_sku').value;
    product.condition = document.querySelector('#modal_conditions').value;
    product.location = document.querySelector('#modal_locations').value;
    product.price = document.querySelector('#modal_price').value;
    product.modified = document.querySelector('#modal_modified').value;

    localStorage.setItem(products_db, JSON.stringify(products));
    checked_list = [];
    renderTable();
    document.querySelector('.edit-modal').classList.add('d-none');
}


function searchByName() {
    let searchWord = document.getElementById('search').value;
    searchWord = searchWord.trim().toLowerCase();
    // let productArray = [];
    let resultSearch = [];
    // productArray = JSON.parse(window.localStorage.getItem(product_db));
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchWord)) {
            resultSearch.push(products[i].id);
        }
    }
    if (searchWord == null || searchWord == '') {
        renderTable();
        return;
    } else {
        renderSearchList(resultSearch);
        document.getElementById('search').value = '';
    }

}
function renderSearchList(productIdArray) {
    let tbSearchResult = '';
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < productIdArray.length; j++) {
            if (productIdArray[j] === products[i].id) {
                tbSearchResult += `<tr>
                                        <td><input class='check-box' id="checkbox_${products[i].id}" name='checkbox_${products[i].id}' type="checkbox" onchange='selectProducts(${products[i].id})'></td>
                                        <td id='img_${products[i].id}'><img src="${products[i].image}" alt=""
                                                width="40">
                                        </td>
                                        <td id='name_${products[i].id}'>${products[i].name}</td>
                                        <td id='sku_${products[i].id}'>${products[i].sku}</td>
                                        <td id='condition_${products[i].id}'>${products[i].condition}</td>
                                        <td id='location_${products[i].id}'>${products[i].location}</td>
                                        <td id='price_${products[i].id}'>$ ${products[i].price}</td>
                                        <td id='modified_${products[i].id}'>${products[i].modified}</td>
                                    </tr>`
            }
        }
    }
    document.querySelector('.table>tbody').innerHTML = tbSearchResult;
}


// function renderPagination() {
//     totalPages = Math.ceil(products.length / paginationLimit);
//     let paginationString = '';
//     for (let page = 1; page <= totalPages; page++) {
//         paginationString += `<button id="btn-pagination${page}" class= '${page == currentPage ? 'active' : ''}' onclick="goToPage(${page})">${page}</button>`
//     }
//     document.getElementById('pagination-number').innerHTML = paginationString;
//     console.log(totalPages);
// }

// function goToPage(page) {
//     currentPage = page;
//     renderTable();
// }

function start() {
    init();
    renderCondition();
    renderLocation();
    renderTable();
    // renderPagination();
    // searchByName();
}


start();