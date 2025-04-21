<script setup>
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { Home, Banknote, Receipt, DollarSign, CreditCard, Users } from 'lucide-vue-next';
import LogoutButton from '@/components/LogoutButton.vue';

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Accounts",
    url: "/accounts",
    icon: Users,
  },
  {
    title: "Transfer Money",
    url: "/transfer",
    icon: DollarSign,
  }
];
const route = useRoute()

const isActive = (url) => {
  return route.path === url;
};
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <h1 class="text-xl">NeoPay</h1>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu class="gap-3">
            <SidebarMenuItem v-for="item in items" :key="item.title" :class="`${isActive(item.url) ? 'text-primary' : 'text-muted-foreground'}`">
              <SidebarMenuButton asChild>
                <NuxtLink :to="item.url">
                  <component :is="item.icon" class="w-10"/>
                  <span class="text-md">{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <LogoutButton/>
    <SidebarFooter />
  </Sidebar>
</template>