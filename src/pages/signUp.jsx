import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout";
import FormSignUp from "../components/Fragments/FormSignUp";
import AppSnackbar from "../components/Elements/AppSnackbar";
import { registerService } from "../services/authService";

function SignUp() {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (values) => {
    try {
      await registerService(values.fullname, values.email, values.password);
      setSnackbar({
        open: true,
        message: "Registrasi berhasil, silakan login.",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.msg || err?.message || "Registrasi gagal",
        severity: "error",
      });
    }
  };

  return (
    <AuthLayout>
      <FormSignUp onSubmit={handleRegister} />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  )
}

export default SignUp
