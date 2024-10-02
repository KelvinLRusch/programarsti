//Mostra o alerta antes de carregar a pagina
//alert("teste");

//mostra o alerta após o carregamento completo da pagina(document)
/*$(document).ready(function(){
    alert("teste");
});*/

//$ esta chamando o JQUERY

$(document).ready(function(){
    //adiciona o pattern ao campo do CEP
    $("input[name=cep]").mask("00000-000");

    $("form").on("submit", function(event){
        //interrompe o evento de envio
        event.stopPropagation();

        /*previne (impede) o comportamento padrao
        do navegador ao enviar o formulario, neste caso,
        impede o envio do formulario.*/
        event.preventDefault();
    });

    //chama a funçao ao cep ser alterado
    $("input[name=cep]").on("keyup", function(event){
        //passa o valor do input para a variavel
        let cep = $("input[name=cep]").val();
        
        //Elimina o hifen(-) do CEP
        cep = cep.replace("-","");
        
        //validação de quantidade de caracteres
        if (cep.length == 8) {
            $("input[name=cep]").removeClass("is-invalid");
            alert(cep);
        }else if (cep.length == 0){
            $("input[name=cep]").removeClass("is-invalid");
        }else{
            $("input[name=cep]").addClass("is-invalid");
        }
    });
});