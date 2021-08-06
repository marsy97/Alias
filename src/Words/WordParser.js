const fs = require('fs')

let words=""


let fck = new Promise((resolve, reject) => {

    fetch('/AliasRijeci.txt')
        .then((r) => r.text())
        .then(text => {
            words = text;
            const arrayedWords = words.split('\n')
            resolve(arrayedWords);
        }).catch((err)=>reject(err))
  
})



module.exports = {fck}
