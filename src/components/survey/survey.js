import React, { useState } from "react";
import { Formik } from "formik";

import "./survey.scss";

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

	if (!values.surveyTitle) {
    errors.surveyTitle = "Survey Type is required";
  }

	if (!values.surveyDescription) {
    errors.surveyDescription = "Survey Description is required";
  }

	if (!values.question) {
    errors.question = "Question is required";
  }

	if (!values.questionType) {
    errors.questionType = "Question Type is required";
  }

	if (!values.responseSize) {
    errors.responseSize = "Response Size is required";
  }

  return errors;
};

const submitForm = (values) => {
  console.log(values);
};

const Survey = () => {

  return (
    <Formik
			enableReinitialize = {true}
      initialValues = {{
				surveyTitle: "",
				surveyDescription: "",
				questionType: "",
				question: "",
				options: [],
				currentOption: "",
				responseSize: "",
			}}
      validate={validate}
      onSubmit={submitForm}
			
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
								<label htmlFor="surveyTitle">Survey Title</label>
                <input
                  type="text"
                  name="surveyTitle"
                  id="surveyTitle"
                  value={values.surveyTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.surveyTitle && touched.surveyTitle ? "input-error" : null
                  }
                />
                {errors.surveyTitle && touched.surveyTitle && (
                  <span className="error">{errors.surveyTitle}</span>
                )}

								<label htmlFor="surveyDescription">Survey Description</label>
                <input
                  type="text"
                  name="surveyDescription"
                  id="surveyDescription"
                  value={values.surveyDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.surveyDescription && touched.surveyDescription ? "input-error" : null
                  }
                />
                {errors.surveyDescription && touched.surveyDescription && (
                  <span className="error">{errors.surveyDescription}</span>
                )}
							</div>

							
		
								<label htmlFor="questionType" style={{ display: 'block' }}>Select Question Type</label>
								<select
									name="questionType"
									value={values.color}
									onChange={handleChange}
									onBlur={handleBlur}
									style={{ display: 'block' }}
									className={
                    errors.question && touched.question ? "input-error" : null
                  }
								>
									<option value="" label="Choose your question type" />
									<option value="optionedResponse" label="Optioned Response" />
									<option value="textResponse" label="Text Response" />
								</select>
								{errors.questionType &&
									touched.questionType &&
									<span className="error">
										{errors.questionType}
									</span>
								}

								{ !!values.questionType ?
									<>
										<label htmlFor="question">Question</label>
										<input
											type="text"
											name="question"
											id="question"
											value={values.question}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.question && touched.question ? "input-error" : null
											}
										/>
										{errors.question && touched.question && (
											<span className="error">{errors.question}</span>
										)}
									</> : null
								}
								{values.questionType === "optionedResponse" ?
									<>
										<label htmlFor="options">Enter option and click + to add</label>
										<div className="option-container">
											{values.options.map((o) => <label className="option">{o}</label>)}
										</div>
										<input
											type="text"
											name="currentOption"
											id="currentOption"
											value={values.currentOption}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<button
											name="addOption"
											onClick={ (event) => {
												event.preventDefault();
												const options = [...values.options, values.currentOption];
												const currentOption = "";
												setValues({...values, options, currentOption});
											}}
											id = "add-button"
											className={!values.currentOption ? "disabled-btn" : ""}
											disabled={!values.currentOption}
										>
										+
										</button>
										</> :
										values.questionType === "textResponse" ?
											<>
												<label htmlFor="responseSize">Response Size</label>
												<input
													type="number"
													name="responseSize"
													id="responseSize"
													value={values.responseSize}
													onChange={handleChange}
													onBlur={handleBlur}
													className={
														errors.responseSize && touched.responseSize ? "input-error" : null
													}
												/>
												{errors.responseSize && touched.responseSize && (
													<span className="error">{errors.responseSize}</span>
												)}
											</>
										: null
								}
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Create Survey
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Survey;
