<script lang='ts' setup>
import type { ShallowRef } from 'vue'
import type { WaveSurferOptions } from 'wavesurfer.js'
import WaveSurfer from 'wavesurfer.js'
import Regions from 'wavesurfer.js/dist/plugins/regions.esm.js'
import Envelope from 'wavesurfer.js/dist/plugins/envelope.esm.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js'

// 从麦克风录制
import Record from 'wavesurfer.js/dist/plugins/record.esm.js'
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import Zoom from 'wavesurfer.js/dist/plugins/zoom.esm.js'

const props = withDefaults(defineProps<Omit<WaveSurferOptions, 'container'>>(), {
  width: 400,
  height: 150,
  backend: 'MediaElement',
  waveColor: 'rgb(200, 0, 200)',
  progressColor: 'rgb(100, 0, 100)',
  normalize: true,
  autoCenter: true,
  autoScroll: true,
  cursorWidth: 1,
  dragToSeek: false,
  fillParent: true,
  interact: true,
  minPxPerSec: 0,
  sampleRate: 8000,
  barWidth: 5,
})
const wavesurfer = shallowRef() as ShallowRef<WaveSurfer>
const container = ref()

function init() {
  wavesurfer.value = WaveSurfer.create({
    ...props,
    container: container.value,
    plugins: [

    ],
  })

  wavesurfer.value.on('interaction', () => {
    console.log('interaction')

    wavesurfer.value.play()
  })

  wavesurfer.value.on('decode', (e) => {
    console.log(e)
  })

  wavesurfer.value.on('click', () => {
    console.log('click')
  })
}

function addRegionsPlugin() {
  const plugin = wavesurfer.value.registerPlugin(Regions.create())

  plugin.addRegion({
    start: 10,
    end: 14,
    content: 'Resize me(loop)',
    color: useRandomColor(0.2),
    drag: false,
    resize: true,
  })
  // 选择空白区域添加 regions
  plugin.enableDragSelection({
    color: 'rgba(255, 0, 0, 0.1)',
  })

  plugin.on('region-clicked', (region, e) => {
    e.stopPropagation() // prevent triggering a click on the waveform

    region.play()
    // @ts-expect-error any
    region.setOptions({ color: useRandomColor(0.2) })
  })

  plugin.on('region-out', (region) => {
    region.play()
  })

  return plugin
}

function addEnvelopePlugin() {
  const plugin = wavesurfer.value.registerPlugin(Envelope.create({
    volume: 0.8,
    lineColor: 'rgba(255, 0, 0, 0.5)',
    lineWidth: '4',
    dragPointSize: 12,
    dragLine: true,
    dragPointFill: 'rgba(0, 255, 255, 0.8)',
    dragPointStroke: 'rgba(0, 0, 0, 0.5)',

    points: [
      { time: 11.2, volume: 0.5 },
      { time: 15.5, volume: 0.8 },
    ],
  }))
  plugin.addPoint({ time: 1, volume: 0.9 })
  return plugin
}
function addHoverPlugin() {
  const plugin = wavesurfer.value.registerPlugin(Hover.create())
  return plugin
}
function addMinimapPlugin() {
  const plugin = wavesurfer.value.registerPlugin(Minimap.create({
    height: 20,
    waveColor: '#ddd',
    progressColor: '#999',
  }))
  return plugin
}
function addRecordPlugin() {
  const plugin = wavesurfer.value.registerPlugin(Record.create())
  return plugin
}
function addSpectrogramPlugin() {
  const plugin = wavesurfer.value.registerPlugin(Spectrogram.create({
    // splitChannels: true,
    // 'bartlett' | 'bartlettHann' | 'blackman' | 'cosine' | 'gauss' | 'hamming' | 'hann' | 'lanczoz' | 'rectangular' | 'triangular';
    windowFunc: 'blackman',
    // 显示频率
    labels: true,
    height: 200,
    splitChannels: true,
    // labelsBackground: 'rgb(200, 0, 200)',
    labelsColor: 'rgb(200, 0, 200)',
    labelsHzColor: '#4aa0d2',
  }))
  wavesurfer.value.setOptions({ minPxPerSec: 1 })
  return plugin
}
function addTimelinePlugin() {
  const plugin = wavesurfer.value.registerPlugin(Timeline.create())
  return plugin
}
function addZoomPlugin() {
  const plugin = wavesurfer.value.registerPlugin(Zoom.create())
  wavesurfer.value.setOptions({ minPxPerSec: 10 })
  const destroy = plugin.destroy
  plugin.destroy = () => {
    wavesurfer.value.setOptions({ minPxPerSec: 1 })
  }
  return plugin
}

function pluginHandler(item: { name: string; handler: () => any; enable: boolean; plugin: any | null }) {
  if (!item.enable) {
    const a = item.handler()
    item.plugin = a
  }
  else {
    console.log(111, item)

    item.plugin.destroy()
  }

  item.enable = !item.enable
}

watchEffect(() => {
  if (props.url && wavesurfer.value)

    wavesurfer.value.load(props.url)
})

onMounted(() => {
  init()
})

defineExpose({
  instance: wavesurfer,
})
const plugins = ref<{ name: string; handler: () => any; enable: boolean; plugin: any | null }[]>([
  { plugin: null, name: 'Regions', handler: addRegionsPlugin, enable: false },
  { plugin: null, name: 'Envelope', handler: addEnvelopePlugin, enable: false },
  { plugin: null, name: 'Hover', handler: addHoverPlugin, enable: false },
  { plugin: null, name: 'Minimap', handler: addMinimapPlugin, enable: false },
  { plugin: null, name: 'Record', handler: addRecordPlugin, enable: false },
  { plugin: null, name: 'Spectrogram', handler: addSpectrogramPlugin, enable: false },
  { plugin: null, name: 'Timeline', handler: addTimelinePlugin, enable: false },
  { plugin: null, name: 'Zoom', handler: addZoomPlugin, enable: false },
])
</script>

<template>
  <div class="p-2">
    <div class="flex-center gap-2">
      <button v-for="item in plugins" :key="item.name" class="basic-btn" :class="{ 'important-bg-blue-400': item.enable }" @click="pluginHandler(item)">
        {{ item.name }}
      </button>
    </div>
    <div ref="container">
      <!-- the waveform will be rendered here -->
    </div>
  </div>
</template>
