const FormData = require('form-data')
const Request = require('request');

/** Datos para montar el objeto formData */
let toolID = 'ae3b32c2-2432-43fe-b07b-311211c255e7';
let MyCartItemReference = 'DR_ZUt0UXlRG';
let modelID = '6e0ede4a-5507-48d5-8eac-cec6682cded5';
let fileScaleFactor = 1;
let materialID = '035f4772-da8a-400b-8be4-2dd344b28ddb';
let finishID = 'bba2bebb-8895-4049-aeb0-ab651cee2597';
let quantity = 1;
let xDimMm = 23.11;
let yDimMm = 8.00;
let zDimMm = 22.99;
let volumeCm3 = 0.19;
let surfaceCm2 = 5.11;
let iMatAPIPrice = 12.75;
let mySalesPrice = 14.66;
let currency = 'EUR'

/* creacion del objeto formData */
let itemCartData = new FormData({
    cartItems: [
        {
        'toolID':toolID,
        'MyCartItemReference' : MyCartItemReference,
        'modelID': modelID,
        'fileScaleFactor': fileScaleFactor,
        'materialID' : materialID,
        'finishID' : finishID,
        'quantity' : quantity,
        'xDimMm' : xDimMm,
        'yDimMm' : yDimMm,
        'zDimMm' : zDimMm,
        'volumeCm3' : volumeCm3,
        'surfaceCm2' : surfaceCm2,
        'iMatAPIPrice' : iMatAPIPrice,
        'mySalesPrice' : mySalesPrice,
        'currency': currency
    }],
  });

/** funcion que realiza la request */
const createItemCar = (requestQuery) => {
    return new Promise((resolve,reject) => {
        Request.post({
            "headers": {
                "Accept": "application/json",
                "Content-Type":"multipart/form-data",
                "Content-Length":  requestQuery.length
            },
            "url": "https://imatsandbox.materialise.net/web-api/cartitems/register",
            "formData": JSON.stringify(requestQuery)
        }, (error, response, body) => {
            if(error){                
                reject(error)                
            }   

            resolve(body)

        });
    })
}
//console.log(itemCartData)
/** llamada a la funcion que realiza la request pasandole el objeto formdata */
createItemCar(itemCartData)
    .then(resp => console.log(resp))
    .catch(err => console.log(err));