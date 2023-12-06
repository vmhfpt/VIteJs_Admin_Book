import userService from "../../service/userService";
import { router } from "../../router";
export default async function AddUser(){
    window.handleAdd = (thisData) => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`);
        let payload = {
            name : $('#name').val(),
            email : $('#email').val(),
            password : $('#password').val(),
            username : $('#username').val(),
            role : $('#role').val()
        }
        userService.insert(payload)
        .then((data) => {
           return router.navigate('/user');
        })
        //console.log(payload);
    }
    return /*html */`
   
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">
            <span class="text-muted fw-light">Home/</span> Add user
        </h4>
        <div class="my-3">
            <div class="row">
            <div class="col-xl-6">
            <div class="card mb-4">
              
              <div class="card-body">
               
                  <div class="mb-3">
                    <label class="form-label" for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="John Doe">
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="ACME Inc.">
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="email">Email</label>
                    <div class="input-group input-group-merge">
                      <input type="email" id="email" class="form-control" placeholder="john.doe" aria-label="john.doe" aria-describedby="email2">
                      <span class="input-group-text" id="email2">@example.com</span>
                    </div>
                    <div class="form-text"> You can use letters, numbers &amp; periods </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="password">Password</label>
                    <input type="password" id="password" class="form-control phone-mask" placeholder="**********">
                  </div>
                  <div class="mb-3">
                        <label for="defaultSelect" class="form-label">Role</label>
                        <select id="role" class="form-select">
                            <option value="0">Default student</option>
                            <option value="1">Admin</option>
                           
                        </select>
                  </div>
                  
                  <button type="button" class="btn btn-primary" onclick="handleAdd(this)">Add</button>
                
              </div>
            </div>
          </div>
            </div>
        </div>

        <hr class="my-5">
     </div>
   
  </div>`;
}