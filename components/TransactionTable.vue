<template>
  <Table class="border">
    <TableCaption>A records of your recent transactions.</TableCaption>
    <TableHeader class="bg-secondary">
      <TableRow>
        <TableHead>
          <div class="flex items-center gap-2">
            <Tags class="size-4" />
            Reference
          </div>
        </TableHead>
        <TableHead>
          <div class="flex items-center gap-2">
            <ArrowUpRight class="size-4" />
            Sender
          </div>
        </TableHead>
        <TableHead>
          <div class="flex items-center gap-2">
            <ArrowDownLeft class="size-4" />
            Receiver
          </div>
        </TableHead>
        <TableHead>
          <div class="flex items-center gap-2">
            <DollarSign class="size-4" />
            Amount
          </div>
        </TableHead>
        <!-- <TableHead><CircleDollarSign class="size-4" /> Currency</TableHead> -->
        <TableHead>
          <div class="flex items-center gap-2">
            <FileText class="size-4" />
            Remark
          </div>
        </TableHead>
        <TableHead>
          <div class="flex items-center gap-2">
            <Shuffle class="size-4" />
            Type
          </div>
        </TableHead>
        <TableHead>
          <div class="flex items-center gap-2">
            <BadgeCheck class="size-4" />
            Status
          </div>
        </TableHead>
        <TableHead>
          <div class="flex items-center gap-2">
            <CalendarClock class="size-4" />
            Transaction's Date
          </div>
        </TableHead>
      </TableRow>

    </TableHeader>
    <TableBody>
      <TableRow v-for="(item, index) in props.data" :key="item.id">
        <TableCell class="font-medium">{{ item.reference }}</TableCell>
        <TableCell>{{ spacingAccountNumber(item.sender) }}</TableCell>
        <TableCell>{{ spacingAccountNumber(item.receiver) }}</TableCell>
        <TableCell :class="color(item.status)">{{ amountDisplay }} {{ item.amount }}</TableCell>
        <!-- <TableCell>{{ item.currency }}</TableCell> -->
        <TableCell>{{ sliceText(item.remark, 8) }}</TableCell>
        <TableCell>{{ item.receiver === props.accountNumber ? 'Received' : 'Sent'  }}</TableCell>
        <TableCell>
          <StatusBadge :status="item.status" />
        </TableCell>
        <TableCell>{{ convertISODateToLocal(item.createdAt) }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { convertISODateToLocal, spacingAccountNumber, sliceText } from '@/utils/helper.js'
import { Tags, ArrowUpRight, ArrowDownLeft, DollarSign, FileText, Shuffle, CalendarClock, BadgeCheck } from 'lucide-vue-next';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  }
})
console.log(props.accountNumber)
const color = (status) => {
  switch (status) {
    case 'SUCCESS':
      return 'text-green-500'
    case 'FAILED':
      return 'text-muted-foreground'
    default:
      return 'text-muted-foreground'
  }
}
const amountDisplay = computed(() => props.status === 'receive' ? '$' : '$')
</script>