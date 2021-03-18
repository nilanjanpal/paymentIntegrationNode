const mapMyIndiaKey = 'gcyo5k3umrux4sorrbp4lgww3akuntf3';
const mapMyIndiaUrl = 'https://apis.mapmyindia.com/advancedmaps/v1/';
const https = require('https');

exports.fetchAddress = (req, res, next) => {
    const url = mapMyIndiaUrl + mapMyIndiaKey + '/rev_geocode?lat=' + req.body.latitude + '&lng=' + req.body.longitude;
    let data = '';
    let status;
    const request = https.request(url, response => {
             
        response.on('data', d => {
          data = data + d;
          res.end(data);
        })
      })
      
      req.on('error', error => {
        console.error(error)
      });
      
      request.end();
}