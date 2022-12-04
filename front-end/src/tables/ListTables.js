

function ListTables({ tables, handleFinish }) {
    const tableList = tables.map((table) => {
        return (
            <div key={table.table_id}>
                <div>
                    <h3>Table Name: {table.table_name}</h3>
                    <h3 data-table-id-status={table.table_id}>
                        Status:
                        {table.reservation_id ? "Occupied" : "Free"}
                    </h3>
                    <h3>Capacity: {table.capacity}</h3>
                </div>

                {table.reservation_id && (
          <button
            data-table-id-finish={table.table_id}
            value={table.reservation_id}
            id={table.table_id}
            className="btn btn-primary"
            onClick={handleFinish}
          >
            Finish
          </button>
        )}
        
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