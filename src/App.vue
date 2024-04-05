<script setup>
import Calendar from './components/Calendar.vue'

function dateClick(date) {
  console.log(date)
}
</script>

<template>
  <div>
    <Calendar
      @dateClick="dateClick"
      :highlightRange="[
        {
          name: 'Event 1',
          start: new Date(2024,1,2).getTime(),
          end: new Date(2024,1,10).getTime(),
          color: '#99f'
        },
        {
          name: 'Event 2',
          start: new Date(2024,1,13).getTime(),
          end: new Date(2024,1,14).getTime(),
          color: '#f99'
        },
        {
          name: 'Event 3',
          start: new Date(2024,1,9).getTime(),
          end: new Date(2024,1,11).getTime(),
          color: '#9f9'
        },
        {
          name: 'Event 3',
          start: new Date(2024,1,6).getTime(),
          end: new Date(2024,1,8).getTime(),
          color: 'orange'
        },
        {
          name: 'ดูออก',
          start: new Date(2024,2,8).getTime(),
          end: new Date(2024,2,10).getTime(),
          color: 'red'
        },
        {
          name: 'เดินทาง',
          start: new Date(2024,2,8).getTime(),
          end: new Date(2024,2,20).getTime(),
          color: 'red'
        },
      ]"
    />
  </div>
</template>

<style scoped>

</style>