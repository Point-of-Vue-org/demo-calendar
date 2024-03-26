<script setup>
import { computed, ref } from 'vue'

const today = ref(new Date())
const month = ref(today.value.getMonth())
const year = ref(today.value.getFullYear())
const isPresent = computed(() => month.value === today.value.getMonth() && year.value === today.value.getFullYear())

const dates = computed(() => {
  const dates = []
  for (let d = new Date(year.value, month.value, 1); d.getMonth() === month.value; d.setDate(d.getDate() + 1)) {
    dates.push([d.getDay(), d.getDate()])
  }
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
</script>

<template>
  <div>
    <h1>{{ year }}-{{ month + 1 }}</h1>
    <div class="grid grid-cols-7">
      <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">{{ day }}</div>
      <div v-for="date in datesBefore" :key="date[1]" class="opacity-50">{{ date[1] }}</div>
      <div v-for="date in dates" :key="date[1]" :class="{ 'text-red-500': date[1] === today.getDate() && isPresent }">{{ date[1] }}</div>
      <div v-for="date in datesAfter" :key="date[1]" class="opacity-50">{{ date[1] }}</div>
    </div>
    <button @click="prevMonth">Prev</button>
    <button @click="nextMonth">Next</button>
  </div>
</template>

<style scoped>

</style>