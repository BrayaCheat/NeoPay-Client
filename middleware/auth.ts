import { useAuthStore } from "@/stores/auth.js";
import { useUserStore } from "@/stores/user.js";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  if (!authStore.auth) {
    return navigateTo("/auth");
  }

  if (!authStore.auth.token) {
    return navigateTo("/auth");
  }
});
