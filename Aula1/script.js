//Mostra o alerta antes de carregar a pagina
//alert("teste");

//mostra o alerta após o carregamento completo da pagina(document)
/*$(document).ready(function(){
    alert("teste");
});*/

//$ esta chamando o JQUERY

$(document).ready(function(){
    /* Define a variável "resposta" como variável global
    para que ela seja acessível à partir de qualquer função*/
    let resposta = false;
    
    //adiciona o pattern ao campo do CEP
    $("input[name=cep]").mask("00000-000");
    $("input[name=num]").mask("#")
    $("form").on("submit", function(event){
        //interrompe o evento de envio
        event.stopPropagation();

        /*previne (impede) o comportamento padrao
        do navegador ao enviar o formulario, neste caso,
        impede o envio do formulario.*/
        event.preventDefault();
    });

    $("input[name=tel]").mask("(00) 00000-0000");
    $("input[name=tel]").on("keyup", function(){
        let tel = $("input[name=tel]").val();
        tel = tel.replace(/[\D]/g, '');
        if(tel.length < 11) {
            maskara = "(00) 0000-00000";
        } else {
            maskara = "(00) 00000-0000";
        }

        $("input[name=tel]").mask(maskara);
    })

    //chama a funçao ao cep ser alterado
    $("input[name=cep]").on("keyup", function(event){
        //passa o valor do input para a variavel
        let cep = $("input[name=cep]").val();
        
        //Elimina o hifen(-) do CEP
        cep = cep.replace("-","");
        
        //validação de quantidade de caracteres
        if (cep.length == 8) {
            //alert(cep);
            $.ajax("https://viacep.com.br/ws/" + cep + "/json")
            .done(function(data){
                resposta = JSON.parse(data);
                if(!resposta.erro){
                    $("input[name=cep]").removeClass("is-invalid");
                    $("input[name=rua]").val(resposta.logradouro);
                    if(resposta.logradouro !== ""){
                        $("input[name=rua]").prop("disabled",true);
                    }
                    $("input[name=complemento]").val(resposta.complemento);
                    $("input[name=bairro]").val(resposta.bairro);
                    if(resposta.bairro !== ""){
                        $("input[name=bairro]").prop("disabled",true);
                    }
                    $("select[name=estado]").val(resposta.uf);
                    $("select[name=estado]").trigger("change");
                    $("select[name=estado]").prop("disabled",true);
                    $("select[name=cidade]").prop("disabled",true);
                }
                
            })
            .fail(function(data){
                respota = {"erro": "true"}
            });
            
        }else if (cep.length == 0){
            $("input[name=cep]").removeClass("is-invalid");
        }else{
            $("input[name=cep]").addClass("is-invalid");
            $("select[name=estado]").val("");
            $("select[name=cidade]").val("");
            $("input[name=rua]").val("");
            $("input[name=bairro]").val("");

            $("select[name=estado]").prop("disabled",false);
            $("select[name=cidade]").prop("disabled",false);
            $("input[name=rua]").prop("disabled",false);
            $("input[name=bairro]").prop("disabled",false);

            $("select[name=cidade]").empty();
            $("select[name=cidade]").append('<option value="">Primeiro selecione o estado</option>');
        }
    });

    const urlEstados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    $.getJSON(urlEstados, function(data){
        data.sort(function(a,b){
            return a.nome.localeCompare(b.nome);
        });

        data.forEach(function(estado){
            $("select[name=estado]").append(`<option value="${estado.sigla}">${estado.nome}</option>`);
        })
    })

    $(`#estado`).on(`change`, function(){
        let estadoId = $(this).val();

        if(estadoId){
            const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;
            $.getJSON(urlCidades, function(data){
                $("#cidade").empty();
                $("#cidade").append('<option value="">Selecione a cidade</option>');

                data.sort(function(a,b){
                    return a.nome.localeCompare(b.nome);
                });

                data.forEach(function(cidade){
                    $("#cidade").append(`<option value="${cidade.nome}">${cidade.nome}</option>`);
                });

                $("select[name=cidade]").val(resposta.localidade);
            });
        }else{
            $("select[name=cidade]").empty();
            $("select[name=cidade]").append('<option value="">Primeiro selecione o estado</option>');
        }
    })
});