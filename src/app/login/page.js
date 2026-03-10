"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { loginAdmin } from "../../lib/api";

export default function Login() {
  const router = useRouter();
  const { login: setAuth } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email?.trim() || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const data = await loginAdmin(form.email.trim(), form.password);
      if (data.success && data.token && data.admin) {
        setAuth(data.token, data.admin);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes crystalShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes prismRotate {
          0%   { transform: rotate(0deg); opacity: 0.4; }
          50%  { opacity: 0.7; }
          100% { transform: rotate(360deg); opacity: 0.4; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50%       { opacity: 1; transform: scale(1); }
        }
        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        .login-root {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        /* ── BACKGROUND IMAGE with blur ── */
        .bg-image {
          position: absolute;
          inset: 0;
          background-image: url('/backgound.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          /* 👇 Yahan blur adjust karein: 6px = thoda, 12px = zyada */
          filter: blur(2px);
          /* blur se edges white nahi hon isliye scale thoda badhaya */
          transform: scale(1.08);
        }

        /* Very light overlay — background stays vivid */
        .bg-gradient {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
        }

        /* Prismatic light streaks across bg */
        .prism-light {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(120,180,255,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 80% 70%, rgba(200,120,255,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── CRYSTAL CARD ── */
        .glass-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          /* Almost fully transparent */
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(3px) saturate(160%);
          -webkit-backdrop-filter: blur(3px) saturate(160%);
          border-radius: 28px;
          padding: 48px 44px 40px;
          animation: fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both,
                     floatCard 6s ease-in-out 0.7s infinite;

          /* Multi-layered crystal border */
          border: 1px solid rgba(255,255,255,0.22);
          outline: 1px solid rgba(255,255,255,0.06);

          /* Crystal box shadows — layered light refraction */
          box-shadow:
            /* outer prismatic glow */
            0 0 0 1px rgba(200,220,255,0.12),
            0 0 40px 0px rgba(130,180,255,0.08),
            /* top-left light catch */
            inset 3px 3px 12px rgba(255,255,255,0.12),
            /* bottom-right shadow depth */
            inset -2px -2px 8px rgba(0,0,0,0.15),
            /* main depth shadow */
            0 24px 80px rgba(0,0,0,0.22),
            0 8px 24px rgba(0,0,0,0.15);
        }

        /* Prismatic rainbow top edge */
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: 8%; right: 8%;
          height: 1.5px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,180,180,0.7) 15%,
            rgba(255,220,120,0.8) 28%,
            rgba(180,255,180,0.7) 42%,
            rgba(120,200,255,0.8) 57%,
            rgba(180,130,255,0.7) 72%,
            rgba(255,160,200,0.6) 85%,
            transparent 100%
          );
          border-radius: 50%;
          animation: borderGlow 3s ease-in-out infinite;
        }

        /* Crystal inner highlight — diagonal light streak */
        .glass-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 28px;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.10) 0%,
            rgba(255,255,255,0.03) 30%,
            transparent 60%,
            rgba(255,255,255,0.02) 100%
          );
          pointer-events: none;
        }

        /* Sparkle dots */
        .sparkle {
          position: absolute;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          z-index: 20;
        }
        .sparkle-1 { width:4px; height:4px; top:12%; left:8%;  animation: sparkle 2.4s ease-in-out infinite; }
        .sparkle-2 { width:3px; height:3px; top:6%;  right:14%; animation: sparkle 3.1s ease-in-out 0.8s infinite; }
        .sparkle-3 { width:5px; height:5px; bottom:18%; right:9%; animation: sparkle 2.8s ease-in-out 1.5s infinite; }
        .sparkle-4 { width:3px; height:3px; bottom:10%; left:12%; animation: sparkle 3.5s ease-in-out 0.4s infinite; }
        .sparkle-5 { width:2px; height:2px; top:40%;  left:5%;  animation: sparkle 2.0s ease-in-out 1.2s infinite; }

        /* Logo */
        .logo-wrapper {
          width: 210px;
          height: 100px;
          margin: 0 auto 22px;
          border-radius: 18px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .logo-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Title */
        .title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          text-align: center;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
          text-shadow:
            0 0 20px rgba(200,220,255,0.5),
            0 2px 8px rgba(0,0,0,0.3);
        }

        .subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          color: rgba(220, 235, 255, 0.75);
          text-align: center;
          margin-bottom: 32px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        /* Crystal input fields */
        .glass-field .MuiOutlinedInput-root {
          font-family: 'Outfit', sans-serif !important;
          background: rgba(255,255,255,0.06) !important;
          backdrop-filter: blur(4px) !important;
          border-radius: 14px !important;
          color: #ffffff !important;
          transition: all 0.3s ease !important;
        }
        .glass-field .MuiOutlinedInput-root:hover {
          background: rgba(255,255,255,0.10) !important;
        }
        .glass-field .MuiOutlinedInput-root.Mui-focused {
          background: rgba(255,255,255,0.09) !important;
        }
        .glass-field fieldset {
          border-color: rgba(255,255,255,0.18) !important;
          border-width: 1px !important;
          transition: all 0.3s ease !important;
        }
        .glass-field .MuiOutlinedInput-root:hover fieldset {
          border-color: rgba(180,210,255,0.45) !important;
        }
        .glass-field .MuiOutlinedInput-root.Mui-focused fieldset {
          border-color: rgba(180,210,255,0.7) !important;
          border-width: 1.5px !important;
          box-shadow: 0 0 12px rgba(120,180,255,0.15), inset 0 0 8px rgba(120,180,255,0.05) !important;
        }
        .glass-field .MuiInputLabel-root {
          font-family: 'Outfit', sans-serif !important;
          color: rgba(210, 228, 255, 0.7) !important;
          font-weight: 400 !important;
        }
        .glass-field .MuiInputLabel-root.Mui-focused {
          color: rgba(180,215,255,0.95) !important;
        }
        .glass-field input {
          font-family: 'Outfit', sans-serif !important;
          color: #ffffff !important;
          text-shadow: 0 0 8px rgba(200,220,255,0.3) !important;
        }
        .glass-field .MuiInputAdornment-root .MuiSvgIcon-root {
          color: rgba(180,210,255,0.6) !important;
        }

        /* Crystal Log In button */
        .signin-btn {
          font-family: 'Outfit', sans-serif !important;
          height: 54px !important;
          border-radius: 14px !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          color: #fff !important;
          background: linear-gradient(135deg,
            rgba(80,130,255,0.55) 0%,
            rgba(130,80,255,0.45) 50%,
            rgba(80,180,255,0.55) 100%
          ) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255,255,255,0.28) !important;
          box-shadow:
            0 8px 32px rgba(80,130,255,0.25),
            inset 0 1px 0 rgba(255,255,255,0.25),
            inset 0 -1px 0 rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease !important;
          position: relative !important;
          overflow: hidden !important;
          background-size: 200% 200% !important;
          animation: crystalShimmer 4s ease infinite !important;
        }
        .signin-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .signin-btn:hover::before { left: 150%; }
        .signin-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow:
            0 16px 48px rgba(80,130,255,0.35),
            inset 0 1px 0 rgba(255,255,255,0.35),
            0 0 20px rgba(180,150,255,0.2) !important;
          border-color: rgba(255,255,255,0.4) !important;
        }
        .signin-btn:active { transform: translateY(0) !important; }
        .signin-btn.Mui-disabled {
          background: rgba(255,255,255,0.08) !important;
          color: rgba(255,255,255,0.35) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }

        /* Remember me & Forgot */
        .remember-label span {
          font-family: 'Outfit', sans-serif !important;
          font-size: 0.85rem !important;
          color: rgba(220, 235, 255, 0.8) !important;
          font-weight: 400 !important;
        }
        .forgot-link {
          font-family: 'Outfit', sans-serif !important;
          font-size: 0.85rem !important;
          color: rgba(180,215,255,0.9) !important;
          text-decoration: none !important;
          font-weight: 500 !important;
          transition: all 0.2s !important;
          text-shadow: 0 0 12px rgba(120,180,255,0.4) !important;
        }
        .forgot-link:hover {
          color: #fff !important;
          text-shadow: 0 0 16px rgba(180,210,255,0.8) !important;
        }

        .footer-text {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          color: rgba(200, 220, 255, 0.35);
          text-align: center;
          margin-top: 28px;
        }
      `}</style>

      <div className="login-root">
        {/* Background */}
        <div className="bg-image" />
        <div className="bg-gradient" />
        <div className="prism-light" />

        {/* Crystal Card */}
        <div className="glass-card">
          {/* Sparkle dots */}
          <div className="sparkle sparkle-1" />
          <div className="sparkle sparkle-2" />
          <div className="sparkle sparkle-3" />
          <div className="sparkle sparkle-4" />
          <div className="sparkle sparkle-5" />
          {/* Logo */}
          <div className="logo-wrapper">
            <img src="/logo.png" alt="Inventory Logo" />
          </div>

          <div className="title">Inventory Management</div>
          <div className="subtitle">Sign in to your account</div>

          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{
                mb: 2.5,
                background: "rgba(239,68,68,0.12)",
                color: "#fca5a5",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "12px",
                fontFamily: "'Outfit', sans-serif",
                "& .MuiAlert-icon": { color: "#f87171" },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Email */}
          <TextField
            fullWidth
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            variant="outlined"
            className="glass-field"
            sx={{ mb: 2.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "rgba(148,163,184,0.6)", fontSize: 19 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            required
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            variant="outlined"
            className="glass-field"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "rgba(148,163,184,0.6)", fontSize: 19 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{
                      color: "rgba(148,163,184,0.6)",
                      "&:hover": { color: "#93c5fd", background: "rgba(147,197,253,0.08)" },
                    }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember me + Forgot */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3.5 }}>
            <FormControlLabel
              className="remember-label"
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{
                    color: "rgba(148,163,184,0.4)",
                    "&.Mui-checked": { color: "#6366f1" },
                    padding: "4px 8px 4px 0",
                  }}
                />
              }
              label="Remember me"
            />
            <Link href="#" className="forgot-link">Forgot Password?</Link>
          </Box>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            disabled={submitting}
            className="signin-btn"
          >
            {submitting ? (
              <CircularProgress size={22} sx={{ color: "rgba(255,255,255,0.9)" }} />
            ) : (
              "Log In"
            )}
          </Button>

          <div className="footer-text">
            © {new Date().getFullYear()} Inventory Management. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}