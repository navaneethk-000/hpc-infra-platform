import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  // 1. CONFIG: Cookies accessible everywhere, 7-day expiry
  const cookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "lax",
  };

  const token = useCookie("token", cookieOptions);
  const user = useCookie("user", cookieOptions);

  // --- LOGIN ACTION ---
  async function login(email, password) {
    try {
      // Use PROXY URL to avoid CORS errors
      const response = await $fetch(
        "https://tenant.hpcinfra.com/api/auth/login",
        {
          method: "POST",
          body: { email, password },
        },
      );

      // 2. TOKEN EXTRACTION LOGIC
      let rawToken =
        response.token || response.accessToken || response.data?.token;

      // Extract string if it's an object (e.g. { AccessToken: "..." })
      if (rawToken && typeof rawToken === "object" && rawToken.AccessToken) {
        rawToken = rawToken.AccessToken;
      }

      // Final validation
      if (!rawToken || typeof rawToken !== "string") {
        throw new Error(
          "Could not extract a valid Token string from response.",
        );
      }

      // 3. Save STRING to Cookie
      token.value = rawToken;

      // 4. Map Roles
      const backendRole = response.user?.role || "DEVELOPER";
      const appRole = mapRole(backendRole);

      user.value = {
        ...response.user,
        role: appRole,
      };

      // Force update before redirect
      await nextTick();

      // 5. Redirect
      if (appRole === "IT_MANAGER") return navigateTo("/admin/dashboard");
      if (appRole === "CAD_MANAGER") return navigateTo("/cad/dashboard");
      return navigateTo("/developer/dashboard");
    } catch (error) {
      console.error("Login Failed:", error);
      throw error;
    }
  }

  // --- LOGOUT ACTION (FIXED) ---
  function logout(sessionExpired = false) {
    // 1. Clear State
    token.value = null;
    user.value = null;

    // 2. Determine destination
    const path = sessionExpired ? "/?expired=true" : "/";

    // 3. Instant Redirect (No page reload)
    return navigateTo(path, { replace: true });
  }

  // --- HELPER: Role Mapping ---
  function mapRole(role) {
    const r = role ? role.toString().toUpperCase() : "";
    if (r.includes("ADMIN") || r === "IT_MANAGER") return "IT_MANAGER";
    if (r.includes("CAD") || r === "CAD_MANAGER") return "CAD_MANAGER";
    return "DEVELOPER";
  }

  return { user, token, login, logout };
});
