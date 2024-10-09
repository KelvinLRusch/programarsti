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
        });
    });

    $("#limpar").on("click",function(event){
        $("div[id^=resultado]").empty();
    });
});