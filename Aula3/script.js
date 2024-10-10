$(document).ready(function(e) {
    $.getJSON("https://randomuser.me/api/?results=10&nat=br", function(data) {
        for (var i = 0; i < data.results.length; i++) {
            var out = "<tr>";
            out += "<td scope='row'>" + (i+1) + "</td>";
            out += "<td><img class='rounded-circle' src='" + data.results[i].picture.thumbnail + "' /> </td>";
            out += "<td>" + data.results[i].login.username + "</td>";
            out += "<td>" + data.results[i].name.first + "</td>";
            out += "<td>" + data.results[i].name.last + "</td>";
            out += "<td>" + data.results[i].gender + "</td>";
            out += "<td>" + data.results[i].email + "</td>";
            out += "<td>" + data.results[i].phone + "</td>";
            out += "<td>" + data.results[i].location.street.name + " - " + data.results[i].location.street.number + "</td>";
            out += "<td>" + data.results[i].location.city + "</td>";
            out += "<td>" + data.results[i].location.state + "</td>";
            out += "<td>" + data.results[i].location.country + "</td>";
            out += "</tr>"

            $("table tbody").append(out);
            
        }
    });
});