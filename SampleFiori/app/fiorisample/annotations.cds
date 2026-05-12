using datasrv.srv.api as service from '../../srv/Service';

annotate service.Order with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>ORDER_ID}',
                Value: ID,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>ORDER_NUMBER}',
                Value: orderNumber,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>ORDER_DATE}',
                Value: date,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>ORDER_TIME}',
                Value: time,
            },
            {
                $Type      : 'UI.DataField',
                Label      : '{i18n>STATUS}',
                Value      : status,
                Criticality: criticality
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>TOTAL_PRICE}',
                Value: totalPrice,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>CUSTOMER_ID}',
                Value: customer_ID,
            },
            {
                $Type             : 'UI.DataFieldWithNavigationPath',
                Label             : 'Customer',
                Value             : customer.customerName,
                Target            : 'customer',
                @HTML5.CssDefaults: {width: '150px'}
            }

        ],
    },


    UI.Facets                    : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneratedGroup',
        },

        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'OrderItemFacet',
            Label : 'Order Items',
            Target: 'orderItem/@UI.LineItem',
        },
        {
            $Type : 'UI.ReferenceFacet',
            //targetElement : 'customer',
            ID    : 'customerdetail',
            Label : 'Customer',
            Target: 'customer/@UI.FieldGroup#Customer'
        }

    // {
    //     $Type : 'UI.ReferenceFacet',
    //     ID : 'Customerdata',
    //     Label : 'Customer Data',
    //     Target : 'customer/@UI.LineItem#Customer'
    // }
    ],
    UI.LineItem                  : [
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>ORDER_ID}',
            Value             : ID,
            @HTML5.CssDefaults: {width: '70px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>ORDER_NUMBER}',
            Value             : orderNumber,
            @HTML5.CssDefaults: {width: '90px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>ORDER_DATE}',
            Value             : date,
            @HTML5.CssDefaults: {width: '90px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>ORDER_TIME}',
            Value             : time,
            @HTML5.CssDefaults: {width: '100px'}
        },
        {
            $Type             : 'UI.DataField',
            Label             : '{i18n>STATUS}',
            Value             : status,
            Criticality       : criticality,
            @HTML5.CssDefaults: {width: '150px'}

        },
        // {
        //     $Type : 'UI.DataFieldForAnnotation',
        //     Label : 'Rating',
        //     Target : '@UI.DataPoint#orderRating'
        // },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'datasrv.srv.api.EntityContainer/addCustomer',
            Label : 'Add Customer'
        },
                {
            $Type : 'UI.DataFieldForAction',
            Action: 'datasrv.srv.api.EntityContainer/GetDetails',
            Label : 'Get Total Order',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'datasrv.srv.api.EntityContainer/IncreaseStock',
            Label : 'Increase Stock'
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'datasrv.srv.api.EntityContainer/removeCustomer',
            Label : 'Remove Customer'
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'datasrv.srv.api.EntityContainer/Shipped',
            Label : 'Ship'
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'datasrv.srv.api.EntityContainer/Delivered',
            Label : 'Deliver'
        },
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'datasrv.srv.api.Calculate',
            Inline            : true,
            Label             : 'Price'
        },

    // {
    //     $Type             : 'UI.DataFieldWithNavigationPath',
    //     Label             : 'Customer',
    //     Value             : customer.customerName,
    //     Target            : 'customer',
    //     @HTML5.CssDefaults: {width: '150px'}
    // }
    ],

    UI.PresentationVariant       : {
        MaxItems      : 2,
        Visualizations: ['@UI.LineItem']
    },

    UI.SelectionFields           : [
        status,
        date,
        customer_ID
    ],

    // UI.DataPoint #orderRating: {
    //     Value : ratings,
    //     TargetValue : 5,
    //     Visualization : #Progress
    // }

    // UI.DataPoint #orderRating : {
    //     Title : 'Rate',
    //     Value : ratings,
    //     TargetValue : 5,
    //     MinimumValue : 0,
    //     MaximumValue : 5,
    //     Visualization : #BulletChart,
    //     CriticalityCalculation : {
    //         ImprovementDirection : #Maximize,
    //         ToleranceRangeLowValue : 3,
    //         DeviationRangeLowValue : 2
    //     }
    // }

UI.HeaderInfo : {
    TypeName : 'Order',
    TypeNamePlural : 'Orders',
    Title : {
        Value : ID,
        
    },
    Description : {
        Value : status
    },
    ImageUrl: customer.imageurl,
    
},


