const sql = require("../config/db.js");

const Netflix = (element) => {
    this.show_type = element.show_type;
    this.title = element.title;
};


Netflix.listerElements = (type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT show_id, title FROM netflix_titles WHERE show_type = ? `;
        
        const params = [type]
        
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};


module.exports = Netflix;