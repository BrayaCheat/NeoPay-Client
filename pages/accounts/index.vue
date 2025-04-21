<template>
  <div class="flex flex-col gap-9">
    <div class="flex items-center justify-between">
      <Header title="Accounts" :subtitle="`You have ${filteredAccount.length} active accounts.`" />
      <NuxtLink to="/accounts/new-account">
        <Button>
          <component :is="Plus" />
          New Account
        </Button>
      </NuxtLink>
    </div>

    <div class="flex items-center gap-3">
      <div class="relative flex-1 max-w-md">
        <component
          :is="Search"
          class="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground/80 transition-all duration-300"
          :class="{ 'scale-90 text-primary': searchQuery.length }" />
        <Input v-model.trim.lazy="searchQuery" placeholder="Search by keyword..."
          class="w-full pl-10 pr-4 py-2 bg-background/95 backdrop-blur" :class="[
            'rounded-lg border border-input shadow-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
            'hover:border-primary/50 transition-colors duration-200',
            'placeholder:text-muted-foreground/80 placeholder:font-normal',
            { 'pl-12': !searchQuery.length } // Dynamic padding when typing
          ]" />
      </div>
      <!-- filter -->
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter by: </SelectLabel>
            <SelectItem value="demo">
              demo
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <!-- sort -->
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by: </SelectLabel>
            <SelectItem value="demo">
              demo
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="flex-1 flex items-center justify-end">
        <Button variant="outline" class="text-muted-foreground">
          <component :is="Settings" />
          Settings
        </Button>
      </div>
    </div>

    <div v-if="filteredAccount.length > 0" class="grid grid-cols-3 gap-9">
      <div v-for="(item, index) in filteredAccount" :key="index">
        <AccountCard
          :data="item"
          @onDeleteAccount="onFetchAccount"
        />
      </div>
    </div>
    <SkeletonCard v-else message="No accounts found. Create one?" :icon="Scroll"
      path="/accounts/new-account" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})
import PieChart from '@/components/PieChart.vue';
import AccountCard from '@/components/AccountCard.vue';
import { Plus, Scroll, Search, Settings } from 'lucide-vue-next';
import Header from '@/components/Header.vue';
import { getAccount } from '@/api/account';
import { useUserStore } from '@/stores/user.js';
import SkeletonCard from '@/components/SkeletonCard.vue';
import { useAccountStore } from '@/stores/account.js';

const accountStore = useAccountStore()
const userStore = useUserStore()
const filteredAccount = computed(() => accountStore?.accounts || [])

const searchQuery = ref('')

const onFetchAccount = async () => {
  await getAccount(userStore.user?.id);
}

onMounted(async () => {
  accountStore.accounts = await getAccount(userStore.user?.id);
})
</script>