import type { App } from 'vue';
import ECharts from 'vue-echarts';
import { use, registerTheme } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  BarChart,
  RadarChart,
  PieChart,
  LineChart,
  CandlestickChart
} from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GraphicComponent,
  DataZoomComponent
} from 'echarts/components';
// @ts-ignore
import theme from './theme.json';

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  GraphicComponent,
  RadarChart,
  LegendComponent,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LineChart,
  CandlestickChart,
  DataZoomComponent
]);
registerTheme('default-theme', theme);

const Chart = {
  install(app: App) {
    app.component('v-chart', ECharts);
  }
};
export default Chart;
