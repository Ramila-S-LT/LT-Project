sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"samplefio/appfiori/test/integration/pages/OrderList",
	"samplefio/appfiori/test/integration/pages/OrderObjectPage",
	"samplefio/appfiori/test/integration/pages/OrderItemObjectPage"
], function (JourneyRunner, OrderList, OrderObjectPage, OrderItemObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('samplefio/appfiori') + '/test/flp.html#app-preview',
        pages: {
			onTheOrderList: OrderList,
			onTheOrderObjectPage: OrderObjectPage,
			onTheOrderItemObjectPage: OrderItemObjectPage
        },
        async: true
    });

    return runner;
});

