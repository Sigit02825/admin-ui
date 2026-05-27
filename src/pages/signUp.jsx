import React from 'react'
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignUp from "../components/Fragments/FormSignUp";

function SignUpPage() {
  return (
    <AuthLayout>
        <p className="text-sm font-bold text-center mt-2 text-gray-01">Create an account</p>
        <FormSignUp />
    </AuthLayout>
  );
}

export default SignUpPage;
