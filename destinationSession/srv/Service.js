const cds = require('@sap/cds');
const axios = require('axios');
const xsenv = require('@sap/xsenv');

xsenv.loadEnv();

module.exports = cds.service.impl(async function() {

    const {SampleDealer} = this.entities;

    this.on('CREATE', SampleDealer, async (req, next) => {

        const {Country, pincode} = req.data;
        console.log(Country, pincode);

        const senddata = await getmapdetails(pincode, Country);
        console.log("send data : ", senddata);

        req.data.lat = senddata[0].lat;
        req.data.lon = senddata[0].lon;

        console.log(req.data.lat);
        console.log(req.data.lon);

     
        const sendlatandlon = await temp(req.data.lat, req.data.lon );
        console.log(sendlatandlon);

        req.data.temp = sendlatandlon[0];
        console.log(req.data.temp);


        await next();
        
        
        

    });

    async function getmapdetails(pincode, Country){

        console.log("Inside func c and p " , Country, pincode);
        
        const map_Conn = await cds.connect.to("MapAPI");

        const getdata = await map_Conn.send({
            method : 'GET',
            path : `/odata/v4/mapsample/getDetailsByPincode(pincode='${pincode}',Country='${Country}')`
        });

        console.log("data :" , getdata);

        return getdata;
    }

    async function temp(lat, lon) {

        const Fore_Conn = await cds.connect.to("ForecastAPI");

        console.log("Get Lat and Lon : ", lat, lon);

        const getdata = await Fore_Conn.send({
            method : 'GET',
            path : `/odata/v4/capital-api/getforecast(lat=${lat}, lon=${lon})`
        });
        console.log("Data in TEMP : ", getdata);

        return getdata;

        
        
    }
})