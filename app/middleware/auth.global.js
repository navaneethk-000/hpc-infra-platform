import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = useCookie('token');

  // Not logged in? Block access
  if (!token.value && to.path !== '/' && to.path !== '/register') {
    return navigateTo('/');
  }

  // Logged in? Redirect from Login page
  if (token.value && (to.path === '/' || to.path === '/register')) {
    const role = authStore.user?.role;
    if (role === 'IT_MANAGER') return navigateTo('/admin/dashboard');
    if (role === 'CAD_MANAGER') return navigateTo('/cad/dashboard');
    return navigateTo('/developer/dashboard');
  }

  // Role protection
  
  // Non-Admins trying to access Admin pages Kick to Dev Dashboard
  if (to.path.startsWith('/admin') && authStore.user?.role !== 'IT_MANAGER') {
    return navigateTo('/developer/dashboard');
  }

  // Non-CAD Managers trying to access CAD pages Kick to Dev Dashboard
  if (to.path.startsWith('/cad') && authStore.user?.role !== 'CAD_MANAGER') {
    return navigateTo('/developer/dashboard');
  }
});