import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router";
import ErrorAlert  from "../errors/ErrorAlert";

import NewTableForm from "./NewTableForm";

function NewTableScreen() {
    const history = useHistory();

    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
        table_name: "",
        capacity: "",
    });

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
          await createTable(formData, abortController.signal);
          history.push("/dashboard");
        } catch (error) {
          if (error.name === "AbortController") {
            console.log("Aborted");
          } else {
            setErrors(error);
          }
        }
        return () => abortController.abort();
      };

    return (
        <div>
            <ErrorAlert error={errors} />
            <NewTableForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />
        </div>
    );
}

export default NewTableScreen;