<template>
  <VueApexCharts type="donut" :options="chartOptions" :series="series" :width="props.width" />
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  width: {
    type: String,
    default: '300'
  }
})

// Series and labels
const series = computed(() => props.data.map(item => item.balance))
const labels = computed(() => props.data.map(item => item.accountName))

// Dynamic chart options
const chartOptions = computed(() => ({
  labels: labels.value,
  colors: ['#00b894', '#0984e3', '#fd79a8', '#e17055', '#6c5ce7'], // Custom colors
  legend: {
    position: 'bottom',
    fontSize: '14px',
    labels: {
      colors: ['#333'], // label text color
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
              return `$${series.value.reduce((a, b) => a + b, 0).toFixed(2)}`
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
