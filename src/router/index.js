import Navigo from "navigo";
import Home from "../components/home";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Product from "../components/product";
import ProductDetail from "../components/detail";
import Cart from "../components/cart";
import Checkout from "../components/checkout";
const router = new Navigo("/");
let targe = document.querySelector('#app');

const handleLayOut = async (data) => {
    if(data.layout == false) return await data.component(data.param);
    return `
      ${await Header()}
      ${await data.component(data.param)}
      ${await Footer()}
    `;
}


const Router =  () => {
    router.on('/',async function () {
        targe.innerHTML = await handleLayOut({component : Home})
    });
    router.on("/product",async function () {
       targe.innerHTML = await  handleLayOut({component : Product})
    });
    router.on("/product/:id",async function (match) {
        targe.innerHTML = await handleLayOut({component :  ProductDetail, param : match.data})
    });
    router.on("/cart",async function () {
        targe.innerHTML = await handleLayOut({component : Cart})
    });
    router.on("/checkout",async function () {
        targe.innerHTML = await handleLayOut({layout : false,component : Checkout})
    });
   
    
    router.resolve();
    
}

document.body.addEventListener('click', (e) => {

    var parentATag = e.target.closest('a[data-navigo]');
    if(parentATag) {
        var hrefValue = parentATag.getAttribute('href');
        e.preventDefault();
        router.navigate(hrefValue);
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", 
        });
    } 
});


export default Router;