import LabeledInput from '../Elements/LabeledInput'
import Checkbox from '../Elements/CheckBox'
import Button from '../Elements/Button'
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { ColorModeContext } from "../../context/colorModeContext";

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string().required("Nama lengkap wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
  terms: Yup.bool().oneOf([true], "Anda harus menyetujui Terms and Conditions"),
});

function FormSignUp({ onSubmit }) {
  const { isDarkMode } = useContext(ColorModeContext);

  return (
    <div>
      <div className="mt-5 mb-2 text-center">
        <h2 className={`text-1xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-01"}`}>
          Create an Account
        </h2>
      </div>
      {/* form start */}
      <div className="mt-16">
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSubmit(values);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <Field name="fullname">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="fullname"
                      type="text"
                      label="Full Name"
                      placeholder="John Doe"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="fullname"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-6">
                <Field name="email">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="email"
                      type="email"
                      label="Email address"
                      placeholder="hello@example.com"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-6">
                <Field name="password">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="••••••••"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-6">
                <Field name="confirmPassword">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      placeholder="••••••••"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-5 flex items-center gap-2">
                <Field name="terms">
                  {({ field }) => (
                    <Checkbox
                      {...field}
                      id="terms"
                      type="checkbox"
                      checked={field.value}
                      label="I agree to the Terms and Conditions"
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage
                name="terms"
                component="p"
                className="text-red-500 text-xs mt-1 mb-4"
              />

              <Button type="submit" variant="primary">
                {isSubmitting ? "Loading..." : "Create Account"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* form end */}

      {/* link start */}
      <div className="flex justify-center mt-6">
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-03"}`}>
          Already have an account?{" "}
          <Link to="/login" className="text-primary text-sm font-bold cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
      {/* link end */}
    </div>
  )
}

export default FormSignUp
