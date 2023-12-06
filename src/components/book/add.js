import ClassicEditor from "../../service/ckeditorService";
import categoryService from "../../service/categoryService";
import bookService from "../../service/bookService";
import { router } from "../../router";




export default async function AddBook(){
    
    var editors;
   
    
    categoryService.getAll().then((data) => {
        data.map((item) => {
            $('#category_id').append(`<option value="${item.id}"> ${item.name}</option>`);
        })
        ClassicEditor.create( document.querySelector( '#ckeditor' ))
        .then( editor => {
            editors = editor;
        });
    })
    function readURL(input) {
        if (input.files && input.files[0]) {


            var reader = new FileReader();
            reader.onload = function (e) {
            $(".img-fluid").attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

   

    window.changeFile = (thisData) => {
        $(thisData).val().split("\\").pop();
        readURL(thisData);
    }
    window.submitAdd = (thisData) => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`);
        let formData = new FormData();
        let payload = {
            title : $('#title').val(),
            category_id : $('#category_id').val(),
            author : $('#author').val(),
            year : $('#year').val(),
            isbn : $('#isbn').val(),
            content : editors.getData()
        }
        Object.keys(payload).forEach(key => {
            formData.append(key, payload[key])
        });
        formData.append("image", $("#customFile")[0].files[0]);
        bookService.create(formData)
        .then((data) => {
            return router.navigate('/book');
        })

    }

    return /*html */`
    <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">
            <span class="text-muted fw-light">Home/</span> Add book
        </h4>
        <div class="my-3 bg-white py-5 px-5">
                <div class="row">
                <div class="col-6">
                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label" for="basic-default-name">Title</label>
                    <div class="col-sm-10">
                        <input  type="text" class="form-control" id="title" placeholder="Enter title ...">
                    </div>
                    </div>
                    <span class="text-danger error-name">* Title is required </span>

                    <div class="row mb-3">
                    <label class="col-sm-2 col-form-label" for="basic-default-name">Category</label>
                    <div class="col-sm-10">
                        <select  id="category_id" class="form-control">
                            
                        </select>
                    </div>
                    </div>
                </div>
                <div class="col-6">
                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label" for="basic-default-name">Author</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="author" placeholder="Enter author ...">
                    </div>
                    </div>
                    <span class="text-danger error-price">* Author is required </span>
                    <div class="row mb-3">
                    <label class="col-sm-2 col-form-label" for="basic-default-name">Year publish</label>
                    <div class="col-sm-10">
                        <input  type="number" class="form-control" id="year" placeholder="Enter year...">
                    </div>
                    </div>
                    <span class="text-danger error-price-sale">* Year is required </span>
                </div>
                <div class="col-12">
                    <div class="row mb-3">
                        <label class="col-sm-1 col-form-label" for="basic-default-name">Isbn</label>
                        <div class="col-sm-11">
                            <input  type="text" class="form-control" id="isbn" placeholder="Enter isbn code ...">
                        </div>
                    </div>
                    <span class="text-danger error-price-sale">* Isbn code is required </span>
                </div>
                <div class="col-12">
                <div class="row mb-3">
                    <label class="col-sm-12 col-form-label" for="basic-default-name">Content</label>
                    <div class="col-sm-12">
                        <textarea   class="form-control" name="" id="ckeditor" cols="30" rows="10"></textarea>
                    </div>
                    </div>
                    <span class="text-danger error-content">* Content is required </span>
                </div>
            </div>

            <div class="row mb-3">
            <label class="col-sm-1 col-form-label" for="basic-default-name">Image</label>
            <div class="col-sm-11">
                <div>
                    <label for="formFileDisabled" class="form-label">Upload image for book</label>
                    <input onchange="changeFile(this);" class="form-control" type="file" id="customFile" >
                    </div>
            </div>
            
            </div>
            <div class="row mb-3">
            <div class="col-sm-1"></div>
            <div class="col-sm-2">
                <img src="https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg" alt="" class="w-100 img-fluid">
            </div>
            
            </div>
            <div class="row">
                <div class="col-4 d-flex gap-3">
                    <a href="/book" data-navigo><button type="button" class="btn btn-label-secondary btn btn-success" >List books</button></a>
                    <button onclick="submitAdd(this);" type="button" class="btn btn-primary submit-add">Add</button>
                </div>
            </div>
        </div>

        <hr class="my-5">
     </div>
   
  </div>`;
}