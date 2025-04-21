<template>
  <NuxtLink :to="linkTo">
    <Card class="p-6 rounded-2xl border relative">
      <!-- Top: Account Name + Status Icon -->
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-base font-medium text-foreground truncate">{{ data.accountName }}</h2>
        <Popover>
          <PopoverTrigger as-child>
            <component :is="Ellipsis"
              class="w-5 h-5 text-muted-foreground absolute top-6 right-4 z-10 hover:text-primary duration-300"
              @click.stop.prevent="ellipButton" />
          </PopoverTrigger>
          <PopoverContent class="flex flex-col p-0">
            <div v-for="item in options" :key="item.label" class="py-1 border-b">
              <Button @click.prevent="item.action" variant="none"
                class="rounded-none flex items-center justify-start text-muted-foreground hover:text-primary duration-300 cursor-pointer">
                <component :is="item.icon" class="w-4 h-4 mr-2" />
                {{ item.label }}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <!-- Middle: Account Number + Type -->
      <div class="flex text-sm text-muted-foreground gap-2 mb-1">
        <span>{{ spacingAccountNumber(data.accountNumber) }}</span>
        <Separator orientation="vertical" />
        <span class="uppercase tracking-wide">{{ data.accountType }}</span>
      </div>

      <!-- Bottom: Balance -->
      <div class="text-right font-semibold text-md text-foreground">
        {{ balance }}
        <span class="text-muted-foreground text-sm">USD</span>
      </div>
    </Card>
  </NuxtLink>
</template>

<script setup>
import { Card } from '@/components/ui/card'
import { Ellipsis, ExternalLink, FilePenLine, Heart, LockKeyhole } from 'lucide-vue-next'
import { spacingAccountNumber } from '@/utils/helper.js'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const linkTo = computed(() => `/accounts/${props.data.id}`)
const balance = computed(() => `${Number(props.data.balance).toFixed(2)}`)
const ellipButton = () => {
  console.log('Ellipsis button clicked')
}

const onShareAccount = async () => {
  alert('Share account clicked')
}

const onRenameAccount = async () => {
  alert('Rename account clicked')
}

const onLockAccount = async () => {
  alert('Lock account clicked')
}

const onSetToDefault = async () => {
  alert('Set as default clicked')
}

const options = ref([
  {
    label: 'Share Account Detail',
    icon: ExternalLink,
    action: onShareAccount
  },
  {
    label: 'Renaeme Account',
    icon: FilePenLine,
    action: onRenameAccount
  },
  {
    label: 'Locked Account',
    icon: LockKeyhole,
    action: onLockAccount
  },
  {
    label: 'Set as default',
    icon: Heart,
    action: onSetToDefault
  }
])

// share account detail
// rename account
// lock account
// set as default

</script>
