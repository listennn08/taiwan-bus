<script setup lang="ts">
const props = defineProps<{
  type: string
  num: string
  modelValue: string
}>()
const emit = defineEmits<{
  (event: 'update:type', value: string): void
  (event: 'update:num', value: string): void
  (event: 'update:modelValue', value: string): void
}>()

const showKeyboard = ref(true)
const inputRef = ref<HTMLDivElement>()

const collectIdx = ref(0)
const typeBtn = [
  [
    { label: '紅', value: '紅' },
    { label: '藍', value: '藍' },
    { label: '綠', value: '綠' },
    { label: '棕', value: '棕' },
    { label: '橘', value: '橘' },
    { label: '幹道', value: '幹道' },
    { label: '<div text="lg" i-iconoir-language />', value: 'input' },
    { label: '更多', value: true },
  ],
  [
    { label: '內科', value: '內科' },
    { label: '通勤', value: '通勤' },
    { label: '南軟', value: '南軟' },
    { label: '小', value: '小' },
    { label: '市民', value: '市民' },
    { label: 'F', value: 'F' },
    { label: '<div text="lg" i-iconoir-language />', value: 'input' },
    { label: '返回', value: false },
  ],
]
const numberBtn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const clickBtn = (val: string | number | boolean) => {
  if (typeof val === 'boolean') {
    collectIdx.value = +val
    return
  }

  if (typeof val === 'number') {
    return emit('update:num', `${props.num}${val}`)
  }
  switch (val) {
    case 'reset':
      emit('update:type', '')
      emit('update:num', '')
      emit('update:modelValue', '')
      break
    case 'del':
      if (props.num) {
        return emit('update:num', props.num.substring(0, props.num.length - 1))
      }
      if (props.type) {
        return emit('update:type', '')
      }
      if (props.modelValue) {
        return emit(
          'update:type',
          props.modelValue.substring(0, props.modelValue.length - 1)
        )
      }
      break
    case 'input':
      inputRef.value?.focus()
      break
    default:
      return emit('update:type', val)
  }
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLDivElement
  emit('update:modelValue', target.innerText)
}
</script>
<template>
  <div
    fixed
    bottom="0"
    inset-x-0
    px="7.5"
    py="5"
    :h="showKeyboard ? '240px' : '36px'"
    text="primary"
    bg="white"
    rounded="t-lg"
    z="2"
  >
    <div
      ref="inputRef"
      min-h="6"
      lh="24px"
      mb="3"
      text="primary center"
      pointer-events-none
      contenteditable="true"
      focus:outline="none"
      @focus="showKeyboard = false"
      @blur="showKeyboard = true"
      @input="handleChange"
    >
      {{ type }}{{ num }}
    </div>
    <div v-if="showKeyboard" flex>
      <div grid="~ rows-4 cols-2 gap-2.5" mr="2.5" w="40%">
        <button
          v-for="btn in typeBtn[collectIdx]"
          v-html="btn.label"
          :key="`type-btn${btn.label}`"
          @click="clickBtn(btn.value)"
          keyboard
        />
      </div>
      <div grid="~ rows-4 cols-3 gap-2.5" w="60%">
        <button
          v-for="num in numberBtn"
          :key="`num-btn${num}`"
          keyboard
          @click="clickBtn(num)"
        >
          {{ num }}
        </button>
        <button keyboard @click="clickBtn('reset')">重設</button>
        <button
          keyboard
          flex
          items="center"
          justify="center"
          @click="clickBtn('del')"
        >
          <IconDelete />
        </button>
      </div>
    </div>
  </div>
</template>
