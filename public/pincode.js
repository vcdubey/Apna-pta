function getNearByPostOffice(pincode){
    $.ajax({
        type: "GET",
        url: "https://api.postalpincode.in/pincode/"+pincode,
        success: function(response){
            if(response) {
                console.log(response);
                renderPostOffices(response);
            }
        },
        error: function(){

        }
    });
}