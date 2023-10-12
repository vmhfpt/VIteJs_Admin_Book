import axios from 'axios';
import orderService from '../service/orderService';
import orderDetailService from '../service/orderDetailService';
import { validateEmail, validateName, validatePhoneNumber } from '../service/validateService';
import { v4 as uuidv4 } from 'uuid';
export default async function Checkout(){
    var checkName = false, checkAddress = false, checkEmail = false, checkPhoneNumber = false;
    var arrCart = JSON.parse(localStorage.getItem("carts"));
    var totalPrice = 0;
    function handleRequest() {
        axios.get("https://provinces.open-api.vn/api/").then(function (response) {
            response.data.map((item, key) => {
                $('#show-provinces').append(`<option value="${item.code}" > ${item.name}</option>`)
            })
        })
    }
    handleRequest();
    window.showProvince = (thisData) => {
           
        $('#show-wards').empty();
        $('#show-wards').append(`<option value="0" class="">-- Select ward -- </option>`);
        $('#show-districts').empty();
        $('#show-districts').append(`<option value="0" class="">-- Select district -- </option>`);
        if($(thisData).val() == '0'){
            return true;
        }

         axios.get(`https://provinces.open-api.vn/api/p/${$(thisData).val()}/?depth=2`).then(function (response) {
            response.data.districts.map((item, key) => {
                    
            $('#show-districts').append(`<option value="${item.code}" > ${item.name}</option>`)
        })
            
        })
    }
    window.showDistrict = (thisData) => {
        $('#show-wards').empty();
        $('#show-wards').append(`<option value="0" class="">-- Select ward -- </option>`);
        if($(thisData).val() == '0'){
            return true;
        }
        
         axios.get(`https://provinces.open-api.vn/api/d/${$(thisData).val()}/?depth=2`).then(function (response) {
           
            response.data.wards.map((item, key) => {
               
                $('#show-wards').append(`<option value="${item.code}" > ${item.name}</option>`)
            })
            
        })
    }


    window.closePopupCart = () => {
        $('.popup-success').fadeOut();
    };


    window.submitOrder = (thisData) => {
        if(checkAddress && checkEmail && checkName && checkPhoneNumber){
            $(thisData).prop('disabled', true);
            $(thisData).html(`<i class=" fa fa-spinner fa-spin"></i>`);
            let name = $("#name-order").val();
            let email = $("#email-order").val();
            let phoneNumber = $("#phone-order").val();
            let note = $("#note-order").val();
            let fullAddress = $("#address-order").val();
            let province = $("#show-provinces").children("option").filter(":selected").text();
            let district = $("#show-districts").children("option").filter(":selected").text();
            let ward = $("#show-wards").children("option").filter(":selected").text();
            var currentdate = new Date(); 
            var datetime = currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1)  + "-" 
                    + currentdate.getDate() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        
            let dataUser = {
                name,
                email,
                phone_number : phoneNumber,
                note,
                address : `${fullAddress}, ${ward}, ${district}, ${province}`,
                status : 6,
                createdAt : datetime
            }
            var arrCart = JSON.parse(localStorage.getItem("carts"));
        
            

            orderService.create(dataUser).then(async (data) => {
                
                return await Promise.all(arrCart.map(async (result) => {
                    
                    orderDetailService.create({
                        order_id : data._id,
                        price : result.price,
                        product_id : result.id,
                        quantity : result.quantity
                    })
                })).then(() => {
                showPopupOrder(dataUser, JSON.parse(localStorage.getItem("carts")));
                localStorage.setItem("carts", JSON.stringify([]));
                })
                
            })
        }
    }
    function showPopupOrder(dataUser, dataCart){
        $('.app__nav').html(`<div class="flex flex-col gap-4 pb-[50px] container my-8">
        <div class="text-[20px] font-bold  mt-2 px-5 flex gap-4 items-center justify-start border-[1px] border-[#efefef] py-4">Your cart is currently empty</div>
        <div class="italic text-[#e75e4e;]"><span class=""><a href="/product" data-navigo> Return to shop</a></span></div>
    </div>`);
        

        let template = "";
        var totalPrice = 0;
        dataCart.map((item, key) => {
            totalPrice = totalPrice + (item.quantity * item.price);
            template = template + `<div class="flex justify-between ">
                    <div class="">
                        ${item.name} (&times; ${item.quantity})
                    </div>
                    <div class=" w-[130px]">
                        ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * Number(item.quantity))}
                    </div>
                 </div>`;
        })

        $('.app__nav').before(`<section class="hidden pt-[80px] z-[9999] popup-success bg-[#00000054] w-screen h-screen fixed top-[0px] left-[0px]  justify-center">
    <div class="bg-white w-[600px] h-[90%]  overflow-y-auto ">
        <div class="bg-[#e75e4e;] flex justify-between px-10 py-5 items-center ">
            <div class="">
                <a href="/product" class="text-[20px] text-white" data-navigo>Back to shop</a>
            </div>
            <div onclick="closePopupCart();" class="text-[30px] text-white cursor-pointer">
                &times;
            </div>
        </div>
        <div class="px-10  flex justify-center items-center flex-col gap-2">
            <div class="">
                <img src="https://cdn.icon-icons.com/icons2/2785/PNG/512/trolley_cart_success_icon_177398.png" alt="" class="w-[200px] h-[200px]">
            </div>
            <div class="font-bold text-[30px]">Thank You For Your Order!</div>
            <div class="text-center text-[#777777;]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam.</div>
        </div>

        <div class="px-10 mt-[32px]">
            <div class="text-white flex justify-between bg-[#e75e4e;] p-2 font-bold">
                <div class="">
                    Order Confirmation #
                </div>
                <div class=" w-[130px]">
                    Price
                </div>
            </div>
            <div class="mt-2 show-list-ordered flex flex-col p-2 gap-3">
                 ${template}
            </div>
            <div class="mt-2  p-2 font-bold">
                <div class="py-2 flex justify-between border-b-[3px] border-t-[3px] border-[#eeeeee]">
                    <div class="uppercase">
                        total
                    </div>
                    <div class="w-[130px]">
                        ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                    </div>
                 </div>
            </div>
        </div>

        <div class="px-12 flex flex-col gap-[2px] pb-5">
             <div class="flex justify-between font-bold">
                <div class="">Delivery Address</div>
                <div class="">Estimated Delivery Date</div>
             </div>
             <div class="flex justify-between mt-2">
                <div class="">(Name) ${dataUser.name}</div>
                <div class="">${dataUser.createdAt}</div>
             </div>
             <div class="flex justify-between ">
                <div class="">(Email) ${dataUser.email}</div>
             </div>
             <div class="flex justify-between ">
                <div class="">(Phone number) ${dataUser.phone_number}</div>
             </div>
             <div class="flex justify-between ">
                <div class="">(Address) ${dataUser.address}</div>
             </div>
             <div class="flex justify-between ">
                <div class="">(Note) ${dataUser.note} </div>
             </div>
        </div>
    </div>
 </section>`);

        $(".popup-success").fadeIn({
            
            start: function() {
                jQuery(this).css('display','flex');
            }
        });
    }
    window.handleInputName = (thisData) => {
        checkName = validateName({target: $(thisData), name : 'Name'}, $('.error-name'));
    }
    window.handleInputEmail = (thisData) => {
        checkEmail = validateEmail(thisData, $('.error-email'));
    }
    window.handleInputPhone = (thisData) => {
        checkPhoneNumber = validatePhoneNumber(thisData, $('.error-phone'));
    }
    window.handleInputAddress = (thisData) => {
        checkAddress = validateName({target: $(thisData), name : 'Address'}, $('.error-address'));
    }
  
    return ( /*html */`
        <div class="container app__nav" >
             <div class="flex">
                    <div class="w-1/2 flex flex-col gap-5 px-10 py-[70px]">
                        <div class="flex flex-col gap-3">
                             <div class="text-[20px]" >Checkout</div>
                             <div class="text-[13px]">
                                <ul class="flex gap-2">
                                    <li class="flex items-center gap-2" ><span class="text-blue-500">Cart</span> <i class="fa fa-angle-right" aria-hidden="true"></i></li>
                                    <li class="flex items-center gap-2"><span>Information</span> <i class="fa fa-angle-right" aria-hidden="true"></i></li>
                                    <li class="flex items-center gap-2"><span class="text-[rgba(0,0,0,0.56);]">Shipping</span> <i class="fa fa-angle-right" aria-hidden="true"></i></li>
                                    <li><span class="text-[rgba(0,0,0,0.56);]">Payment</span> </li>
                                </ul>
                             </div>
                             <div class="flex justify-between items-center">
                                <div class="text-[18px]">Form</div>
                                <div class="text-[14px]"><span>Have an account ?</span> <span class="text-blue-500">Login</span> </div>
                             </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class=" w-full">
                              <input oninput="handleInputName(this)"  class="text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]" type="text" placeholder="Enter name" id="name-order" />
                              <span class="text-red-500 text-[14px] error-name" > * Name is Required</span>
                            </div>
                            <div class="w-full">
                              <input oninput="handleInputEmail(this)" class="text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]" type="email" placeholder="Enter email" id="email-order" />
                              <span class="text-red-500 text-[14px] error-email" > * Email is Required</span>
                            </div>
                            <div class="col-span-2 w-full">
                               <input oninput="handleInputPhone(this)" class="text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]" type="text" placeholder="Enter phone number" id="phone-order" />
                               <span class="text-red-500 text-[14px] error-phone" > * Phone number is Required</span>
                            </div>
                            <div class="w-full">
                                <select onchange="showProvince(this);" id="show-provinces" class="bg-white text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]">
                                    <option value="0" class="">-- Select city --</option>
                                </select>
                            </div>
                            <div class="w-full">
                                <select id="show-districts"  onchange="showDistrict(this);" class="bg-white text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]">
                                    <option value="0" class="">-Select district- </option>
                                </select>
                            </div>
                            <div class="col-span-2 w-full">
                                <select  id="show-wards" class="bg-white text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]">
                                     <option value="0" class="">-- Select ward -- </option>
                                </select>
                            </div>
                            <div class=" col-span-2 w-full">
                               <input oninput="handleInputAddress(this)" class="text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]" type="text" placeholder="Enter address" id="address-order" />
                               <span class="text-red-500 text-[14px] error-address" > * Address is Required</span>
                            </div>
                            <div class="col-span-2 w-full"><input class="text-[14px] py-3 px-4 w-full border-[1px] border-[#eeeeee]" type="text" placeholder="Enter note" id="note-order" /></div>
                            <div class="col-span-2 w-full flex items-center gap-3 text-[15px]"> <input type="checkbox" /> <label>Save information for next time</label> </div>
                            <div class="py-6 col-span-2 w-full flex justify-end text-[15px]"> <button onclick="submitOrder(this);" class="bg-[rgb(25,144,198);] text-white py-5 px-6 rounded-[7px]" > Continue to shipping</button></div>
                        </div>
                    
                    </div>
                    <div class="w-1/2 bg-[rgb(250,250,250);] px-10 py-[70px]">
                        <div class="flex flex-col gap-4">
                        ${arrCart && arrCart.map((item, key) => {
                            totalPrice = totalPrice + (item.quantity * item.price);
                            return (`<div class="flex justify-between items-center">
                            <div class="flex items-center gap-4">
                                <div class=" relative w-[72px] h-[72px] rounded-[8px] border-[2px] border-[#eeeeee]">
                                    <img class="w-full h-full rounded-[8px]" src="${item.image}" />
                                    <div class="flex justify-center items-center absolute bg-red-400 text-white rounded-full w-[20px] h-[20px] top-[-8px] text-[14px] right-[-10px]"> ${item.quantity} </div>
                                </div>
                                <div class="text-[15px]">${item.name}</div>
                            </div>
                            <div><span class="text-[15px]">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * Number(item.quantity))}</span></div>
                        </div>`)
                        }).join("\n")}
                            
                        </div>
                        <div class="flex flex-col gap-[6px] mt-5">
                            <div class="flex justify-between items-center text-[15px]"> 
                                <span>Subtotal</span>
                                <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                            </div>
                            <div class="flex justify-between items-center text-[15px]"> 
                                <span>Shipping</span>
                                <span class="text-[rgba(0,0,0,0.56);] text-[13px]">Calculated at next step</span>
                            </div>
                            <div class="flex justify-between items-center text-[15px]"> 
                                <span>Estimated taxes</span>
                                <span > $00.00$</span>
                            </div>
                            <div class="flex justify-between items-center text-[17px]"> 
                                <span class=" font-bold" >Total</span>
                                <span ><span class="text-[rgba(0,0,0,0.56);] text-[13px]">VND</span> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                            </div>
                        
                        </div>
                    </div>
             </div>
        </div>
    `);
}