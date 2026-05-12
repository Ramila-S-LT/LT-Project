const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const {Sample} = this.entities;
    const LOG = cds.log('Sample-Srv');

    this.on('CREATE', Sample, async (req) => {

        LOG.info('Request received', {data: req.data});

        try{
            if(!req.data.name) {
                LOG.warn('Validation failed : Name missing', {data: req.data});
                return req.error(400, 'Name is required');
            }

            if(!req.data.location) {
                LOG.warn('Validation failed : Location is missing', {data: req.data});
                return req.error(400, 'Location is required');
            }

            LOG.info('Data Created Successfully', {
                id : req.data.ID
            });

            return req.data;

        } catch(err) {

            LOG.error('Error while creating customer', {
                message : err.message
            });

            throw err;
        }

    });
})
