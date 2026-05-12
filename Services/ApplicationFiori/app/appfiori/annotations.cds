using datasrv.srv.api as service from '../../srv/Service';
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
                Label : 'date',
                Value : date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'time',
                Value : time,
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
                Label : 'customer_ID',
                Value : customer_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },

        {
            $Type : 'UI.ReferenceFacet',
            ID : 'OrderItemFacet',
            Label : 'Order Items',
            Target : 'orderItem/@UI.LineItem'
        }
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
            Label : 'date',
            Value : date,
        },
        {
            $Type : 'UI.DataField',
            Label : 'time',
            Value : time,
        },
        {
            $Type : 'UI.DataField',
            Label : 'status',
            Value : status,
        },
    ],

    // UI.Identification : [
    //     {
    //         $Type : 'UI.DataFieldForAction',
    //         Action : 'datasrv.srv.api.EntityContainer/Status',
    //         Label : 'Change Status'
    //     }
    // ]

);

annotate service.OrderItem with @UI.LineItem : [

    {
        $Type : 'UI.DataField',
        Label : 'Product_ID',
        Value : product_ID,
    },

    {
        $Type : 'UI.DataField',
        Label : 'Quantity',
        Value : quantity,
    },

    {
        $Type : 'UI.DataField',
        Label : 'Unit_Price',
        Value : unitPrice, 
    },

    {
        $Type : 'UI.DataField',
        Label : 'Total_Price',
        Value : totalPrice,
    },

];

// annotate service.Order with {

//     totalPrice @UI.DataFieldDefault: #ReadOnly;
// };

annotate service.OrderItem with {
    product @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Products',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : product_ID,
                ValueListProperty : 'ID'
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'productName'
            }
        ]

    }
}

annotate service.Order with {
    customer @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Customers',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : customer_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'customerName',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'address',
            },
        ],
    }
};

