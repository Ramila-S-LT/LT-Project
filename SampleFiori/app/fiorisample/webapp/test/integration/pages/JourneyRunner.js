sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"samp/fiorisample/test/integration/pages/OrderList",
	"samp/fiorisample/test/integration/pages/OrderObjectPage",
	"samp/fiorisample/test/integration/pages/OrderItemObjectPage"
], function (JourneyRunner, OrderList, OrderObjectPage, OrderItemObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('samp/fiorisample') + '/test/flp.html#app-preview',
        pages: {
			onTheOrderList: OrderList,
			onTheOrderObjectPage: OrderObjectPage,
			onTheOrderItemObjectPage: OrderItemObjectPage
        },
        async: true
    });

    return runner;
});

