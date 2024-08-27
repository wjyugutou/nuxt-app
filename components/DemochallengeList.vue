<script lang='ts' setup generic="T extends {
  path: string;
  name?: string;
  description?: string;
}"
>
defineOptions({ name: 'DemochallengeList' })
const props = defineProps<{
  list: T[]
}>()

const activeIndex = ref(7)
const searchName = ref()

watch(searchName, (newValue) => {
  const index = props.list.map(item => item.name?.toLocaleLowerCase()).findIndex(item => item?.includes(`${newValue}`.toLocaleLowerCase()))
  console.log(111)

  if (index !== -1)
    activeIndex.value = index
})
</script>

<template>
  <ul class="list">
    <li v-for="item, i in list" :key="item.path">
      <NuxtLink
        class="item" :class="i === activeIndex && 'active'"
        :title="item.name"
        :to="item.path"
      >
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.list {
  &::-webkit-scrollbar {
    display: none;
  }

  & .item {
    @apply hover:(color-blue-400 bg-gray-400/20) transition w-full block;
  }
}
</style>
