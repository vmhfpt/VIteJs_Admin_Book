export default async function Cart(){
    
    window.cartInputChange = (thisData) => {
        var index = ($('.cart-input').index(thisData));
        let id = $('.app-cart__content-item').eq(index).attr('data-id');
        var quantityChange = $('.cart-input').eq(Number(index)).val();
        changeCartQuantity(quantityChange, id);
    }
   
    window.deleteCart = (thisData) => {
        var dataItem = JSON.parse(localStorage.getItem("carts"));
        var index = $('.delete-cart').index(thisData);
        let id = $('.app-cart__content-item').eq(index).attr('data-id');

        var arrDelete = dataItem.filter(
            (item) => {
                if(item.id == id){
                    return false;
                }else {
                    return true;
                }
            }
        );
        localStorage.setItem("carts", JSON.stringify(arrDelete));
        renderCarts();
    }
    function renderCarts(){
        $('.show-cart-list').empty();
        

        var arrCart = JSON.parse(localStorage.getItem("carts"));
        //console.log(arrCart);
        var totalProduct = 0;
        var totalPrice = 0;
        
        if (arrCart == null || arrCart.length == 0) {
            arrCart = [];
            $('.app-first').remove();
            $('.show-quantity-icon').text(0);
            $('.show-empty-cart').append(`<div class="flex flex-col gap-4 pb-[50px] container my-8">
                <div class="text-[20px] font-bold  mt-2 px-5 flex gap-4 items-center justify-start border-[1px] border-[#efefef] py-4">Your cart is currently empty</div>
                <div class="italic text-[#e75e4e;]"><span class=""><a href="/product" data-navigo> Return to shop</a></span></div>
            </div>`);
        }
        
        arrCart.map((item, key) => {
            totalProduct = totalProduct + Number(item.quantity);
            totalPrice = totalPrice + (item.quantity * item.price);
            $('.show-cart-list').append(`<div class="app-cart__content-item flex border-b-[2px] border-[#eeeeee] py-6" data-id="${item.id}">
            <div class=" grow flex gap-5">
                <div class="w-[90px]" ><img src="${item.image}" /></div>
                <div class="flex flex-col items-start justify-center gap-2">
                    <span class="text-[16px]">${item.name}</span>
                    <button onclick="deleteCart(this);" class="delete-cart uppercase bg-[#e75e4e;] text-white text-[12px] font-bold py-2 px-5" >remove</button>
                </div>
            </div>
            <div class="flex flex-none w-[50%]  text-[15px] items-center" >
                <div class=" text-left w-1/3">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
                <div class="w-1/3 flex justify-center"><input onchange="cartInputChange(this);" class="cart-input text-[#b3b3b3;] text-center w-[60px] bg-white border-[1px]  border-[#eeeeee] h-[35px] " type="number" value="${item.quantity}" /> </div>
                <div class="text-right w-1/3">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * Number(item.quantity))} </div>
            </div>
        </div>`);
             
        });
        $('.show-quantity-icon').text(totalProduct);
        $('.show-subtotal').text(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice));
    }
    setTimeout(function(){
        renderCarts();
    }, 100);
    
    function changeCartQuantity(quantity, id){
        
        
        if(quantity <= 0 || quantity >=6 ){
            renderCarts();
            return true;
        }
        var shopCart = JSON.parse(localStorage.getItem("carts"));
        var newArr = shopCart.map((value, key) => {
            if (value.id == id) {
                return {
                    ...value,
                    quantity: quantity
                }
            } else {
                return (value);
            }
        });
        localStorage.setItem("carts", JSON.stringify(newArr));
        renderCarts();
    }
    return (`
       <section class="mt-5 py-[180px] flex items-center justify-center bg-no-repeat bg-cover bg-[url('https://nou-bakery.myshopify.com/cdn/shop/files/01.jpg?v=1613699059')]">
            <div class=" text-center">
               
                <div class="mt-2 text-[16px] text-[#b3b3b3;]">
                <a href="" ><span class="text-[#b3b3b3;]">HOME</span></a> / <span class="text-[#e75e4e;]">YOUR SHOPPING CART</span>
                </div>
                
            </div>
       </section>
       <section class="show-empty-cart"></section>
       <section class="py-[80px] app-first" >
            <div class="container">
                <div class="flex border-b-[2px] border-[#eeeeee] py-3">
                    <div class=" grow">
                        <span> Product</span>
                    </div>
                    <div class="flex flex-none w-[50%]  text-[15px] " >
                        <div class=" text-left w-1/3">Price</div>
                        <div class="w-1/3 text-center">Quantity</div>
                        <div class="text-right w-1/3">Total </div>
                    </div>
                </div>
                <div class="flex flex-col show-cart-list">
                </div>

                <div class="flex justify-end py-[50px]">
                    <div class="flex flex-col gap-5 " >
                            <div class="flex justify-end gap-[100px] text-[15px]" > 
                                <span > Subtotal</span>
                                <span class="show-subtotal"></span>
                            </div>
                            <div class="flex justify-end text-[12px]"><i>Shipping & taxes calculated at checkout</i></div>
                            <div class="flex gap-4" >
                               <a href="/product" data-navigo><button class=" uppercase bg-[#e75e4e;] text-white text-[13px] font-bold py-2 px-5">continue shopping</button></a>
                               <button class=" uppercase bg-[#e75e4e;] text-white text-[13px] font-bold py-2 px-5">update</button>
                               <a href="/checkout" data-navigo><button class=" uppercase bg-[#e75e4e;] text-white text-[13px] font-bold py-2 px-5">check out</button></a>
                            </div>
                    </div>
                </div>
  
            </div>
           
       </section>
    `);
}