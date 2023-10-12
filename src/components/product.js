import productService from "../service/productService";
import categoryService from "../service/categoryService";
export default async  function Product(){
    var arrCartPopup = [];
    const dataItem = await productService.index();
    const dataCategory = await categoryService.index();
    window.filterByCategory = (thisData) => {
        const id = $(thisData).attr('data-id');
        productService.getByFilter({category_id : id})
        .then((data) => {
            showProduct(data);
        })
    }
    window.filterBySort = (thisData) =>{
        let type = $(thisData).val();
        
        if(type == 1){
            productService.getByFilter({_sort : 'price_sale', _order : 'asc'})
            .then((data) => {
                showProduct(data);
            })
        }else if(type == 2){
            productService.getByFilter({_sort : 'price_sale', _order : 'desc'})
            .then((data) => {
                showProduct(data);
            })
        }else {
            productService.getByFilter({_sort : 'name', _order : 'asc'})
            .then((data) => {
                showProduct(data);
            })
        }
    }
    window.filterByPrice = (thisData)  => {

        let type = ($(thisData).val());
        let filteredArray = [];
        if(type == 1){
            filteredArray = dataItem.filter(product => {
                return product.price_sale >= 0 && product.price_sale <= 50000;
            });
        }else if(type == 2){
            filteredArray = dataItem.filter(product => {
                return product.price_sale >= 50000 && product.price_sale <= 100000;
            });
        }else if(type == 3){
            filteredArray = dataItem.filter(product => {
                return product.price_sale >= 100000 && product.price_sale <= 500000;
            });
        }else {
            filteredArray = dataItem.filter(product => {
                return product.price_sale >= 500000 && product.price_sale <= 5000000;
            });
        }
        showProduct(filteredArray);
        
    }
    function deleteCart() {
        setTimeout(function(){
          arrCartPopup[0]
              $('#' + arrCartPopup[0]).remove();
              arrCartPopup.shift();
            if(arrCartPopup[0] !== undefined){
                deleteCart ();
            }
        }, 2000);
    }
    window.handleAddToCart =  (thisData) => {
        let nameCart = $(thisData).attr('data-name');
        let priceCart = $(thisData).attr('data-price');
        let imageCart = $(thisData).attr('data-image');
        let idCart = $(thisData).attr('data-id');
        addCart({
          name : nameCart,
          price : priceCart,
          image : imageCart,
          id : idCart,
          quantity : 1
         });

       var id = Math.floor(Math.random() * 9000);
       arrCartPopup = [...arrCartPopup, id];
        if(arrCartPopup.length == 1){
            deleteCart();
        }

        $('.add-popup-cart').append(`<div id="${id}" class="shadow-[5px_5px_60px_5px_rgba(0,0,0,0.3)] rounded-[10px] flex gap-3 bg-white py-3 px-5">
          <div class="relative ">
              <div class="text-red-600 absolute top-[0px] left-[0px] text-[20px]">&times;</div>
              <img src="${imageCart}" alt="" class="w-[90px] h-[90px] object-cover">
          </div>
          <div class="flex flex-col w-[220px] ">
              <a href="" class=""><span class="w-[220px] ">${nameCart}</span></a>
              <a href="" class=""> <span class=" text-[#acacac]"> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceCart)}</span></a>
          </div>
        </div>`);
      }
    function showProduct(dataItem){
        let template = "";
        dataItem.map((item, key) => {
            template = template + ` <div >
            <div class="relative group/item">
                <img src="${item.image}" class="w-full">
                <div class=" invisible group-hover/item:visible text-white absolute top-[0px] left-[0px] w-full h-full flex justify-center items-center gap-4">
                    <div class=" bg-black rounded-full w-[45px] h-[45px] flex items-center justify-center"><i class="fa fa-heart" aria-hidden="true"></i></div>
                    <div class=" bg-black rounded-full w-[45px] h-[45px] flex items-center justify-center"><i class="fa fa-search" aria-hidden="true"></i></div>
                    <div onclick="handleAddToCart(this);" data-id="${item._id}" data-name="${item.name}" data-price="${item.price_sale}" data-image="${item.image}" class=" cursor-pointer bg-black rounded-full w-[45px] h-[45px] flex items-center justify-center"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                </div>
                <div class=" absolute top-[0px] left-[0px] rotate-[-17deg] flex justify-center items-center bg-contain h-[65px] w-[65px] text-white bg-[url('https://nou-bakery.myshopify.com/cdn/shop/t/7/assets/badge-2.png?v=147666975709106470991695832898')]">
                    ${Math.ceil(100 - ((item.price_sale * 100) / item.price ))}%
                </div>
                <div class=" absolute top-[0px] right-[0px] rotate-[-17deg] flex justify-center items-center bg-contain h-[65px] w-[65px] text-white bg-[url('https://nou-bakery.myshopify.com/cdn/shop/t/7/assets/badge-1.png?v=132605518465251901091695832898')]">
                    New
                </div>
            </div>
            <a href="/product/${item._id}" data-navigo>
            <div class="flex flex-col items-center gap-2 mt-10">
                <div class="text-[18px]">${item.name}</div>
                <div class="text-[#4e3939;] uppercase text-[11px]">Cake - donut - sweet</div>
                <div class="text-[15px] flex text-[#edb867;]">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                </div>
                <div class="flex text-[17px] items-end gap-1">
                    <span class="text-[#777;] text-[14px] line-through">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span>
                    <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price_sale)}</span>
                </div>
            </div>
            </a>
        </div>`;
        });
        $('.show-product').html(template);
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".show-product").offset().top
        }, 600);
    }
    return (`
        <section  class="add-popup-cart gap-4 flex flex-col  fixed top-20 right-[10px] h-screen w-auto z-[9999]">
        </section>
        <section class="mt-5 py-[180px] flex items-center justify-center bg-no-repeat bg-cover bg-[url('https://nou-bakery.myshopify.com/cdn/shop/files/01.jpg?v=1613699059')]">
            <div class=" text-center">
                <h1 class="text-white text-[40px]"> PRODUCTS </h1>
                <div class="mt-2 text-[16px] text-[#b3b3b3;]">
                <a href="" ><span class="text-[#b3b3b3;]">HOME</span></a> / <span class="text-[#e75e4e;]">PRODUCTS</span>
                </div>
                
            </div>
        </section>
        <section class="bg-[#fff;] mt-[80px]">
            <div class="container">
                <div class="flex gap-8">
                    <div class="w-[280px] flex-none flex flex-col gap-[60px]">
                         <div class="flex flex-col gap-4">
                            <div class="text-[23px] uppercase tracking-[4px]"><span>categories</span></div>
                            ${dataCategory.map((item, key) => (
                                `<div onclick="filterByCategory(this);" class="text-[#626262;] text-[15px]" data-id="${item._id}"><span>${item.name} (1)</span></div>`
                            )).join("\n")}
                         </div>
                         <div class="flex flex-col gap-4">
                            <div class="text-[23px] uppercase tracking-[4px]"><span>filter by price</span></div>
                            <div class="text-[#626262;] text-[15px] flex flex-col gap-4">
                                <div >
                                    <input id="focus-1" name="price" type="radio" value="1" onclick="filterByPrice(this)" />
                                    <label for="focus-1" class="pl-2"> 0 - 50.000đ </label>
                                </div>
                                <div>
                                    <input id="focus-2" name="price" type="radio" value="2" onclick="filterByPrice(this)" />
                                    <label for="focus-2"  class="pl-2"> 50 - 100.000đ</label>
                                </div>
                                <div>
                                    <input id="focus-3" name="price" type="radio" value="3" onclick="filterByPrice(this)" />
                                    <label for="focus-3"  class="pl-2"> 100 - 500.000đ</label>
                                </div>
                                <div>
                                    <input id="focus-4" name="price" type="radio" value="4" onclick="filterByPrice(this)" />
                                    <label for="focus-4"  class="pl-2"> 500 - ∞</label>
                                </div>
                            </div>
                            
                         </div>
                         <div class="flex flex-col gap-4">
                            <div class="text-[23px] uppercase tracking-[4px]"><span>Ads banner</span></div>
                            <div><img src="https://nou-bakery.myshopify.com/cdn/shop/files/banner2x_270x.png?v=1613699065" class="w-full"/></div>
                         </div>
                         <div class="flex flex-col gap-4">
                            <div class="text-[23px] uppercase tracking-[4px]"><span>tags</span></div>
                            <div class="flex gap-4 flex-wrap">
                                <button class="hover:border-[#e75e4e;] hover:text-white hover:bg-[#e75e4e;] text-[12px] py-[4px] px-[15px] rounded-full border-[2px] text-[#626262;] border-[#d9d9d9;]"> 0-49$</button>
                                <button class="hover:border-[#e75e4e;] hover:text-white hover:bg-[#e75e4e;] text-[12px] py-[4px] px-[15px] rounded-full border-[2px] text-[#626262;] border-[#d9d9d9;]"> 50-99$</button>
                                <button class="hover:border-[#e75e4e;] hover:text-white hover:bg-[#e75e4e;] text-[12px] py-[4px] px-[15px] rounded-full border-[2px] text-[#626262;] border-[#d9d9d9;]"> new</button>
                                <button class="hover:border-[#e75e4e;] hover:text-white hover:bg-[#e75e4e;] text-[12px] py-[4px] px-[15px] rounded-full border-[2px] text-[#626262;] border-[#d9d9d9;]"> sale</button>
                            </div>
                        </div>
                    </div>
                    <div class="grow">
                        <div class="flex gap-8">
                            <div class="w-1/3">
                                <img src="https://nou-bakery.myshopify.com/cdn/shop/files/012x.jpg?v=1613699060" class="w-full h-full" />
                            </div>
                            <div class="w-2/3">
                                <img src="https://nou-bakery.myshopify.com/cdn/shop/files/022x.jpg?v=1613699060" class="w-full h-full" />
                            </div>
                        </div>

                        <div class="flex gap-7 items-center py-[90px]">
                           <span class="text-[13px] uppercase text-[#626262;]">Sort by: </span>
                            <select onchange="filterBySort(this)" class="text-[#626262;] py-3 px-5 bg-white border-[1px] rounded-full border-[#d9d9d9;]" >
                                <option value="1" >-- Sort order by Asc via price --</option>
                                <option value="2" >-- Sort order by Desc via price --</option>
                                <option value="3" >-- Sort by name --</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-3 gap-8 show-product">
                          ${dataItem.map((item, key) => (
                            ` <div >
                            <div class="relative group/item">
                                <img src="${item.image}" class="w-full">
                                <div class=" invisible group-hover/item:visible text-white absolute top-[0px] left-[0px] w-full h-full flex justify-center items-center gap-4">
                                    <div class=" bg-black rounded-full w-[45px] h-[45px] flex items-center justify-center"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                    <div class=" bg-black rounded-full w-[45px] h-[45px] flex items-center justify-center"><i class="fa fa-search" aria-hidden="true"></i></div>
                                    <div onclick="handleAddToCart(this);" data-id="${item._id}" data-name="${item.name}" data-price="${item.price_sale}" data-image="${item.image}" class=" cursor-pointer bg-black rounded-full w-[45px] h-[45px] flex items-center justify-center"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                </div>
                                <div class=" absolute top-[0px] left-[0px] rotate-[-17deg] flex justify-center items-center bg-contain h-[65px] w-[65px] text-white bg-[url('https://nou-bakery.myshopify.com/cdn/shop/t/7/assets/badge-2.png?v=147666975709106470991695832898')]">
                                ${Math.ceil(100 - ((item.price_sale * 100) / item.price ))}%
                                </div>
                                <div class=" absolute top-[0px] right-[0px] rotate-[-17deg] flex justify-center items-center bg-contain h-[65px] w-[65px] text-white bg-[url('https://nou-bakery.myshopify.com/cdn/shop/t/7/assets/badge-1.png?v=132605518465251901091695832898')]">
                                    New
                                </div>
                            </div>
                            <a href="/product/${item._id}" data-navigo>
                            <div class="flex flex-col items-center gap-2 mt-10">
                                <div class="text-[18px]">${item.name}</div>
                                <div class="text-[#4e3939;] uppercase text-[11px]">Cake - donut - sweet</div>
                                <div class="text-[15px] flex text-[#edb867;]">
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </div>
                                <div class="flex text-[17px] items-end gap-1">
                                    <span class="text-[#777;] text-[14px] line-through">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span>
                                    <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price_sale)}</span>
                                </div>
                            </div>
                            </a>
                        </div>`
                          )).join("\n")}
                        </div>
                        <div class="py-[80px] gap-3 flex justify-center items-center">
                                <div class="bg-[#ee7560] text-white text-[14px] rounded-full w-[45px] h-[45px] flex justify-center items-center">1</div>
                                <div class=" text-black text-[14px] rounded-full w-[45px] h-[45px] flex justify-center items-center border-[1px] border-[#d9d9d9;] hover:text-white hover:bg-[#ee7560]">2</div>
                                <div class=" text-black text-[14px] rounded-full w-[45px] h-[45px] flex justify-center items-center border-[1px] border-[#d9d9d9;] hover:text-white hover:bg-[#ee7560]"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </div>
               
            </div>
        </section>
    `);
}   