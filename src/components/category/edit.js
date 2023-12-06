import categoryService from "../../service/categoryService";
import { router } from "../../router";
export default async function EditCategory(params){
    const dataItem = await categoryService.findOneById(params.id);
    window.handleUpdate = (thisData)  => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`);
        let payload = {
          name : $('#name').val(),
        }
        categoryService.update(params.id, payload)
        .then((data) => {
            if(data.status == 'success'){
                return router.navigate('/category');
            }
        })
      }
    return /*html */`
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">
            <span class="text-muted fw-light">Home/</span> Edit category "${dataItem.name}"
        </h4>
        <div class="my-3">
            <div class="row">
            <div class="col-xl-6">
            <div class="card mb-4">
              
              <div class="card-body">
               
                  <div class="mb-3">
                    <label class="form-label" for="name">Name</label>
                    <input value="${dataItem.name}" type="text" class="form-control" id="name" placeholder="History">
                  </div>
                  <div class="d-flex gap-3">
                    <button type="button" class="btn btn-warning" onclick="handleUpdate(this)">Update</button>
                    <a href="/category" data-navigo> <button type="button" class="btn btn-success" >List categories</button></a>
                  </div>
                
              </div>
            </div>
          </div>
            </div>
        </div>

        <hr class="my-5">
     </div>
   
  </div>`;
}