import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import Form from "./form";

const validate = (values) => {
  let errors = {};

	if (!values.formID) {
    errors.formID = "Form ID is required";
  }
  return errors;
};

const GetForm = () => {
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState("");

  return (
		!showForm ?
			<Formik
				enableReinitialize = {true}
				initialValues = {{
					formID: "",
				}}
				validate={validate}
				onSubmit={
					(values) => {
						const {
							formID
						} = values;

						axios.get(
							"http://localhost:3000/question/"+formID
						).then((res) => {
							setShowForm(true);
							setFormData(res.data[0]);
							console.log(res);
						})
						.catch((e) => {
							console.log(e);
						})
					}
				}
			>
				{(formik) => {
					const {
						values,
						handleChange,
						handleSubmit,
						errors,
						touched,
						handleBlur,
						isValid,
						dirty,
						setValues
					} = formik;
					return (
						<div className="container">
							<form onSubmit={handleSubmit}>
							<div className="form-row">
								<div className = "heading">
									<label htmlFor="surveyTitle">Enter your Form ID below</label>
									<input
										type="text"
										name="formID"
										id="formID"
										value={values.formID}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.formID && touched.formID ? "input-error" : null
										}
									/>
									{errors.formID && touched.formID && (
										<span className="error">{errors.formID}</span>
									)}

								<button
									type="submit"
									className={!(dirty && isValid) ? "disabled-btn" : ""}
									disabled={!(dirty && isValid)}
								>
									Get Form
								</button>
								</div>
								</div>
							</form>
						</div>
					);
				}}
			</Formik> :
			<Form formdata = {formData}/>
			)
};

export default GetForm;