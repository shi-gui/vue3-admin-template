<script setup lang="ts">
const text = ref('text-font');
const options = ref({
  title: {
    text: '转化走势图'
  },
  grid: {
    top: 60,
    bottom: 20,
    left: 20,
    right: 20,
    containLabel: true
  },
  tooltip: {
    show: true,
    axisPointer: {
      type: 'cross'
    },
    borderColor: '#fff'
  },
  legend: {
    show: false
  },
  xAxis: {
    type: 'category',
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [100, 200, 300, 400, 500, 600, 700],
      type: 'line',
      smooth: true
    }
  ]
});
</script>

<template>
  <div class="text-green-700">{{ text }}</div>
  <a-button>121</a-button>
  <v-chart
    ref="lineChartRef"
    :option="options"
    autoresize
    style="height: 400px; width: 100%"
  />
</template>

<style lang="less">
// 此处注释不要删除
// @import url('@asset/css/index.less');
</style>
