"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, login: storeLogin, logout: storeLogout } = useAuthStore();

  const login = (email: string, password: string): boolean => {
    const success = storeLogin(email, password);
    if (success) {
      router.push("/");
      router.refresh();
    }
    return success;
  };

  const logout = () => {
    storeLogout();
    router.push("/login");
  };

  return { user, isAuthenticated, login, logout };
}
