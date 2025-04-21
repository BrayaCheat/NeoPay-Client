<template>
  <ClientOnly>
    <VueApexCharts
      type="donut"
      :options="chartOptions"
      :series="processedSeries"
      :width="width"
    />
  </ClientOnly>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => {
      return value.every(item => item && typeof item.balance === 'number' && item.accountName)
    }
  },
  width: {
    type: [String, Number],
    default: '300'
  }
})

// Process series data with fallback for empty state
const processedSeries = computed(() => {
  if (!props.data.length) return [0]
  const values = props.data.map(item => Math.max(0, item.balance)) // Ensure non-negative
  const total = values.reduce((a, b) => a + b, 0)
  return total > 0 ? values : [0]
})

// Generate labels with fallback
const chartLabels = computed(() => {
  if (!props.data.length) return ['No Data']
  return props.data.map(item => item.accountName || 'Unnamed Account')
})

// Dynamic chart options
const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  labels: chartLabels.value,
  colors: ['#00b894', '#0984e3', '#fd79a8', '#e17055', '#6c5ce7'],
  legend: {
    position: 'bottom',
    fontSize: '12px',
    itemMargin: {
      horizontal: 8,
      vertical: 4
    },
    markers: {
      width: 12,
      height: 12,
      radius: 6
    }
  },
  tooltip: {
    enabled: props.data.length > 0,
    y: {
      formatter: (val) => `$${val.toLocaleString()}`
    }
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            color: '#64748b'
          },
          value: {
            show: true,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#0f172a',
            formatter: (val) => `$${parseFloat(val).toLocaleString()}`
          },
          total: {
            show: props.data.length > 0,
            label: 'Total',
            color: '#64748b',
            formatter: () => {
              const total = processedSeries.value.reduce((a, b) => a + b, 0)
              return `$${total.toLocaleString()}`
            }
          }
        }
      }
    }
  },
  noData: {
    text: 'No data available',
    align: 'center',
    verticalAlign: 'middle',
    style: {
      color: '#64748b',
      fontSize: '14px'
    }
  },
  responsive: [{
    breakpoint: 768,
    options: {
      chart: {
        width: '100%'
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      }
    }
  }]
}))
</script>

<style scoped>
/* Add any custom styling here */
</style>