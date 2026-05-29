import React from 'react'
import LabeledInput from "../Elements/LabeledInput";
import Button from "../Elements/Button";
import CheckBox from "../Elements/CheckBox";
import { Link } from "react-router-dom";

function FormSignUp() {
  return (
    <>
        {/* form start */}
        <div className="mt-16">
          <form action="">
            <div className="mb-6">
                <LabeledInput
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Tanzir Rahman"
                    name="name"
                />
            </div>
            <div className="mb-6">
                <LabeledInput
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    name="email"
                />
            </div>
            <div className="mb-6">
                <LabeledInput
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="●●●●●●●●●●●●●●●●●"
                    name="password"
                />
            </div>
            
            <div className="mb-6">
                <CheckBox
                    label="By continuing, you agree to our terms of service."
                    id="status"
                    type="checkbox"
                    name="status"
                />
            </div>

            <Button>Sign up</Button>
          </form>
        </div>
        {/* form end */}
        {/* teks start */}
        <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03">
          <div className="border border-gray-05 w-full"></div>
          <div className="px-2 bg-special-mainBg absolute"> or sign up with</div>
        </div>
        {/* teks end */}
        {/* sign in with google start */}
        <div className="mb-8">
            <Button type="button" variant="secondary">
                <span className="flex items-center justify-center">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 mr-2" />
                    Continue with Google
                </span>
            </Button>
        </div>
        {/* sign in with google end */}
        {/* sign in link start */}
        <div className="text-center text-xs text-gray-03">
            Already have an account? <Link to="/login" className="text-primary cursor-pointer font-bold">Sign in here</Link>
        </div>
        {/* sign in link end */}
    </>
  );
}

export default FormSignUp;
