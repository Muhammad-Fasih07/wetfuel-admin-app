"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { loginSchema, type LoginInput } from "@/lib/utils/validators";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const success = login(data.email, data.password);
    if (!success) setError("Invalid email or password.");
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 60% 20%, #6b1212 0%, #2a0808 30%, #1a0505 60%, #0f0303 100%)",
        p: 2,
      }}
    >
      {/* Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 440,
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Top gradient accent */}
        <Box
          sx={{
            height: 6,
            background: "linear-gradient(90deg, #ce1c1a, #f0797a, #ce1c1a)",
          }}
        />

        <Box sx={{ px: 4, pt: 4, pb: 3.5 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "18px",
                backgroundColor: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.25,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src="/wetfeullogo.png"
                alt="WetFuel"
                width={56}
                height={56}
                priority
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography sx={{ fontSize: "0.8rem", color: "#888", fontWeight: 500 }}>
              WetFuel Admin Panel
            </Typography>
          </Box>

          {/* Sign In badge */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                border: "1.5px solid #ce1c1a",
                backgroundColor: "rgba(206,28,26,0.04)",
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#ce1c1a" }} />
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#ce1c1a", letterSpacing: "0.1em" }}>
                SIGN IN
              </Typography>
            </Box>
          </Box>

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#111", textAlign: "center", mb: 0.75, lineHeight: 1.2 }}
          >
            Welcome back
          </Typography>
          <Typography
            sx={{ fontSize: "0.875rem", color: "#888", textAlign: "center", mb: 3 }}
          >
            Sign in to your admin account to continue.
          </Typography>

          {/* Error */}
          {error && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: "10px",
                backgroundColor: "#fff5f5",
                border: "1px solid #fecaca",
              }}
            >
              <Typography sx={{ fontSize: "0.8rem", color: "#dc2626", textAlign: "center" }}>
                {error} — try <strong>admin@wetfuel.com</strong> / <strong>admin123</strong>
              </Typography>
            </Box>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email address"
              type="email"
              fullWidth
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={inputSx}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: "#9ca3af" }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputSx}
            />

            {/* Remember me + Forgot */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{ color: "#d1d5db", "&.Mui-checked": { color: "#ce1c1a" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "0.8rem", color: "#555" }}>Remember me</Typography>
                }
              />
              <Link href="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#ce1c1a",
                    fontWeight: 600,
                    "&:hover": { color: "#bf2524" },
                  }}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.4,
                fontSize: "0.95rem",
                fontWeight: 700,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #cd171a, #ce1c1a, #bf2524)",
                boxShadow: "0 4px 14px rgba(206,28,26,0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #bf2524, #a61e1c, #8b1816)",
                  boxShadow: "0 6px 20px rgba(206,28,26,0.45)",
                },
                "&:disabled": { opacity: 0.65 },
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 4,
            py: 2,
            backgroundColor: "#fafafa",
            borderTop: "1px solid #f0f0f0",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", color: "#bbb" }}>
            Having trouble?{" "}
            <Box component="span" sx={{ color: "#888", fontWeight: 500 }}>
              Contact your WetFuel administrator.
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    fontSize: "0.875rem",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#d1d5db" },
    "&.Mui-focused fieldset": { borderColor: "#ce1c1a", borderWidth: 1.5 },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
    color: "#9ca3af",
    "&.Mui-focused": { color: "#ce1c1a" },
  },
  "& .MuiFormHelperText-root": { color: "#ef4444" },
};
