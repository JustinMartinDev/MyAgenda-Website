const APIURL = "http://localhost:3001/api";

class MyAgendaAPI {
    constructor(isDev) {
        console.log("Mode Request Dev : " + isDev);
        this.isDev = isDev;
    }

    redirectURL = (url, callback) => {
        let params = encodeURIComponent("url") + "=" + encodeURIComponent(url);

        var myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "*");

        var myInit = {
            method : 'GET',
            headers : myHeaders,
            mode : 'no-cors'
        };

        var myRequest = new Request(APIURL+"/redirectURL/?" + params, myInit);

        fetch(myRequest)
        .then(res => res.json())
        .then((result) => {
                if (this.isDev) console.log(result);
                if(!result.hasError)
                    callback(result, false);
                else
                    callback(result, true);
            },
            (error) => {
                console.log(error);
                if (this.isDev) console.log(error.message);
                if (this.isDev) callback({error : error.message}, true);
                else callback({error : "Erreur l'API n'est pas disponible " + error.message}, true)
            });
    };

    redirectJSON = (url, callback) => {
        let params = encodeURIComponent("url") + "=" + encodeURIComponent(url);

        var myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append('Content-Type', 'application/json');

        var myInit = {
            method : 'GET',
            headers : myHeaders,
            mode : 'no-cors'
        };

        var myRequest = new Request(APIURL+"/redirectJSON/?" + params, myInit);

        fetch(myRequest)
            .then((result) => {
                    if (this.isDev) console.log(result);
                    if(!result.hasError)
                        callback(result, false);
                    else
                        callback(result, true);
                },
                (error) => {
                    console.log(error);
                    if (this.isDev) console.log(error.message);
                    if (this.isDev) callback({error : error.message}, true);
                    else callback({error : "Erreur l'API n'est pas disponible " + error.message}, true)
                });
    };

}

var myAgendaAPI = new MyAgendaAPI(true);
export default myAgendaAPI;