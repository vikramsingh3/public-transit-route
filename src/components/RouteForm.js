import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosAPI from "../shared/Axios";
import { useParams, withRouter, Link } from "react-router-dom";
import Stops from "./Stops";

const RouteForm = ({ history, editMode }) => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    direction: "",
    routeName: "",
    status: "",
    stops: [],
  });
  const [isReady, setReady] = useState(false); //isReady tells when the Form is ready to be initialised

  const getInitialValuesForEditMode = async () => {
    const response = await axiosAPI.get("/routes/" + id + ".json");
    if (!response) return;
    setInitialValues({ ...response.data });
    setReady(true);
  };

  useEffect(() => {
    if (editMode) {
      getInitialValuesForEditMode();
    } else {
      setReady(true);
    }
  }, []);

  if (!isReady) return null;

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={Yup.object({
        routeName: Yup.string()
          .trim()
          .min(3, "Must be 3 charactes or more")
          .max(15, "must be 15 characters or less")
          .required("required"),
        direction: Yup.string().required("required"),
        status: Yup.string().required("required"),
        stops: Yup.array().min(2, "Add atlest 2 stops").required("required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (editMode) {
            await axiosAPI.put("/routes/" + id + ".json", { ...values });
          } else {
            await axiosAPI.post("/routes.json", { ...values });
          }

          history.push("/");
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ values, errors }) => (
        <Form className="bg-green-600 p-12 rounded shadow max-w-3xl mx-auto text-white">
          <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center mb-4">
            <label htmlFor="routeName" className="font-bold">
              Route Name :
            </label>
            <Field
              name="routeName"
              type="text"
              className="outline-amber-300 text-green-600 rounded font-bold px-2 py-1"
            />
            <ErrorMessage
              name="routeName"
              component="span"
              className="bg-red-600 rounded px-3 py-0 text-xs"
            />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center mb-4">
            <div id="direction" className="font-bold">
              Direction :
            </div>
            <div
              role="group"
              aria-labelledby="direction"
              className="flex gap-4 items-center"
            >
              <label>
                <Field
                  type="radio"
                  name="direction"
                  value="up"
                  className="outline-amber-300 accent-amber-400 text-green-600 rounded font-bold"
                />
                <span className="px-2">Up</span>
              </label>
              <label>
                <Field
                  type="radio"
                  name="direction"
                  value="down"
                  className="outline-amber-300 accent-amber-400 text-green-600 rounded font-bold"
                />
                <span className="px-2">Down</span>
              </label>
              <ErrorMessage
                name="direction"
                component="span"
                className="bg-red-600 rounded px-3 py-0 text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center mb-4">
            <div id="status" className="font-bold">
              Status :
            </div>
            <div
              role="group"
              aria-labelledby="status"
              className="flex gap-4 items-center"
            >
              <label>
                <Field
                  type="radio"
                  name="status"
                  value="active"
                  className="outline-amber-300 accent-amber-400 text-green-600 rounded font-bold"
                />
                <span className="px-2">Active</span>
              </label>
              <label>
                <Field
                  type="radio"
                  name="status"
                  value="inactive"
                  className="outline-amber-300 accent-amber-400 text-green-600 rounded font-bold"
                />
                <span className="px-2">Inactive</span>
              </label>
              <ErrorMessage
                name="status"
                component="span"
                className="bg-red-600 rounded px-3 py-0 text-xs"
              />
            </div>
          </div>

          <Stops
            name="stops"
            grabStops={(stopList) => {
              values.stops = stopList;
            }}
            stops={values.stops}
            errorMessage={errors.stops}
          />

          <button
            type="submit"
            className="px-3 py-2 rounded bg-amber-300 hover:bg-amber-400 text-green-600 font-semibold mt-12 mr-4"
          >
            {editMode ? "Save" : "Submit"}
          </button>
          <Link
            to="/"
            className="px-3 py-2 rounded border-2 border-amber-300 hover:border-amber-400 text-amber-300 hover:text-amber-400 font-semibold mt-12"
          >
            Home
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default withRouter(RouteForm);
