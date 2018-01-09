import jQuery from "jquery";
jQuery.DataTable = require("datatables.net-se");

export default function (selector) {
    if(elementIsDatatable(selector)){
        destroyDataTable(selector);
    }
    jQuery(selector).DataTable({
        "info": false,
        "lengthChange": false
    });
}
function elementIsDatatable(selector){
    return jQuery.fn.dataTable.isDataTable(selector);
}
export function destroyDataTable(selector) {
    if(elementIsDatatable(selector)){
        jQuery(selector).DataTable().destroy();
    }
}
