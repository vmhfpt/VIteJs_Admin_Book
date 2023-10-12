export default async function Header(){
  
    setTimeout(function(){
      getTotalCart(JSON.parse(localStorage.getItem("carts")));
    }, 900);
    return (`
    <header class="z-[9999]"> 
      <div class=" border-b-[2px] border-[#f3f3f3]"> 
          <div class="flex justify-between items-center container">
                <div class="py-[5px] text-[13px] ">
                  <span>460 West 34th Street, 15th floor, New York - Hotline: 804-377-3580 - 804-399-3580</span> 
              </div>
              <div class="py-[5px] px-3 hover:text-red-500 border-r-[2px] border-l-[2px] border-[#f3f3f3] "> 
                  <i class="fa fa-search" aria-hidden="true"></i>
              </div>
          </div>
      </div>
      <div class=" container relative z-[9999]">
         <div class="py-[10px] uppercase flex justify-between items-center"> 
             <div class=" w-1/2">
                <ul class="flex gap-4 text-[13px] tracking-[1px]">
                   <a href="/" data-navigo> <li class="py-[4px] px-[20px] border-[2px]  rounded-full border-red-500 text-red-500" > Home</li></a>
                   <a href="/product" data-navigo> <li class="py-[4px] px-[20px] border-[2px] border-white rounded-full hover:border-red-500 hover:text-red-500" > Shop</li></a>
                   <a href=""> <li class="py-[4px] px-[20px] border-[2px] border-white rounded-full hover:border-red-500 hover:text-red-500" > About us</li></a>
                   <a href=""> <li class="py-[4px] px-[20px] border-[2px] border-white rounded-full hover:border-red-500 hover:text-red-500" > Faqs</li></a>
                </ul>
             </div>
             <div class="relative  w-[175px] z-[9999]">
               <div class=" absolute top-[-25px]">
                   <img class="w-[100%] z-[9999]" src="https://nou-bakery.myshopify.com/cdn/shop/files/logo-1.png?v=1613698221" />
               </div>
            </div>
             <div class="flex gap-12 items-center  w-1/2 justify-end"> 
                  <div>
                    <ul class="flex gap-4 text-[13px] tracking-[1px]">
                      <a href=""> <li class="py-[4px] px-[20px] border-[2px] border-white rounded-full hover:border-red-500 hover:text-red-500" > Blog</li></a>
                      <a href=""> <li class="py-[4px] px-[20px] border-[2px] border-white rounded-full hover:border-red-500 hover:text-red-500" > page</li></a>
                      <a href=""> <li class="py-[4px] px-[20px] border-[2px] border-white rounded-full hover:border-red-500 hover:text-red-500" > contact</li></a>
                    </ul>
                  </div>
                  <a href="/cart" data-navigo>
                    <div class="flex justify-end relative">
                      <div class=" bg-black text-white rounded-[100%] w-[45px] h-[45px] flex items-center justify-center text-[20px]" >
                          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      </div>
                      <div class="flex items-center justify-center absolute right-[0px] top-[-5px] text-white text-[11px] bg-red-500 border-[1px] border-white rounded-[100%] w-[20px] h-[20px] show-quantity-icon" ></div>
                  </div>
                  </a>
             </div>
         </div>
      </div>
    </header>
  `);
}