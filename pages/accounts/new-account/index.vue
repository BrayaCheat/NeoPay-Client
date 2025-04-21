<template>
  <div>
    <HeaderLabel title="New accounts" subtitle="create new bank accounts" />
    <form @submit.prevent="onCreateNewAccount" class="border p-9 rounded-xl shadow-sm w-1/2 flex flex-col gap-6">

      <div class="flex flex-col gap-3">
        <Label>Account Name</Label>
        <Input placeholder="e.g. Mobile Saving" v-model="accountName" />
      </div>

      <div class="flex flex-col gap-3">
        <Label>Account Type</Label>
        <Select v-model="accountType">
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              <SelectItem v-for="item, index in accountTypes" :key="index" :value="item">
                {{ item }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button>
        Create Account
      </Button>
    </form>
  </div>
</template>

<script setup>
import HeaderLabel from '~/components/Header.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createAccount } from '@/api/account';
import { useAccountStore } from '@/stores/account'
import { useUserStore } from '@/stores/user';
import { toast } from 'vue-sonner';

const userStore = useUserStore()
const accountStore = useAccountStore()
const accountTypes = ref([
  'SAVING',
  'SPENDING',
  'BUSINESS'
])
const accountName = ref('')
const accountType = ref('')

const onCreateNewAccount = async () => {
  if (!accountName.value || !accountType.value) {
    toast('Please fill all fields')
    return
  }
  accountStore.accounts = await createAccount(
    userStore.user.id,
    accountName.value,
    accountType.value
  )
  toast('Account created successfully', {
    description: 'You can now use this account to manage your finances.',
    type: 'success',
  })
  setTimeout(() => {
    return navigateTo('/dashboard/accounts')
  }, 1000);
}
</script>