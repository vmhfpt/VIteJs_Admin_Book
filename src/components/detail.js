import productService from "../service/productService";
import categoryService from "../service/categoryService";
import Comment from "./comment";
export default async function ProductDetail(params){
    var arrCartPopup = [];
    const dataItem = await productService.getDetailProduct(params.id);
    const productSuggest = await productService.getProductSuggest({category_id : dataItem.category_id._id});
    
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
    window.handleAddCartSingle = () => {
        addCart({
            name : dataItem.name,
            price : dataItem.price,
            image : dataItem.image,
            id : dataItem._id,
            quantity : Number($('#quantity-input').val())
        })
        var id = Math.floor(Math.random() * 9000);
        arrCartPopup = [...arrCartPopup, id];
         if(arrCartPopup.length == 1){
             deleteCart();
         }
 
         $('.add-popup-cart').append(`<div id="${id}" class="shadow-[5px_5px_60px_5px_rgba(0,0,0,0.3)] rounded-[10px] flex gap-3 bg-white py-3 px-5">
           <div class="relative ">
               <div class="text-red-600 absolute top-[0px] left-[0px] text-[20px]">&times;</div>
               <img src="${dataItem.image}" alt="" class="w-[90px] h-[90px] object-cover">
           </div>
           <div class="flex flex-col w-[220px] ">
               <a href="" class=""><span class="w-[220px] ">${dataItem.name}</span></a>
               <a href="" class=""> <span class=" text-[#acacac]"> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataItem.price)}</span></a>
           </div>
         </div>`);
    }
    window.handleAddToCart = (thisData) => {
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
    window.increaseInput = () => {
        if($('#quantity-input').val() == 5) return true;
        $('#quantity-input').val(Number($('#quantity-input').val()) + 1);
      }

      window.decreaseInput = () => {
         if($('#quantity-input').val() == 1) return true;
         $('#quantity-input').val(Number($('#quantity-input').val()) - 1);
      }
      
      window.quantityInput = (thisData) => {
        if($(thisData).val() >= 1 && $(thisData).val() <= 5){
         
        }else {
           $(thisData).val(1);
        }
      }
      window.showTab = (thisData) => {
        let tabName = $(thisData).attr('data-name');
        $('.show-tab').removeClass('text-[#ee7560;]');
        $(thisData).addClass('text-[#ee7560;]');
        $("#tab-description, #tab-comments").hide();
        $(`#${tabName}`).fadeIn();
    }
    return (`
        <section  class="add-popup-cart gap-4 flex flex-col  fixed top-20 right-[10px] h-screen w-auto z-[9999]">
        </section>
        <section class="mt-5 py-[180px] flex items-center justify-center bg-no-repeat bg-cover bg-[url('https://nou-bakery.myshopify.com/cdn/shop/files/01.jpg?v=1613699059')]">
            <div class=" text-center">
               
                <div class="mt-2 text-[16px] text-[#b3b3b3;]">
                <a href="" ><span class="text-[#b3b3b3;]">HOME</span></a> / <span class="text-[#e75e4e;]">DETAIL PRODUCT</span>
                </div>
                
            </div>
       </section>
       <section>
          <div class="container">
            <div class="flex gap-[50px] my-[70px]">
                <div class="w-5/12" >
                    <div>
                        <img src="${dataItem.image}" class="w-full" />
                    </div>
                    <div class="flex gap-8 w-full py-5">
                        <div class="w-1/4"> <img class="w-full" src="https://nou-bakery.myshopify.com/cdn/shop/products/img-cake-2_compact.jpg?v=1524322196" /></div>
                        <div class="w-1/4"><img class="w-full" src="https://nou-bakery.myshopify.com/cdn/shop/products/img-cake-1_compact.jpg?v=1524322191" /></div>
                        <div class="w-1/4"> <img class="w-full" src="https://nou-bakery.myshopify.com/cdn/shop/products/img-cake-3_f034d865-41be-4dbb-aa95-058801d1ebf2_compact.jpg?v=1524322204" /></div>
                        <div class="w-1/4"><img class="w-full" src="https://nou-bakery.myshopify.com/cdn/shop/products/img-cake-4_3e378982-33de-48c8-ac6c-57a3b6c7c316_compact.jpg?v=1524322212" /></div>
                    </div>
                </div>
                <div class="w-7/12">
                    <div class="flex flex-col gap-3">
                        <div class=" uppercase text-[30px]"> <h1>${dataItem.name}</h1></div>
                        <div class=" flex text-[#edb867;] text-[13px]">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                        </div>
                        <div class=" flex gap-2 items-center">
                            <span class=" line-through text-[16px] text-[#777;]">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataItem.price)}</span>
                            <span class="text-[28px]">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataItem.price_sale)}</span>
                        </div>
                        <div>
                            <span class="text-[14px]" >${dataItem.description}</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-8 mt-4" >
                        <div class="flex items-end gap-2">
                            <span class=" uppercase text-[19px]"> availabitity: </span>
                            <span class="text-[#ee7560;] text-[15px]"> Many in stock</span>
                        </div>
                        <div class="flex items-end gap-2">
                            <span class=" uppercase text-[19px]"> category: </span>
                            <span class="text-[15px]"> ${dataItem.category_id.name}</span>
                        </div>
                        <div class="flex gap-3 items-center">
                            <div class="flex">
                                <button onclick="decreaseInput();" class="bg-black rounded-l-[100%] h-10 w-10 text-white" >-</button>
                                <input onchange="quantityInput(this);" id="quantity-input" class=" text-center bg-[#f1f1f1;] w-[130px] text-[#b6b6b6;] text-[14px]"  value="1" type="number" />
                                <button onclick="increaseInput();" class="bg-black rounded-r-[100%] h-10 w-10 text-white">+</button>
                            </div>
                            <div class="flex items-center justify-center bg-black w-[40px] h-[40px] rounded-full text-white" >
                              <i class="fa fa-heart-o" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div>
                               <button onclick="handleAddCartSingle();" class=" uppercase rounded-full text-white bg-gradient-to-r from-[#ee7560] to-[#ff5858] text-[14px] py-3 px-[100px]"><span class="mr-2">add to cart </span> <i class=" fa fa-angle-right" aria-hidden="true"></i></button>
                            </div>
                            <div class=" uppercase text-[20px]"><span>share with:</span></div>
                            <div class="flex gap-8 text-[18px] items-center">
                                  <i class="fa fa-facebook" aria-hidden="true"></i>
                                  <i class="fa fa-google" aria-hidden="true"></i>
                                  <i class="fa fa-twitter" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col border-t-[1px] border-[#eeeeee]">
                <div class="text-[18px] uppercase flex gap-[90px] py-[8px] tracking-[1px]" >
                   <span class="show-tab text-[#ee7560;]" onclick="showTab(this);" data-name="tab-description" >description</span>
                   <span class="show-tab text-[#626262;]" onclick="showTab(this);" data-name="tab-comments">reviews</span>
                </div>
                <div id="tab-description" class="text-[#00000080;] text-[14px] py-7">
                   <p>${dataItem.content}</p>
                </div>
            
            </div>
            ${ await Comment(dataItem) }
     
          </div>
       </section>

       <section class="py-[100px]">
             <div class="container">
                <div class="flex flex-col justify-center items-center">
                     <div><span class="text-[#ee7560;] text-[20px] font-bold">Sweet Cupcakes</span></div>
                     <div class="flex gap-5 items-center justify-center">
                            <div class="w-[90px] h-[20px] bg-[#e9e9e9;]"></div>
                            <div class="uppercase text-[35px]">best seller</div>
                            <div class="w-[90px] h-[20px] bg-[#e9e9e9;]"></div>
                     </div>
                </div>
                <div class="flex gap-8 my-[50px]">
                    ${productSuggest.map((item , key) => (
                        `<div class="w-1/4">
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
             </div>
        </section>
    `);
}