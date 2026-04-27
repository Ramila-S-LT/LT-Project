const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {

    const {A_BusinessPartnerAddress} = this.entities;

    const s4 = await cds.connect.to('API_BUSINESS_PARTNER');
    
    const exe = await cds.connect.to('MAPAPI');

    this.on('READ', A_BusinessPartnerAddress, async (req) => {
        
        const data = await s4.run(req.query.limit(5));

        console.log(data);

        const latdata =  await Promise.all(data.map(async (ele) => {
             const CountryCode = ele.Country;
    
             const res = await exe.get(`/countryInfoJSON?country=${CountryCode}&username=ramila`);
        
             const CountryName = res.geonames[0].countryName;
             console.log("CountryName :", CountryName);


            return {...ele,  CountryName }
              
        }));

        console.log(latdata);
        
        return latdata;
    })


})














// const s4 = await cds.connect.to('API_BUSINESS_PARTNER');

    // this.on('READ', A_BusinessPartnerAddress, async (req) => {
    //     console.log(req.query);

    //     const data = await s4.run(req.query);
    //     console.log(data);

    //     return data;
    // })