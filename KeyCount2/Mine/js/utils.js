var Utils = (function(){
    var url = "http://localhost:55357/api/";
    return {
        Ajax : {
            buscar : function(endp,sucesso,erro){
                $.ajax({
                    type: "GET",
                    url: url+endp,
                    dataType: "json",
                    success: sucesso,
                    error: erro
                });
            },
            criar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "POST",
                    url: url + endp,
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: sucesso,
                    error: erro
                });
            },
            alterar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "PUT",
                    url: url + endp,
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: sucesso,
                    error: erro
                });
            },
            deletar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "DELETE",
                    url: url+endp+"/"+obj,
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: sucesso,
                    error: erro
                });
            },
            geral :  function(url,sucesso,erro,obj){
                if(obj!=undefined){
                    $.ajax({
                        type: "POST",
                        url: url,
                        contentType: 'application/json',
                        dataType: "json",
                        data: JSON.stringify(obj),
                        success: sucesso,
                        error: erro
                    });
                }else{
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        success: sucesso,
                        error: erro
                    });
                }                    
            }
        },
        Moradia : (function(){
            return{
                estadoKey : function(Estado){
                    var estados = Colecao.Estados,
                    i = estados.length-1;
                    while(Estado!=estados[i].Value && i>0){
                        i--;
                    }
                    return estados[i].Key;
                },
                retornarCidade : function(Estado) {
                    Estado = typeof(Estado) == "string" ? Utils.Moradia.estadoKey(Estado) : Estado;
                    var ArrayCidades = new Array();
                    var Cidade = Colecao.Cidades;
                    for (var i = 0; i < Cidade.length; i++) {
                        if (parseInt(Cidade[i].Key / 100000) == Estado)
                        {
                            Cidade[i].Value = Cidade[i].Value.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
                            Cidade[i].Value = Cidade[i].Value.toLowerCase();
                            ArrayCidades.push(Cidade[i]);
                        }
                    }
                    if(ArrayCidades.length==0){
                        ArrayCidades.push({ "Key": 0, "Value": "Escolha uma opção" });
                    }
                    return ArrayCidades;
                }
            }
        })(),
        navegador : function(){
          var isOpera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
            var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
            var isChrome = !!window.chrome;                          // Chrome 1+
            var isIE = /*@cc_on!@*/false;                            // At least IE6
            if(isChrome){
                return 'Chrome';
            }else if(isFirefox){
                return 'Firefox';
            }else if(isIE){
                return 'IE';
            }else if(isSafari){
                return 'Safari';
            }else if(isOpera){
                return 'Opera';
            }
            return 'Desconhecido';  
        }
        
    }
})();