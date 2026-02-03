import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const cookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  const token = useCookie("token", {
    ...cookieOptions,
    default: () => null,
  });

  const user = useCookie("user", {
    ...cookieOptions,
    default: () => null,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const isAuthenticated = computed(() => !!token.value);

  async function login(email, password) {
    try {
      const response = await $fetch("/proxy-api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      // ---- TOKEN EXTRACTION ----
      let rawToken =
        response.token ||
        response.accessToken ||
        response.data?.token ||
        response.data?.accessToken;

      if (rawToken && typeof rawToken === "object" && rawToken.AccessToken) {
        rawToken = rawToken.AccessToken;
      }

      if (!rawToken || typeof rawToken !== "string") {
        throw new Error("Invalid token received from backend");
      }

      token.value = rawToken;

      // ---- USER + ROLE MAPPING ----
      if (!response.user) {
        throw new Error("User data missing from login response");
      }

      const backendRole = response.user.role || "DEVELOPER";
      const appRole = mapRole(backendRole);

      user.value = {
        ...response.user,
        role: appRole,
      };

      await nextTick();

      // ---- REDIRECT ----
      //   if (appRole === "IT_MANAGER") {
      //     return navigateTo("/admin/dashboard");
      //   }

      //   if (appRole === "CAD_MANAGER") {
      //     return navigateTo("/cad/dashboard");
      //   }

      //   return navigateTo("/developer/dashboard");
      return appRole === "IT_MANAGER"
        ? navigateTo("/admin/dashboard")
        : navigateTo("/developer/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async function logout(sessionExpired = false) {
    token.value = null;
    user.value = null;

    const path = sessionExpired ? "/?expired=true" : "/";
    await navigateTo(path, { replace: true });
  }

  function mapRole(role) {
    const r = role ? role.toString().toUpperCase() : "";

    if (r.includes("ADMIN") || r === "IT_MANAGER") return "IT_MANAGER";
    if (r.includes("CAD") || r === "CAD_MANAGER") return "CAD_MANAGER";

    return "DEVELOPER";
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };
});
