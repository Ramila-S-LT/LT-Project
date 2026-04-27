namespace Destsidebyside;

using {API_MAINTENANCEITEM as db} from './external/API_MAINTENANCEITEM.csn';

service api {

    entity MaintenanceItem as projection on db.MaintenanceItem;
    
}