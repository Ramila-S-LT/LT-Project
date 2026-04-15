sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"boundactions/test/integration/pages/StudentsList",
	"boundactions/test/integration/pages/StudentsObjectPage"
], function (JourneyRunner, StudentsList, StudentsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('boundactions') + '/test/flp.html#app-preview',
        pages: {
			onTheStudentsList: StudentsList,
			onTheStudentsObjectPage: StudentsObjectPage
        },
        async: true
    });

    return runner;
});

