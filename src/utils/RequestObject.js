class RequestObject {
    constructor(isDev){
        console.log("Mode Request Dev : " + isDev);
        this.isDev= isDev;
        if(isDev){
            this.header = {
                "Access-Control-Allow-Origin": "*",
                "mode": "no-cors"
            };
        }
        else this.header  = {};
    }

    checkUrlValidate = (url, component) => {
        fetch(url, this.header)
            .then((result) => {
                if(this.isDev) console.log(result);
                component.hasBeenVerified(url);
            },
            (error) => {
                if(this.isDev) console.log(error.message);
                if(this.isDev) component.notVerified(url, error.message);
                else component.notVerified(url, "Erreur l'URL est invalide, ou le serveur inaccesible");
            });
    };
    getRessourcesAsJson = (url, component) => {
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    if(this.isDev) console.log(result);
                    component.hasBeenLoaded(result);
                },
                (error) => {
                    if(this.isDev) console.log(error.message);
                    if(this.isDev) component.notLoaded(error.message);
                    else component.notLoaded(url, "Erreur impossible de récupérer le fichier ressources");
                });
    };
    getHTMLPage = (url) => {
        //var urlTarget = "http://localhost:3001/api/redirectURL/"+url.splice("https")[0];
        fetch("http://localhost:3001/api/redirectURL/", {
            method : 'GET',
            body : {url: url},
            headers : this.headers
        })
            .then(function(response){
                console.log(response);
                //response.text();
            })
            .then((body) => {
                    if(this.isDev){
                        console.log(body);
                    }
                   //component.htmlLoaded(url, result);
                },
                (error) => {
                    if(this.isDev) console.log(error.message);
                  //  if(this.isDev) component.htmlError(error.message);
                    ///else component.htmlError("Erreur lors de la requete"); //todo add request bug serveur open ticket
                }
            );
    };
   // login(url, component, params)
}
var reqObj = new RequestObject(true);

export default reqObj;