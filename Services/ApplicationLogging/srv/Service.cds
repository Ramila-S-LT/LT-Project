namespace dbsrv.srv;

using {db as DB} from '../db/Schema';

service api {
    entity Sample as projection on DB.Sample;
}