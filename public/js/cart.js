
console.log('In Cart Page...');

// my script data that contains all the router variables that are passed in...
const currentUserID = document.getElementById('scriptData').getAttribute('data-ID');

// my cart item price total...
let totalCartPrice = 0;


// my cart diplaying design in HTML...
const cartDesign = (items) => {
    return `  <tr>
                  <td class="p-4 px-6 text-center whitespace-nowrap"> ${items.title.slice(0, 9)} ... </td>
                    <td class="p-4 px-6 text-center whitespace-nowrap">
                        <div>
                            <button class="px-2 py-0 shadow">-</button>
                            <input type="text" name="qty" value="1" class="w-12 text-center bg-gray-100 outline-none" />
                            <button class="px-2 py-0 shadow">+</button>
                        </div>
                    </td>
                    <td class="p-4 px-6 text-center whitespace-nowrap">$ ${items.price}</td>
                    <td class="p-4 px-6 text-center whitespace-nowrap">
                        <button class="px-2 py-0 text-red-100 bg-red-600 rounded">
                            x
                        </button>
                    </td>
                </tr>
                `;
} 


// Function for getting on previous page or url...
function backFunc () {
    window.history.back();
}

// rendering the items that are in cart...
async function getCartItems () {
    const userCart = document.getElementById('userCart');
    const response = await fetch(`http://localhost:5000/user/getCart/${currentUserID}` ,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const userCartList = await response.json();
    console.log('working...');
    const innerHtml = userCartList.map((items) => {
        // getTotalCartPrice(userCartList, items);

        userCartList.map((items) => {
            return items.price;
        }).reduce((acc, value) => totalCartPrice = acc + value, 0);
        console.log(totalCartPrice);

        return cartDesign(items);
    });
    console.log(totalCartPrice);
    renderingTotalPrice()
    userCart.innerHTML = innerHtml;
    console.log('worked !');
}

getCartItems();


//rendering total price on cart page...
const renderingTotalPrice = () => {
    const totalPriceText = document.getElementById('totalPrice');
    totalPriceText.innerText = `$ ${totalCartPrice.toFixed(2)}`;
}