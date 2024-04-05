<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  highlightRange: {
    type: Array,
    // default: 
  }
})

const emits = defineEmits(['dateClick'])

const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const today = ref(new Date())
const month = ref(today.value.getMonth())
const year = ref(today.value.getFullYear())
const isPresent = computed(() => month.value === today.value.getMonth() && year.value === today.value.getFullYear())

const dates = computed(() => {
  const dates = []
  for (let d = new Date(year.value, month.value, 1); d.getMonth() === month.value; d.setDate(d.getDate() + 1)) {
    dates.push([d.getDay(), d.getDate(), d.getTime()])
  }
  console.log(dates);
  return dates
})

const datesBefore = computed(() => {
  const dates = []
  for (let d = new Date(year.value, month.value, 1).getDay(); d > 0; d--) {
    const date = new Date(year.value, month.value, 1)
    date.setDate(date.getDate() - d)
    dates.push([date.getDay(), date.getDate()])
  }
  return dates
})

const datesAfter = computed(() => {
  const dates = []
  let day = 1
  for (let d = new Date(year.value, month.value + 1, 0).getDay(); d < 6; d++) {
    const date = new Date(year.value, month.value + 1, 0)
    date.setDate(date.getDate() + day++)
    dates.push([date.getDay(), date.getDate()])
  }
  return dates
})

function prevMonth() {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
}

function nextMonth() {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
}

onMounted(() => {
  console.log('mounted')
  console.log(props.highlightRange)
})

const highlightHoverIndex = ref(null)
const handleHighlightHover = (e, index) => {
  // e.stopPropagation()
  console.log(index);
  highlightHoverIndex.value = index
}
</script>

<template>
  <div class="flex flex-col w-72 items-center bg-neutral rounded-2xl h-[15.5rem] select-none">
    <div class="flex w-full my-2 justify-center">
      <button @click="prevMonth">&ltcc;</button>
      <div class="font-bold w-1/2 text-center">
        <select v-model="month" class="w-fit appearance-none text-center bg-neutral focus:outline-none focus:bg-base-100 focus:rounded-md">
          <option v-for="(month, index) in monthArray" :key="index" :value="index">{{ month }}</option>
        </select> {{ year }}</div>
      <button @click="nextMonth">&gtcc;</button>
    </div>
    <div class="grid grid-cols-7 grid-rows-6 gap-1 place-items-center">
      <div v-for="day in dayArray" :key="day">{{ day }}</div>
      <div v-for="date in datesBefore" @click="prevMonth" :key="date[1]" class="opacity-50 cursor-pointer hover:opacity-25">{{ date[1] }}</div>
      <div 
        v-for="date in dates"
        :key="date[1]"
        class="relative flex justify-center items-center w-full h-full cursor-pointer hover:opacity-50"
        :class="{ 'bg-accent text-neutral rounded-md': date[1] === today.getDate() && isPresent }"
        @click="$emit('dateClick', date[2])"
      >
        <div
          v-for="(range, rangeIndex) in highlightRange"
          v-show="date[2] >= range.start && date[2] <= range.end"
          :key="rangeIndex"
          class="absolute w-9 h-4 opacity-20"
          :style="date[2] >= range.start && date[2] <= range.end ? { backgroundColor: range.color } : ''"
          :class="{
            'opacity-60 scale-105': highlightHoverIndex === rangeIndex,
            'rounded-l-md': date[2] === range.start,
            'rounded-r-md': date[2] === range.end,
          }"
          @mouseover="handleHighlightHover($event, rangeIndex)"
          @mouseleave="highlightHoverIndex = null"
          @click="e => e.preventDefault()"
          :title="range.name"
        ></div>
        <div class="pointer-events-none absolute">{{ date[1] }}</div>
      </div>
      <div v-for="date in datesAfter" :key="date[1]" @click="nextMonth" class="opacity-50 cursor-pointer hover:opacity-25">{{ date[1] }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>