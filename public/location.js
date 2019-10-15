function setLocation(data) {
    $("#current-location").text(data.formatted_address)
}

function renderPostOffices(data) {
    var dom = "<table><th>Name</th>";
    var postOffices = data[0].PostOffice;
    for(i=0; i<postOffices.length; i++){
        dom += '<tr><td>' +  postOffices[i].Name + '</td></tr>';
    }
    dom += "</table>"
    $("#postoffices").html(dom);
}