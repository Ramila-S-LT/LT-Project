using MyService as service from '../../srv/Service';
annotate service.Students with @(
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
                Label : 'Student_Name',
                Value : Student_Name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Dept',
                Value : Dept,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Fee_Status',
                Value : Fee_Status,
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Student_Name',
            Value : Student_Name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Dept',
            Value : Dept,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Fee_Status',
            Value : Fee_Status,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'MyService.update',
            Label : '{i18n>Paid}',
            Inline : true,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'MyService.calculate',
            Label : 'calculate',
            Inline : true,
        },
    ],
);

