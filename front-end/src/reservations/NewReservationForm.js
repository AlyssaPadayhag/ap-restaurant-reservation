import CancelButton from "./CancelButton";

function NewReservationForm({ formData, handleChange, handleSubmit }) {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First name: </label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.first_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last name: </label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.last_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile number: </label>
                    <input 
                        id="mobile_number"
                        name="mobile_number"
                        type="tel"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.mobile_number}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_date">Date of reservation: </label>
                    <input
                        id="reservation_date"
                        name="reservation_date"
                        type="date"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_date}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_time">Time of reservation: </label>
                    <input
                        id="reservation_time"
                        name="reservation_time"
                        type="time"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_time}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="people">Number of people in party: </label>
                    <input
                        id="people"
                        name="people"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.people}
                        required
                    />
                </div>

                <CancelButton />
                <button type="submit" className="btn btn-primary mr-2"> Submit </button>
                
            </form>
        </div>
    );
}

export default NewReservationForm;