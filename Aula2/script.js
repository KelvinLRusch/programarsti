$(document).ready(function(){
    $("#button1").on("click",function(event){
        $.getJSON("./data.json", function(data){
            //alert(data.name);
            $("#resultado1").append(data.name + ", ");
            $("#resultado1").append(data.age + " anos ");
            for (let index = 0; index < data.cars.length; index++) {
                $("#resultado1").append(data.cars[index] + " ");
            }
            $("#resultado1").append("<br>");
        });
    });

    $("#button2").on("click",function(event){
        $.getJSON("./data2.json", function(data2){
            $("#resultado2").append(data2.name + ", " + data2.age + " anos <br>");

            for (let x = 0; x < data2.friends.length; x++) {
                let friend = data2.friends[x].firstName + " " + data2.friends[x].lastName;
                $("#resultado2").append("Amigo " + (x+1) + ": " + friend + "<br>");
            }

            $("#resultado2").append("Total de amigos do John: " + data2.friends.length);
        });
    });

    $("#button3").on("click",function(event){
        $.getJSON("./data3.json", function(data3){
            for (var x in data3.results) {
                $("#resultado3").append(data3.results[x].gender + "<br>");
                $("#resultado3").append(data3.results[x].name.first + "<br>");
                $("#resultado3").append(data3.results[x].email + "<br>");
            }
            $("#resultado3").append(data3.info.seed + "<br>");
        });
    });

    $("#limpar").on("click",function(event){
        $("div[id^=resultado]").empty();
    });
});