// UI.HeaderFacets : [
//     {
//         $Type : 'UI.ReferenceFacet',
//         Target : ''
//     }
// ]

//UI.HeaderInfo : [],
);


annotate service.OrderItem with @(

    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID
        },

        {
            $Type: 'UI.DataField',
            Label: '{i18n>PRODUCT_NAME}',
            Value: product_ID,

        },

        {
            $Type: 'UI.DataField',
            Label: '{i18n>QUANTITY}',
            Value: quantity,
        },

        {
            $Type: 'UI.DataField',
            Label: '{i18n>TOTAL_PRICE}',
            Value: totalPrice,
        },

        {
            $Type: 'UI.DataField',
            Label: '{i18n>ORDER_ID}',
            Value: order_ID,
        },

        {
            $Type : 'UI.DataFieldForAction',
            Label : 'Delete Record',
            Action : 'datasrv.srv.api.deleteRecord'
        }

    ],


    // UI.SelectionFields #filter : [
    //     quantity
    // ],


    //  UI.Identification: [
    //     {
    //         $Type: 'UI.DataField',
    //         Value: product_ID
    //     },
    //     {
    //         $Type: 'UI.DataField',
    //         Value: quantity
    //     },
    //     {
    //         $Type: 'UI.DataField',
    //         Value: totalPrice
    //     }
    // ],

    UI.Facets  : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'ProductDatas',
            Label : 'Product Details',
            Target: 'product/@UI.FieldGroup#ProductDetails',
        }
    ]

);


annotate service.OrderItem with {
    product @(
        Common.Text       : product.productName, //new
        UI.TextArrangement: #TextOnly,
        //new
        Common.ValueList  : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Products',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: product_ID,
                    ValueListProperty: 'ID'
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'productName'
                }
            ]

        }
    )
};


annotate service.Order with {
    customer @(
        Common.Text       : customer.customerName,
        UI.TextArrangement: #TextOnly,
        Common.ValueList  : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Customers',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: customer_ID,
                    ValueListProperty: 'ID',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'customerName',
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'address',
                },
            ],
        },


    )
};


// annotate service.Customers with
// @UI.Identification: [

//     {
//         $Type: 'UI.DataField',
//         Label: 'Customer Name',
//         Value: customerName
//     },
//     {
//         $Type: 'UI.DataField',
//         Label: 'Address',
//         Value: address
//     }

// ];

annotate service.Customers with @(
    UI.FieldGroup #Customer : {
        Data : [
            {
                $Type : 'UI.DataField',
                Value : customerName,
                Label : '{i18n>CUSTOMER_NAME}'
            },
            {
                $Type : 'UI.DataField',
                Value : address,
                Label : '{i18n>ADDRESS}'
            },
            {
                $Type : 'UI.DataField',
                Value: imageurl,
                Label : '{i18n>IMAGE_URL}'
            }, 
            {
                $Type : 'UI.DataFieldForAnnotation',
                Target : '@Communication.Contact',
                Label : 'Customer Data',
            }
        ]
    },

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'General Info Customer',
            Target : '@UI.FieldGroup#Customer'
        }
    ]   
);

annotate service.Customers with {
    imageurl @UI.IsImageURL;
};

annotate service.Customers with @(
    Communication.Contact : {
            fn : customerName,
            email : [{
                type : #work,
                address : email
            }],

            tel : [{
                type : #work,
                uri : phoneNo
            }]            
    },
    Common.IsNaturalPerson : true  
);








annotate service.Products with @(UI.FieldGroup #ProductDetails: {
    $Type: 'UI.FieldGroupType',
    Data : [
        // {
        //     $Type: 'UI.DataFieldWithUrl',
        //     Label : 'ProductName',
        //     Value : productName
        // },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>PRODUCT_NAME}',
            Value: productName
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>UNIT_PRICE}',
            Value: unitPrice
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Label : '{i18n>RATING}',
            Target : '@UI.DataPoint#Raing'
        },{
            $Type : 'UI.DataField',
            Label : 'Stock',
            Value : stock
        }
    ]
},

UI.DataPoint #Raing : {
    Value : rating,
    TargetValue : 5,
    Visualization : #Progress
}

);

// annotate service.Order with actions {
//     Calculate @Common.IsActionCritical: true
// };

annotate service.Order with actions {
    Calculate @Common.SideEffects: {TargetProperties: ['totalPrice']}
}
