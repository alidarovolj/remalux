<template>
  <span
      data-aos="fade-up"
      class="counter">
    {{ displayValue }}
  </span>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const props = defineProps({
  endValue: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 2000, // Время анимации в миллисекундах
  },
});

const displayValue = ref(0);
const isAnimating = ref(false);
let observer;

onMounted(() => {
  const element = document.querySelector('.counter');

  // Создаем Intersection Observer для отслеживания появления элемента на экране
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isAnimating.value) {
        startCounting();
      }
    });
  });

  observer.observe(element);
});

const startCounting = () => {
  const startValue = 0;
  const endValue = props.endValue;
  const duration = props.duration;
  let startTime = null;

  isAnimating.value = true;

  const animate = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    displayValue.value = Math.floor(progress * (endValue - startValue) + startValue);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Устанавливаем флаг анимации в false, чтобы при следующем появлении элемент анимировался заново
      isAnimating.value = false;
    }
  };

  requestAnimationFrame(animate);
};
</script>

