import React from "react";

function TableList({ table }){

    return(
        <tbody>
            <tr>
                <td className="border-top-0">{table.table_id}</td>
                <td className="border-top-0">{table.table_name}</td>
                <td className="border-top-0">{table.capacity}</td>
            </tr>
        </tbody>
    );
}

export default TableList;