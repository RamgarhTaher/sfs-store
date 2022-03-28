
console.log(localStorage.getItem('UserCart'));

// my variables...
const cancelbtn = document.getElementById('cancelbtn');
const successM = document.getElementById('successM');
const logoimg = document.getElementById('logoimg');

const addtocartBtn = document.getElementById('addtocartBtn');

// my current user ID...
const currentUserID = document.getElementById('scriptData').getAttribute('data-ID');


// my API items data...
let products;

// is item is added to cart variables...
let isItemAddedToCart = false; 



// my cart list...
let cartList = [];



// my item displaying card grid...
const itemCardGrid = (items) => {
    return ` <div class="mainCard">
        <div id="mainCardInnerDiv" class="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img id="itemImg" class="p-8 rounded-t-lg" src="${items.image}" alt="product image">
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> ${items.title} </h5>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <span
                        class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">$ ${items.price}</span>
                    <a href="#" onclick="addToCart(${items.id})"
                       class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> <i class="fa-solid fa-cart-shopping"></i> Add to cart</a>
            </div>
            </div>
        </div>
    </div> ` }


// fetching product data from the API...
async function getDummyItems() {
    try {
        const mainBody = document.getElementById('mainItemsBody');
        const response = await fetch('https://fakestoreapi.com/products');
        var data = await response.json();
        products = data;
        console.log(data);
        const html = data.map(items => {
            return itemCardGrid(items);
        });
        mainBody.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}

getDummyItems();



// adding items to cart...
async function addToCart(id) {
    if (cartList.some((item) => item.id === id)) {
        alert('The item is already exists in cart...');
    } else {
        const mainBody = document.getElementById('mainItemsBody');
        const item = products.find((product) => product.id === id);
        // cartList.push(item);

        // // local storage variables and methods...
        // localStorage.setItem('UserCart', JSON.stringify(cartList));
        // cartList = JSON.parse(localStorage.getItem('UserCart'));

        // isItemAddedToCart = true;
        // console.log(isItemAddedToCart);
        // const html = products.map(items => {
        //     return itemCardGrid(items);
        // });
        // mainBody.innerHTML = html;
        // console.log(cartList.length);

        const data = await fetch(`http://localhost:5000/user/cartAdd/${currentUserID}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });

        console.log(data);
        
    }
}



// cancel the success message... 
const cancel = () => {
    successM.innerHTML = null;
}

cancelbtn.addEventListener('click', cancel);

