const fetch = require('node-fetch');
const FormData = require('form-data');

const itemToAdd = {
  _overheadLength: 0,
  _valueLength: 0,
  _valuesToMeasure: [],
  writable: false,
  readable: true,
  dataSize: 0,
  maxDataSize: 2097152,
  pauseStreams: true,
  _released: false,
  _streams: [],
  _currentStream: null,
  _insideLoop: false,
  _pendingNext: false,
  cartItems: [
    {
      toolID: 'ae3b32c2-2432-43fe-b07b-311211c255e7',
      MyCartItemReference: 'DR_ZUt0UXlRG',
      modelID: '6e0ede4a-5507-48d5-8eac-cec6682cded5',
      fileScaleFactor: 1,
      materialID: '035f4772-da8a-400b-8be4-2dd344b28ddb',
      finishID: 'bba2bebb-8895-4049-aeb0-ab651cee2597',
      quantity: 1,
      xDimMm: 23.11,
      yDimMm: 8,
      zDimMm: 22.99,
      volumeCm3: 0.19,
      surfaceCm2: 5.11,
      iMatAPIPrice: 12.75,
      mySalesPrice: 14.66,
      currency: 'EUR',
    },
  ],
};

/* data puede ser cualquier valor das, value, etc igual funciona y es importante el contenType que tanto en postman y browser aparentement le pone automatico
pero en node.js no entonces hay que especificar ademas de volver string todo el data, no solo una parte como. Lo malo de usar su api que solo bota un error
muy generico entonces se tuvo que debugear para encontrar una solucion o porque la rest api rechazaba aun probando con distintas formas. 
Su documentacion solo habla de json body pero no habla de crear un form-data y que su data sea tipo json
Error: " 401	Wrong request body. Check if all parameters set correctly "

*/
const createItemCar = requestQuery => {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('data', JSON.stringify(requestQuery), { contentType: 'application/json' }); // Este es el punto clave en el formData contentType sin eso no funciona
    const headers = form.getHeaders();                                                                     
    const options = {
      method: 'POST',
      body: form,
      headers: {
        ...form.getHeaders()
      }
    };
    fetch('https://imatsandbox.materialise.net/web-api/cartitems/register', options)
    .then((res) => {
        return res.json();
    }).then((json) => {
        resolve(json);
    });
  });
};
//console.log(itemCartData)
/** llamada a la funcion que realiza la request pasandole el objeto formdata */
createItemCar(itemToAdd)
  .then(resp => console.log('resp ', resp, 'resp'))
  .catch(err => console.log('err ', err, ' err'));
