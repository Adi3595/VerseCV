"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signUp, signIn, useSession } from "@/lib/auth/client";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState("");
  const { data: session, isPending: isSessionPending } = useSession();

  useEffect(() => {
    if (session && !isSessionPending) {
      router.push("/dashboard");
    }
  }, [session, isSessionPending, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      setRegisterError("");
      const { data: signUpData, error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.email.split('@')[0], // Better auth expects a name usually
      });
      
      if (error) {
        throw new Error(error.message || "Registration failed");
      }
      return signUpData;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: any) => {
      setRegisterError(error.message || "Registration failed. Please try again.");
    }
  });

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data);
  };
  
  const isSubmitting = registerMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <Image src="/logo.png" alt="VerseCV" width={48} height={48} className="mb-6 rounded-xl shadow-lg" />
          <h2 className="text-3xl font-outfit font-bold mb-2">Join VerseCV</h2>
          <p className="text-white/60">Your alternate careers await.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {registerError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
              {registerError}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 pl-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                {...register("email")}
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="bruce@wayne.com"
              />
            </div>
            {errors.email && <p className="text-primary text-sm pl-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                {...register("password")}
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-primary text-sm pl-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 pl-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                {...register("confirmPassword")}
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-primary text-sm pl-1">{errors.confirmPassword.message}</p>}
          </div>

        <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-4 text-sm text-white/50">Or</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              try {
                if (typeof signIn.social === "function") {
                  await signIn.social({ provider: "google", callbackURL: "/dashboard" });
                } else {
                  // Fallback for Neon Managed Auth OAuth via fetch
                  const res = await fetch(`${process.env.NEXT_PUBLIC_NEON_AUTH_URL}/sign-in/social`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      provider: 'google',
                      callbackURL: window.location.origin + '/dashboard'
                    })
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  }
                }
              } catch (error) {
                console.error("Google signin error:", error);
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
          
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              try {
                if (typeof signIn.social === "function") {
                  await signIn.social({ provider: "github", callbackURL: "/dashboard" });
                } else {
                  // Fallback for Neon Managed Auth OAuth via fetch
                  const res = await fetch(`${process.env.NEXT_PUBLIC_NEON_AUTH_URL}/sign-in/social`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      provider: 'github',
                      callbackURL: window.location.origin + '/dashboard'
                    })
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  }
                }
              } catch (error) {
                console.error("GitHub signin error:", error);
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-white/50 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-accent transition-colors font-medium">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
