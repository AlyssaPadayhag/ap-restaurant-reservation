


function ListReservations({ reservations }) {
    const reservationList = reservations.map((reservation) => {
            return (
                <div key={reservation.reservation_id}>
                    <h3>{reservation.reservation_date} - {reservation.reservation_time}</h3>
                    <h3>Name: {reservation.last_name}, {reservation.first_name}</h3>
                    <h3>Mobile number: {reservation.mobile_number}</h3>
                    <h3>Number of people in party: {reservation.people}</h3>
                </div>
            );
    });

    if (reservations.length < 1) {
        return (
          <div>
            <h3 className="search-res-list">No reservations found</h3>
            <br></br>
            <br></br>
          </div>
        );
      }
      return (
        <div className="row res-card-container">
          {reservationList}
          <br />
        </div>
      );
}

export default ListReservations;