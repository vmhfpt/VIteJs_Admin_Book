
export default function Authentication(done){
   let token = JSON.parse(localStorage.getItem("auth"));
   if(!token || (token && token.role == 0)){
     window.location = '/admin/login';
   }else {
     done();
   }
}