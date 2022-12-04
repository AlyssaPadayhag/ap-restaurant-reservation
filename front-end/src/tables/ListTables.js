

function ListTables({ tables }) {
    const tableList = tables.map((table) => {
        return (
            <div key={table.table_id}>
                <h3>Table Name: {table.table_name}</h3>
                <h3 data-table-id-status={table.table_id}>
                    Status:
                    {table.reservation_id ? "Occupied" : "Free"}
                </h3>
                <h3>Capacity: {table.capacity}</h3>
            </div>
        );
    });

    return (
        <div>
            {tableList}
        </div>
    );
}

export default ListTables;