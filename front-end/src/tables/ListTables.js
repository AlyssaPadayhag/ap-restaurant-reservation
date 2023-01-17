
function ListTables({ tables, handleFinish }) {
    const tableList = tables.map((table) => {
        return (
        <div className="table-card d-inline-flex flex-wrap">
            <div key={table.table_id}>
                <table className="table table-striped table-light">
                    <tbody>
                        <tr>
                            <td>Table Name: </td>
                            <td>{table.table_name}</td>
                        </tr>
                        <tr>
                            <td data-table-id-status={table.table_id}>Status: </td>
                            <td>{table.reservation_id ? "Occupied" : "Free"}</td>
                        </tr>
                        <tr>
                            <td>Capacity: </td>
                            <td>{table.capacity}</td>
                        </tr>
                    </tbody>
                </table>

                {table.reservation_id ? (
        <div className="text-center">
          <button
            data-table-id-finish={table.table_id}
            value={table.reservation_id}
            id={table.table_id}
            className="btn btn-primary mr-3"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
        ) : (
            <div className="cancelled-finish-padding"> </div>
        )}

            </div>
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