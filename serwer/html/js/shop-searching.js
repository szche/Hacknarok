console.log("Test");

var shop_name = undefined;

function move_to_add_to_queue(){
    
    console.log($(this).text());
    console.log(move_to_add_to_queue);
    
}




$(document).ready(function(){
    $('#shop_name_input').on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".card").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });