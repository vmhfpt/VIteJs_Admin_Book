import axios from 'axios';
import Typewriter from 'typewriter-effect/dist/core';

export default function Chat(){
    var numberChat = 1;
    function optionFunction(text){
        return {
            // method: 'POST',
            // url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
            // headers: {
            //   'content-type': 'application/json',
            //   'X-RapidAPI-Key': '16ce5680c4msh2edfceceacf27e1p161993jsnf2827b1f5743',
            //   'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
            // },


            method: 'POST',
            url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '1d92f26225msh1c0ec698f285fb8p1fc2fbjsn7409b76033c8',
              'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
            },
            data: {
              messages: [
                {
                  role: 'user',
                  content: text
                }
              ],
              web_access: false,
              stream: false
            }
        };
    }
    var customNodeCreator = function(character) {
        $(".show-chat").scrollTop($(".show-chat")[0].scrollHeight);
        return document.createTextNode(character);
    }
    window.handleResult = async () => {
        
        let text = ($(".text-input").val());
        $(".text-input").val("");
        $('.show-chat').append(` 
            <div class="flex gap-3 items-start">
                    <div class=" flex-none  w-[45px] h-[45px] rounded-full "> <img class="object-cover w-full h-full rounded-full" src="https://m.media-amazon.com/images/I/61cdXlJSqWL._AC_UF894,1000_QL80_.jpg" /></div>
                    <div class="  relative top-[4px] bg-[#eeeeee] text-[14px] px-3 py-1 rounded-[2px]" > <p>${text}</p> </div>
            </div>
            <div class="loading-response w-full flex items-end justify-center" >
                        <div class="bg-blue-500 flex gap-3 justify-center items-center text-white rounded-[5px] py-2 px-4" >
                            <div ><i class="text-red-500 fa fa-spinner fa-spin"></i></div>
                            <div>Responding </div>
                        </div>
            </div>
        
        `);
        $(".show-chat").scrollTop($(".show-chat")[0].scrollHeight);
        
        try {
            const response = await axios.request(optionFunction(text));
            $('.show-chat').append(`<div class=" w-full flex justify-end">
                <div class="bg-blue-500 text-white text-[14px] py-1 px-2 rounded-[2px]">
                <span id="block-${numberChat}" ></span>
                </div>
            </div>`);
            $('.loading-response').remove();
            let contentResult = response.data.BOT.split('.').map(function(item) {
                return  item.trim() + '.' ;
            }).join('<br>');
            new Typewriter(`#block-${numberChat}`, {
                strings: contentResult,
                autoStart: true,
                delay: 15,
                onCreateTextNode: customNodeCreator,
            });
            numberChat ++;
        } catch (error) {
            $('.loading-response').remove();
            $('.show-chat').append(` 

            <div class="loading-response w-full flex items-end justify-center" >
                        <div class="bg-red-500 flex gap-3 justify-center items-center text-white rounded-[5px] py-2 px-4" >
                            <div ><i class=" text-yellow-400 fa fa-exclamation-triangle" aria-hidden="true"></i></div>
                            <div>Something went error </div>
                        </div>
            </div>
        
        `);
        }
    }
    window.search = () => {
        if(event.key === 'Enter') {
            handleResult();      
        }
    }
    window.showChat = () => {
       $("#show-tab-chat").fadeIn({
            start: function() {
                jQuery(this).css('display','flex');
            }
        });
    }
    window.closeChat = () => {
        $("#show-tab-chat").fadeOut();
    }
    return `<section class="z-[10999] chat-app fixed bottom-[90px] right-[120px] ">
    <div id="show-tab-chat" class="hidden w-[350px] h-[500px]  bg-white rounded-[10px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  flex-col justify-between">
        <div class="px-4 bg-blue-500 rounded-t-[10px] flex justify-between items-center">
           <div class="flex items-center gap-4">
              <div class=" relative top-[-20px] w-[60px] h-[60px] rounded-full border-[4px] border-red-500"> <img class="object-cover w-full h-full rounded-full" src="https://m.media-amazon.com/images/I/61cdXlJSqWL._AC_UF894,1000_QL80_.jpg" /></div>
              <div class="flex flex-col text-white text-[14px]"> <span> You </span> <span>Online</span></div>
           </div>
           <div onclick="closeChat()" class="text-white text-[25px] cursor-pointer" >
                &times
           </div>
        </div>
        <div class="flex flex-col gap-6 px-4 mt-5 overflow-y-auto  h-[70%] show-chat">
           
        </div>
        <div class="flex items-center px-4 py-[10px] border-t-[2px] border-[#eeeeee]"> 
            <div class="text-[14px] grow"> <input onkeydown="search()" class="w-full text-input outline-none" placeholder="Send a message"  /> </div>
            <div onclick="handleResult();" class=" cursor-pointer w-[30px]  text-center flex-none text-gray-400" ><i class="fa fa-paper-plane" aria-hidden="true"></i></div>
        </div>
    </div>
    <div class="relative">
        <div class=" absolute right-[-80px] top-[-30px]">
             <img class=" cursor-pointer" width="60" height="60" onclick="showChat()" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png" />
        </div>
    </div>
</section>`;
}