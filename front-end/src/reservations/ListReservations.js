import { Link } from "react-router-dom";

import { updateReservationStatus } from '../utils/api';
import { useHistory } from "react-router-dom";




function ListReservations({ reservations }) {
  const history = useHistory();





    const reservationList = reservations.map((reservation) => {
      function handleDelete() {
  
        const result = window.confirm(
          'Do you want to cancel this reservation? This cannot be undone.'
        );
        if (result) {
          const abortController = new AbortController();
          let status = 'cancelled';
          updateReservationStatus(
            status,
            reservation.reservation_id,
            abortController.signal
          ).then(() => {
            history.push('/');
          });
        }
      }
            return (
                <div key={reservation.reservation_id}>
                    <h3>Date: {reservation.reservation_date} Time: {reservation.reservation_time}</h3>
                    <h3>Name: {reservation.last_name}, {reservation.first_name}</h3>
                    <h3>Mobile number: {reservation.mobile_number}</h3>
                    <h3>Number of people in party: {reservation.people}</h3>
                    <h3 data-reservation-id-status={reservation.reservation_id}>
                      {reservation.status}
                    </h3>


                    {reservation.status === "booked" ? (
                    <div>
                      <Link to={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-success">
                        Seat
                      </Link>

                      <Link to={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-success">
                        Edit
                      </Link>

                      <div
                        data-reservation-id-cancel={reservation.reservation_id}
                        id={reservation.reservation_id}
                        className="btn btn-danger mb-3"
                        onClick={handleDelete} >
                          Cancel
                      </div>
                    </div>
                    ) : (
                      <div>{null}</div>
                    )}
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