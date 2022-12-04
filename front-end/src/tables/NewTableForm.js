import { useHistory } from "react-router-dom";

function NewTableForm({ formData, handleChange, handleSubmit }) {

    const history = useHistory();

    const cancelHandler = () => {
        history.goBack();
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="table_name">Table name: </label>
                    <input
                        id="table_name"
                        name="table_name"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.table_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity: </label>
                    <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.capacity}
                        required
                    />
                </div>

                <button onClick={cancelHandler} type="button" className="btn btn-secondary mr-2" >Cancel</button>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>

            </form>
        </div>
    );
}

export default NewTableForm;