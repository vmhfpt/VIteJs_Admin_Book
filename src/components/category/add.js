import categoryService from "../../service/categoryService";
import { router } from "../../router";
export default async function AddCategory(){
    window.handleAdd = (thisData) => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`);
        let payload = {
            name : $('#name').val()
        }
        categoryService.insert(payload)
        .then((data) => {
          return router.navigate('/category');
        })
    }
    return /*html */`
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">
            <span class="text-muted fw-light">Home/</span> Add category
        </h4>
        <div class="my-3">
            <div class="row">
            <div class="col-xl-6">
            <div class="card mb-4">
              
              <div class="card-body">
               
                  <div class="mb-3">
                    <label class="form-label" for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="History">
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