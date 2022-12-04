import CancelButton from "../reservations/CancelButton";


function SeatReservationForm({ currentTable, reservation, tables, handleChange, handleSubmit }) {

    /*let free = tables.filter(
        (table) =>
          table.reservation_id === null && table.capacity >= reservation.people
      ); */

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="table_id">Open Tables</label>
                    <select
                    id="table_id"
                name="table_id"
                onChange={handleChange}
                className="form-control form-control-lg"
              >
                <option value="x">--- Select A Table ---</option>
                {tables.map((table) => (
                  <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                ))}
              </select>
                </div>

                <CancelButton />
                <button type="submit" className="btn btn-primary mr-2">Submit</button>

            </form>
        </div>
    );
}

export default SeatReservationForm;