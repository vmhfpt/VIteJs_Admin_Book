import Navigo from "navigo";
import Dashboard from "../components/dashboard";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Login from "../components/auth/login";
import Authentication from "../middleware/authentication";
import User from "../components/user/user";
import AddUser from "../components/user/add";
import EditUser from "../components/user/edit";

import AddCategory from "../components/category/add";
import Category from "../components/category/category";
import EditCategory from "../components/category/edit";

import AddBook from "../components/book/add";
import Book from "../components/book/book";
import EditBook from "../components/book/edit";
export const router = new Navigo("/");
let targe = document.querySelector('#app');

const handleLayOut = async (data, param) => {
    if(data.layout == false) return await data.component(param);
    return `
      ${await Header()}
      ${await data.component(param)}
      ${await Footer()}
    `;
}


const Router =  () => {
   
    router.on({
        '/': {
          as: 'route',
          uses: async function () {
            targe.innerHTML = await handleLayOut({component : Dashboard})
          },
          hooks: {
            before: function (done) {
               Authentication(done);
            }
          }
        }
    });
    
    router.on({
        '/user': {
          as: 'route',
          uses: async function () {
            targe.innerHTML = await handleLayOut({component : User})
          },
          hooks: {
            before: function (done) {
               Authentication(done);
            }
          }
        }
    });
    router.on({
        '/user/add': {
          as: 'route',
          uses: async function () {
            targe.innerHTML = await handleLayOut({component : AddUser})
          },
          hooks: {
            before: function (done) {
               Authentication(done);
            }
          }
        }
    });
    router.on({
        '/user/edit/:id': {
          as: 'route',
          uses: async function ({ data }) {
            targe.innerHTML = await handleLayOut({component : EditUser}, data);
          },
          hooks: {
            before: function (done) {
               Authentication(done);
            }
          }
        }
    });

    router.on({
      '/category/add': {
        as: 'route',
        uses: async function () {
          targe.innerHTML = await handleLayOut({component : AddCategory});
        },
        hooks: {
          before: function (done) {
             Authentication(done);
          }
        }
      }
  });

  router.on({
      '/category/': {
        as: 'route',
        uses: async function () {
          targe.innerHTML = await handleLayOut({component : Category});
        },
        hooks: {
          before: function (done) {
            Authentication(done);
          }
        }
      }
  });
  router.on({
      '/category/edit/:id': {
        as: 'route',
        uses: async function ({ data }) {
          targe.innerHTML = await handleLayOut({component : EditCategory}, data);
        },
        hooks: {
          before: function (done) {
            Authentication(done);
          }
        }
      }
  });

  router.on({
      '/book/add': {
        as: 'route',
        uses: async function ({ data }) {
          targe.innerHTML = await handleLayOut({component : AddBook}, data);
        },
        hooks: {
          before: function (done) {
            Authentication(done);
          }
        }
      }
  });
  router.on({
      '/book': {
        as: 'route',
        uses: async function () {
          targe.innerHTML = await handleLayOut({component : Book})
        },
        hooks: {
          before: function (done) {
            Authentication(done);
          }
        }
      }
  });
  router.on({
      '/book/edit/:id': {
        as: 'route',
        uses: async function ({ data }) {
          targe.innerHTML = await handleLayOut({component : EditBook}, data);
        },
        hooks: {
          before: function (done) {
            Authentication(done);
          }
        }
      }
  });

    router.on('/admin/login',async function () {
        targe.innerHTML = await handleLayOut({component : Login, layout:false})
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