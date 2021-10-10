import React, { useState } from "react";
import { Field, Formik } from "formik";
import axios from "axios";

const domain = window.location.origin;

const validate = (values) => {
  let errors = {};
	if (values.type ==="option" && !values.optionAnswer) {
    errors.optionAnswer = "Please select one from above";
	}
	if (!values.type ==="option" && !values.textAnswer) {
    errors.optionAnswer = "Please fill the answer";
	}
  return errors;
};

const Form = (props) => {

	const [showTY, setShowTY] = useState(false);

	const {
		type,
		question,
		surveyTitle,
		surveyDescription,
		options
	} = props.formdata
  return (
		!showTY ?
			<Formik
				enableReinitialize = {true}
				initialValues = {{
					optionAnswer: "",
					textAnswer: ""
				}}
				validate={validate}
				onSubmit={
					(values) => {
						const {
							optionAnswer,
							textAnswer
						} = values;

						const axiosConfig = {
							'content-type': 'application/json'
						}
						const submittedResponse = {

						}

						// axios.post(
						// 	"http://localhost:3000/question/"+formID,
						// 	submittedResponse,
						// 	axiosConfig
						// ).then((res) => {
						// 	setShowTY(true);
						// })
						// .catch((e) => {
						// 	alert(e);
						// })
						alert("submitted");
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
						<div className="customcontainer">
							<form onSubmit={handleSubmit}>
							<div className="form-row">
								<div className = "heading">
									<label htmlFor="surveyTitle">{surveyTitle}</label>
									<label htmlFor="surveyDescription">{surveyDescription}</label>
								</div>
								<label htmlFor="surveyTitle">{question}</label>
								{type ==="option" ?
									<>
										{options.map((opt) => { 
											return (
											<div>
												<input type="radio" onChange={handleChange} onBlur={handleBlur} name="optionAnswer" value={opt} />
												<label>
													{opt}
												</label>
											</div>)
										})}
										{errors.optionAnswer && touched.optionAnswer && (
											<span className="error">{errors.optionAnswer}</span>
										)}
									</> :
									<>
										<input
										type="text"
										name="textAnswer"
										id="textAnswer"
										value={values.textAnswer}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.textAnswer && touched.textAnswer ? "input-error" : null
										}
										/>
										{errors.textAnswer && touched.textAnswer && (
											<span className="error">{errors.textAnswer}</span>
										)}
									</>
								}
								<button
									type="submit"
									className={!(dirty && isValid) ? "disabled-btn" : ""}
									disabled={!(dirty && isValid)}
								>
									Submit
								</button>
								</div>
							</form>
						</div>
					);
				}}
			</Formik> :
			<div class = "customcontainer">
				<h1>Thanks for submitting!! Please click on link below to view the Realtime Feedback!!!</h1>
			</div>
		)
};

export default Form;
