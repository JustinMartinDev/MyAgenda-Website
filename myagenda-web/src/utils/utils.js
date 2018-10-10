class RequestObject {
    constructor(isDev){
        console.log("Mode Request Dev : " + isDev);
        this.isDev= isDev;
        if(isDev){
            this.header = {
                'Access-Control-Allow-Origin': '*',
                'mode': 'no-cors'
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

}
var reqObj = new RequestObject(true);

export default reqObj;