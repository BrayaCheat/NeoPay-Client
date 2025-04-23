<template>

  <div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
      <div :class="cn('flex flex-col gap-6', props.class)">
        <Card class="overflow-hidden p-0">
          <CardContent class="grid p-0 md:grid-cols-2">
            <form class="p-6 md:p-8" @submit.prevent="onRegister">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center text-center">
                  <h1 class="text-2xl font-bold">
                    Welcome To NeoPay
                  </h1>
                  <p class="text-muted-foreground text-sm">
                    Signup to become a member of NeoPay
                  </p>
                </div>

                <div class="grid gap-3">
                  <Label>Full name</Label>
                  <Input type="text" v-model.trim.lazy="registerModel.fullName" placeholder="Braya Cheat" />
                </div>

                <div class="grid gap-3">
                  <Label>Email</Label>
                  <Input type="email" v-model.trim.lazy="registerModel.email" placeholder="brayacheat@gmail.com" />
                </div>

                <div class="grid gap-3">
                  <Label>Password</Label>
                  <Input type="password" v-model.trim.lazy="registerModel.password" placeholder="e.g 012@@ANC" />
                </div>

                <div class="grid gap-3">
                  <Label>Confirm Password</Label>
                  <Input type="password" v-model.trim.lazy="registerModel.confirmPassword" placeholder="e.g 012@@ANC" />
                </div>

                <Button :disabled="isLoading">
                  <component v-if="isLoading" :is="Loader2" class="animate-spin" />
                  <p v-else>Continue</p>
                </Button>

                <NuxtLink to="/auth" class="text-muted-foreground text-sm">
                  <span>Already have an account? <span class="underline">Go back to login</span></span>
                </NuxtLink>
              </div>
            </form>
            <div class="bg-muted relative hidden md:block">
              <NuxtImg
                src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image" class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            </div>
          </CardContent>
        </Card>
        <div
          class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'auth'
})
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { register } from '@/api/auth';
import { Loader2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { useAuthStore } from '@/stores/auth';
import { Card, CardContent } from '@/components/ui/card'
import { isAxiosError } from 'axios';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const authStore = useAuthStore()
const registerModel = reactive<any>({
  email: '',
  password: '',
  confirmPassword: '',
  fullName: ''
})
const isLoading = ref<boolean>(false)

const onRegister = async () => {
  if (registerModel.password !== registerModel.confirmPassword) {
    toast('Failed', { description: 'Confirm password must be the same as password', style: { backgroundColor: 'var(--destructive)', color: 'var(--primary)', border: 'var(--destructive)' } })
    return
  }
  try {
    isLoading.value = true
    const res = await register(registerModel.email, registerModel.password, registerModel.fullName);
    if (res?.status !== 200) {
      isLoading.value = false
      console.log('Resgiter error response: ', res)
      toast(res?.data?.detail || 'Internal server error', {
        description: res?.data?.description || 'Failed to register'
      })
      return
    }
    isLoading.value = false
    console.log('Register response: ', res)
    return
    authStore.auth = res.data
  } catch (error: any) {
    isLoading.value = false
    if(isAxiosError(error)){
      toast(error?.response?.data?.description, {style: { backgroundColor: 'var(--destructive)', color: 'var(--primary)', border: 'var(--destructive)' }})
    }
  }
}
</script>