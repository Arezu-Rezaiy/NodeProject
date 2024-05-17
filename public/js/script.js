

// deleteBtn.addEventListener("click", function(e){
// setTimeout(() => {
    
// message.classList.add("show");
// }, 3000);
// })


document.addEventListener('DOMContentLoaded', () => {
const deleteBtn= document.getElementById("deleting");
const message= document.getElementById("message");




  deleteBtn.addEventListener("click", function(){
    message.classList.add("show");
  })
 
  
});

