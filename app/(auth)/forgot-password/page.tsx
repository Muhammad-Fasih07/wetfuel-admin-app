"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Button, Typography, Alert, InputAdornment } from "@mui/material";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthCard from "@/components/auth/AuthCard";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/utils/validators";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AuthCard>
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "white", mb: 0.5 }}>
          Reset password
        </Typography>
        <Typography sx={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)" }}>
          {submitted
            ? "Check your email for reset instructions"
            : "Enter your email and we'll send reset instructions"}
        </Typography>
      </Box>

      {submitted ? (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 28 }}>✓</Typography>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3, fontSize: "0.875rem" }}>
            If an account exists with that email, you'll receive a reset link shortly.
          </Typography>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
            >
              Back to Sign In
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            label="Email address"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.3)" }} />
                </InputAdornment>
              ),
            }}
            sx={authInputSx}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #cd171a, #ce1c1a, #bf2524)",
              "&:hover": {
                background: "linear-gradient(135deg, #bf2524, #a61e1c, #8b1816)",
                boxShadow: "0 0 24px rgba(206,28,26,0.4)",
              },
            }}
          >
            {loading ? "Sending…" : "Send Reset Link"}
          </Button>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center" }}>
              <ArrowBackIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }} />
              <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
                Back to Sign In
              </Typography>
            </Box>
          </Link>
        </Box>
      )}
    </AuthCard>
  );
}

const authInputSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
    "&.Mui-focused fieldset": { borderColor: "#ce1c1a" },
    "& input": { color: "white" },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.4)",
    "&.Mui-focused": { color: "#f0797a" },
  },
  "& .MuiFormHelperText-root": { color: "#f0797a" },
};
