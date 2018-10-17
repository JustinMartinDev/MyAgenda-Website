class MyAgendaAPI {
    constructor(isDev) {
        console.log("Mode Request Dev : " + isDev);
        this.isDev = isDev;
    }

    redirectURL = (url, callback) => {
        let params = encodeURIComponent("url") + "=" + encodeURIComponent(url);

        fetch("/api/redirectURL/?" + params)
            .then((result) => result.json())
            .then((result) => {
                if (this.isDev) console.log(result);
                callback(result, result.hasError);
            },
                (error) => {
                    console.log(error);
                    if (this.isDev) console.log(error.message);
                    if (this.isDev) callback({ error: error.message }, true);
                    else callback({ error: "Erreur l'API n'est pas disponible " + error.message }, true)
                });
    };

    redirectJSON = (url, callback) => {
        let params = encodeURIComponent("url") + "=" + encodeURIComponent(url);

        fetch("/api/redirectJSON/?" + params)
            .then(response => response.json())
            .then((result) => {
                result = result[0]
                if (this.isDev) console.log(result);
                callback(result, result.hasError);
            },
                (error) => {
                    if (this.isDev) console.log(error);
                    if (this.isDev) callback({ error: error.message }, true);
                    else callback({ error: "Erreur l'API n'est pas disponible " + error.message }, true)
                });
    };

}

var myAgendaAPI = new MyAgendaAPI(true);
export default myAgendaAPI;