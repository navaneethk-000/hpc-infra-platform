import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  // Use cookies to ensure data survives page refreshes
  const token = useCookie('token'); 
  const user = useCookie('user'); 

  async function login(email, password) {
    try {
      const response = await $fetch("https://tenant.hpcinfra.com/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      console.log("API Response:", response); // Debugging

      token.value = response.token; 
      
      const backendRole = response.user?.role || 'DEVELOPER';
      const appRole = mapRole(backendRole);

      user.value = {
        ...response.user,
        role: appRole
      };

      // Redirect
      if (appRole === 'IT_MANAGER') return navigateTo('/admin/dashboard');
      if (appRole === 'CAD_MANAGER') return navigateTo('/cad/dashboard');
      return navigateTo('/developer/dashboard');

    } catch (error) {
      console.error("Login Failed:", error);
      throw error; // Pass error to component to show "Invalid Credentials"
    }
  }

  // --- LOGOUT ---
  function logout() {
    token.value = null;
    user.value = null;
    return navigateTo('/');
  }

  // Map Backend Roles to Frontend Roles
  function mapRole(role) {
    const r = role ? role.toString().toUpperCase() : '';
    if (r.includes('ADMIN') || r === 'IT_MANAGER') return 'IT_MANAGER';
    if (r.includes('CAD') || r === 'CAD_MANAGER') return 'CAD_MANAGER';
    return 'DEVELOPER';
  }

  return { user, token, login, logout };
});