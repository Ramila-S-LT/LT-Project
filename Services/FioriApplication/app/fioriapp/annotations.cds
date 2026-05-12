using  { dbData.srv.api as service } from '../../srv/Service';
annotate service.Order with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'orderNumber',
                Value : orderNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalPrice',
                Value : totalPrice,
            },

            {
                $Type : 'UI.DataField',
                Label : 'shippingAddress_City',
                Value : shippingAddress_ID
            },

            {
                $Type : 'UI.DataField',
                Label : 'product_ID',
                Value : product_ID
            },

        ],
    },

    UI.FieldGroup #OrderItemData : {
        $Type : 'UI.FieldGroupType',
        Data :  [
            {
                $Type : 'UI.DataField',
                Value : OrderItem_ID,
                Label : 'Product_Code'
            },
            {
                $Type : 'UI.DataField',
                Value : productName,
                Label : 'Product_Name'
            },
            {
                $Type : 'UI.DataField',
                Value : quantity,
                Label : 'Quantity'
            },
            {
                $Type : 'UI.DataField',
                Value : unitPrice,
                Label : 'Unit_Price'
            }
        ]
    },

    // UI.FieldGroup #CustomGroup1 : {
    //     $Type : 'UI.FieldGroupType',
    //     Data : [
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'City',
    //             Value : shippingAddress.city
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Region',
    //             Value : shippingAddress.region
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Country',
    //             Value : shippingAddress.country
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Postal_Code',
    //             Value : shippingAddress.postalCode
    //         }
    //     ]
    //},

    UI.FieldGroup #HeaderFacetsData : {
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Order ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Address',
                Value : shippingAddress.city
            }
        ]
    },

    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#HeaderFacetsData'
        }
    ],

    // UI.SelectionFields : [
    //     status
    // ],

    UI.SelectionFields:[
        ID,
        shippingAddress_ID

    ],

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },

        {
            $Type : 'UI.ReferenceFacet',
            ID : 'OrderItemData',
            Label : 'Order_Item_List',
            Target : '@UI.FieldGroup#OrderItemData'
        }

        // {
        //     $Type : 'UI.ReferenceFacet',
        //     ID : 'CustomeFacets',
        //     Label : 'Full Address',
        //     Target : '@UI.FieldGroup#CustomGroup1',
        // }
    ],

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'orderNumber',
            Value : orderNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'status',
            Value : status,
        },
        {
            $Type : 'UI.DataField',
            Label : 'totalPrice',
            Value : totalPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'shippingAddress_ID',
            Value : shippingAddress_ID,
        },
    ],
);



// annotate service.Order with {
//     ID @Common.ValueList : {
//         $Type : 'Common.ValueListType',
//         CollectionPath : 'Order',
//         Parameters : [
//             {
//                 $Type : 'Common.ValueListParameterInOut',
//                 LocalDataProperty : 'ID',
//                 ValueListProperty : 'ID'
//             },
//         ]
//     }
// };


annotate service.Order with {
    shippingAddress @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Address',
        Parameters : [
            {   $Type : 'Common.ValueListParameterInOut', 
                LocalDataProperty : shippingAddress_ID,
                ValueListProperty : 'ID'
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Address_line1'
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'city'
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'region'
            }
        ]
    }
};

annotate service.Order with {
    product @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Product',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'product_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'productName'
            }
        ]
    }
};


// annotate service.OrderLineItem with @(
//     UI.LineItem :[
//         {
//             $Type : 'UI.DataField',
//             Value : productCode,
//             Label : 'Product_Code'
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : productName,
//             Label : 'Product_Name'
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : quantity,
//             Label : 'Quantity'
//         },
//         {
//             $Type : 'UI.DataField',
//             Value : unitPrice,
//             Label : 'Unit_Price'
//         }
//     ]
    

    // UI.FieldGroup #OrderItemlist  : {
    //     $Type : 'UI.FieldGroupType',
    //     Data : [
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Product_Code',
    //             Value : productCode
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Product_Name',
    //             Value : productName
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : Quantity,
    //             Value : quantity
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Unit_Price',
    //             Value : unitPrice
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Total_Price',
    //             Value : totalPrice
    //         },
    //         {
    //             $Type : 'UI.DataField',
    //             Label : 'Order_ID',
    //             Value : order_ID
    //         }
    //     ]
    // },


    // UI.Facets : [
    //     {
    //         $Type : 'UI.ReferenceFacet',
    //         ID : 'OrderItemData',
    //         Label : 'Order_Item_List',
    //         Target : '@UI.FieldGroup#OrderItemlist'
    //     }
    // ]

//);


//-----------------------------------ORIGINAL-----------------------------
// annotate service.Order with {
//     shippingAddress @Common.ValueList : {
//         $Type : 'Common.ValueListType',
//         CollectionPath : 'Address',
//         Parameters : [
//             {
//                 $Type : 'Common.ValueListParameterInOut',
//                 LocalDataProperty : shippingAddress_ID,
//                 ValueListProperty : 'ID',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'Address_line1',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'city',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'region',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'postalCode',
//             },
//         ],
//     }
// };

// annotate service.Order with {
//     product @Common.ValueList : {
//         $Type : 'Common.ValueListType',
//         CollectionPath : 'Product',
//         Parameters : [
//             {
//                 $Type : 'Common.ValueListParameterInOut',
//                 LocalDataProperty : product_ID,
//                 ValueListProperty : 'ID',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'productName',
//             },
//             {
//                 $Type : 'Common.ValueListParameterDisplayOnly',
//                 ValueListProperty : 'Stock',
//             },
//         ],
//     }
// };
//------------------------------------------------------------------------------------------------



