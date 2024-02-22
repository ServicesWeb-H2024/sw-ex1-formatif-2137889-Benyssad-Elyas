const Netflix = require("../models/netflix.model.js");

exports.listerTypeNetflixPage = (req, res) => {

    let type = req.params.type 
    let page = req.query.page

    if(!page){
        page = 1
    }

    Netflix.listerElements(type)

    .then((element) => {

        let numeroPage = page
        let tabElement = element
        let nombreElement = tabElement.length;
        let nombreParPage = 10
        let nombrePage = Math.ceil(nombreElement / nombreParPage);
        let debutIndex = (numeroPage - 1) * nombreParPage + 1; 
        let finIndex = debutIndex + nombreParPage - 1
        let numeroPageSuivant = parseInt(numeroPage) + 1

        if (!element[0]) {
            res.status(400);
            res.send({
                message: `Le type ${type} est invalide`
            });
            return;
        }

        if (numeroPage > nombrePage) {
            res.status(404);
            res.send({
                message: `La page ${page} n'existe pas`
            });
            return;
        }
        
        if (nombreElement < nombreParPage){
            res.status(200);
            res.send({
                "titres" : tabElement.slice(debutIndex,finIndex),
                "filtre": type,
                "page" : numeroPage,
                "totalPage" : nombrePage,
                "url_page_suivante" : "/api/titres/" + type + "?page=" +  numeroPageSuivant
                });
        }
        else 
        {
            res.send({
                "titres" : tabElement.slice(debutIndex,finIndex),
                "filtre": type,
                "page" : numeroPage,
                "totalPage" : nombrePage,
                "url_page_suivante" : "/api/titres/" + type + "?page=" +  numeroPageSuivant
                });
        }
        
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des elements avec le type " + type
        });
    });

};