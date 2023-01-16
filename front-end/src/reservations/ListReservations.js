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
              <div className="reservation-card d-inline-flex flex-wrap">
                  <div key={reservation.reservation_id}>
                    <table className="table table-striped table-light">
                      <tbody>
                        <tr>
                          <td>Date: </td>
                          <td>{reservation.reservation_date}</td>
                        </tr>
                        <tr>
                          <td>Time: </td>
                          <td>{reservation.reservation_time}</td>
                        </tr>
                        <tr>
                          <td>Name: </td>
                          <td>{reservation.last_name}, {reservation.first_name}</td>
                        </tr>
                        <tr>
                          <td>Mobile number: </td>
                          <td>{reservation.mobile_number}</td>
                        </tr>
                        <tr>
                          <td>Number of people in party: </td>
                          <td>{reservation.people}</td>
                        </tr>
                        <tr>
                          <td>Status: </td>
                          <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                        </tr>
                      </tbody>
                    </table>



                    {reservation.status === "booked" ? (
                    <div>
                      <Link to={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-success mr-2">
                        Seat
                      </Link>

                      <Link to={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-success mr-2">
                        Edit
                      </Link>

                      <div
                        data-reservation-id-cancel={reservation.reservation_id}
                        id={reservation.reservation_id}
                        className="btn btn-danger mr-3"
                        onClick={handleDelete} >
                          Cancel
                      </div>
                    </div>
                    ) : (
                      <div className="cancelled-padding"> </div>
                    )}
                </div>
              </div>
            );
    });

    if (reservations.length < 1) {
        return (
          <div>
            <h3 className="text-center mb-2 p-2 reservations-not-found">No Reservations Found</h3>
            <p className="reservations-not-found">To start a new reservation, click on
              <Link className="nav-link badge-secondary rounded" to="/reservations/new">
                <span className="oi oi-plus" />
                &nbsp;New Reservation
              </Link>
            </p>
          </div>
        );
      }
      return (
        <div className="mb-2">
          {reservationList}
          <br />
        </div>
      );
}

export default ListReservations;