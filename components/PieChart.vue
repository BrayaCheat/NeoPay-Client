<template>
  <ClientOnly>
    <VueApexCharts type="donut" :options="chartOptions" :series="series" />
  </ClientOnly>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  data: {
    type: [Array, Object],
    required: true
  }
})

const normalizedData = computed(() => {
  return Array.isArray(props.data) ? props.data : props.data ? [props.data] : []
})

const series = computed(() => {
  const values = normalizedData.value.map(item => item.balance || 0)
  const total = values.reduce((a, b) => a + b, 0)
  return total === 0 ? [1] : values
})

const labels = computed(() => {
  const total = normalizedData.value.reduce((a, b) => a + (b.balance || 0), 0)
  return total === 0
    ? normalizedData.value.map(item => item.accountName)
    : normalizedData.value.map(item => item.accountName)
})

// Dynamic chart options
const chartOptions = computed(() => ({
  labels: labels.value,
  colors: ['#00b894', '#0984e3', '#fd79a8', '#e17055', '#6c5ce7'],
  legend: {
    position: 'bottom',
    fontSize: '14px',
    labels: {
      colors: ['#333'],
      useSeriesColors: false
    }
  },
  tooltip: {
    y: {
      formatter: (val) => `$ ${val.toFixed(2)}`
    }
  },
  dataLabels: {
    enabled: false,
    formatter: (val, opts) => `${val.toFixed(1)}%`
  },
  plotOptions: {
    pie: {
      donut: {
        size: '90%',
        labels: {
          show: true,
          total: {
            show: true,
            label: labels.value,
            fontSize: '14px',
            formatter: () => {
              const total = series.value?.reduce((a, b) => a + b, 0)
              return normalizedData.value.reduce((a, b) => a + b.balance, 0) === 0 ? '$0.00' : `$${total.toFixed(2)}`
            }

          }
        }
      }
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
}))
</script>
