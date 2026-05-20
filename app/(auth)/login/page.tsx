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
          "radial-gradient(ellipse at 60% 20%, #3d0a0a 0%, #1a0404 40%, #0d0d0d 70%, #080808 100%)",
        p: 2,
      }}
    >
      {/* Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 440,
          background: "#1a1a1c",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(206,28,26,0.15)",
        }}
      >
        {/* Top red accent bar */}
        <Box
          sx={{
            height: 4,
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
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.25,
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
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
            <Typography sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
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
                border: "1.5px solid rgba(206,28,26,0.6)",
                backgroundColor: "rgba(206,28,26,0.1)",
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#ce1c1a" }} />
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#f87171", letterSpacing: "0.1em" }}>
                SIGN IN
              </Typography>
            </Box>
          </Box>

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#f1f5f9", textAlign: "center", mb: 0.75, lineHeight: 1.2 }}
          >
            Welcome back
          </Typography>
          <Typography sx={{ fontSize: "0.875rem", color: "#64748b", textAlign: "center", mb: 3 }}>
            Sign in to your admin account to continue.
          </Typography>

          {/* Error */}
          {error && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: "10px",
                backgroundColor: "rgba(206,28,26,0.12)",
                border: "1px solid rgba(206,28,26,0.3)",
              }}
            >
              <Typography sx={{ fontSize: "0.8rem", color: "#f87171", textAlign: "center" }}>
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
                      sx={{ color: "#64748b", "&:hover": { color: "#94a3b8" } }}
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
                    sx={{
                      color: "rgba(255,255,255,0.15)",
                      "&.Mui-checked": { color: "#ce1c1a" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>Remember me</Typography>
                }
              />
              <Link href="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#f87171",
                    fontWeight: 600,
                    "&:hover": { color: "#fca5a5" },
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
                boxShadow: "0 4px 20px rgba(206,28,26,0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #bf2524, #a61e1c, #8b1816)",
                  boxShadow: "0 6px 24px rgba(206,28,26,0.5)",
                },
                "&:disabled": { opacity: 0.5 },
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
            backgroundColor: "#141416",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", color: "#475569" }}>
            Having trouble?{" "}
            <Box component="span" sx={{ color: "#64748b", fontWeight: 500 }}>
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
    backgroundColor: "#252528",
    fontSize: "0.875rem",
    color: "#f1f5f9",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.22)" },
    "&.Mui-focused fieldset": { borderColor: "#ce1c1a", borderWidth: 1.5 },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
    color: "#64748b",
    "&.Mui-focused": { color: "#ce1c1a" },
  },
  "& .MuiFormHelperText-root": { color: "#f87171" },
  "& input": { color: "#f1f5f9" },
  "& input::placeholder": { color: "#475569", opacity: 1 },
};
