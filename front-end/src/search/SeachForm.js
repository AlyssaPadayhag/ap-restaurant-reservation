

function SearchForm({ search, handleChange, handleSubmit }) {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile number:</label>
                    <input 
                        id="mobile_number"
                        name="mobile_number"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={search.mobile_number}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mr-2">Search</button>

            </form>
        </div>
    );
}

export default SearchForm;