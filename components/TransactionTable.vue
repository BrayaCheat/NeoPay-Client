<template>
  <div class="rounded-2xl border">
    <Table>
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
        <!-- <TableHead>
          <div class="flex items-center gap-2">
            <FileText class="size-4" />
            Remark
          </div>
        </TableHead> -->
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
        <TableCell :class="`${colorMapper(item.sender, item.status)} font-bold`"> {{signMapper(item.sender)}} {{ item.amount }} <span class="text-xs font-extralight">USD</span></TableCell>
        <!-- <TableCell>{{ item.currency }}</TableCell> -->
        <!-- <TableCell>{{ sliceText(item.remark, 8) }}</TableCell> -->
        <TableCell>{{ typeMapper(item.sender)  }}</TableCell>
        <TableCell>
          <StatusBadge :status="item.status" />
        </TableCell>
        <TableCell>{{ convertISODateToLocal(item.createdAt) }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </div>
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
  accountNumber: {
    type: String,
    required: true
  }
})
const colorMapper = (sender, status) => {
  switch(status){
    case 'FAILED':
      if (sender == props.accountNumber) {
        return 'text-red-500';
      }
      return 'text-muted-foreground';
    case 'PENDING':
      return 'text-yellow-500';
    case 'SUCCESS':
      if (sender == props.accountNumber) {
        return 'text-red-500';
      }
      return 'text-green-500';
    default:
      if (sender == props.accountNumber) {
        return 'text-red-500';
      }
      return 'text-primary';
  }
}
const typeMapper = (sender) => sender == props.accountNumber ? 'Sent' : 'Received'
const signMapper = (sender) => sender == props.accountNumber ? '-' : '+'
</script>