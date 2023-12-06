import userService from "../../service/userService";
export default async function User(){
    var idDelete = 0;
    const dataItem = await userService.index();
    window.confirmDelete =(thisData) => {
      idDelete = $(thisData).attr('data-delete');
      $('.show-popup').html(`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Are you sure ?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
  
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button onclick="handleDelete(this)" type="button" class="btn btn-primary delete-item">Ok</button>
          </div>
        </div>
      </div>
    </div>`);
      $('#exampleModal').modal('toggle');
    }
    window.handleDelete = (thisData) => {
      $(thisData).prop('disabled', true);
      $(thisData).empty();
      $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>`);
    
      userService.delete(idDelete)
      .then((data) => {
         if(data.status == 'delete success'){
            $('#exampleModal').modal('toggle');
            $('#exampleModalLabelCustom').text(`Delete user successfully`);
            $('#exampleModalSuccess').modal('toggle');
            $(`#${idDelete}`).remove();
         }
      })
    }
    return ( /*html*/`
    <div class="show-popup"></div>
    <div class="modal fade" id="exampleModalSuccess" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabelCustom">Delete successfully</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>
    <div class="content-wrapper">


    <div class="container-xxl flex-grow-1 container-p-y">


      <h4 class="fw-bold py-3 mb-4">
        <span class="text-muted fw-light">Home/</span> List Users
      </h4>

      <div class="card">
        <h5 class="card-header">Manager user</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0 ">

            
            ${dataItem.map((item, key) => (
                /*html */`<tr id="${item.id}">
                <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>#${(key) + 1}</strong></td>
                <td>${item.name}</td>
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td>${item.role == 0 ? `<span class="badge bg-label-success me-1">student</span>` : `<span class="badge bg-label-danger me-1">admin</span>`}</td>
                <td>
                    <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item btn-edit-handle" href="/user/edit/${item.id}" data-navigo><i class="bx bx-edit-alt me-1"></i> Edit</a>
                        <a onclick="confirmDelete(this)" data-delete="${item.id}" class="dropdown-item confirm-delete" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                    </div>
                    </div>
                </td>
            </tr>`
            )).join('')}

              
            </tbody>
          </table>
        </div>
      </div>

      <div class="my-3">
        <div class="demo-inline-spacing">

          <a  href="/user/add" class="" data-navigo> <button type="button" class="btn btn-success add-handle ">Add user</button></a>

        </div>
      </div>

      <hr class="my-5">
    </div>
    <div class="content-backdrop fade"></div>
  </div>
    `);
}