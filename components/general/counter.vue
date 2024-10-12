<template>
  <span data-aos="fade-up" class="counter">
    {{ displayValue }}
  </span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  endValue: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 2000, // Animation duration in milliseconds
  },
});

const displayValue = ref(0);
const isAnimating = ref(false);
let observer;

const startCounting = () => {
  const startValue = 0;
  const endValue = props.endValue;
  const duration = props.duration;
  let startTime = null;

  isAnimating.value = true;

  const animate = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    displayValue.value = Math.floor(
      progress * (endValue - startValue) + startValue
    );
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isAnimating.value = false; // Reset animation flag after counting finishes
    }
  };

  requestAnimationFrame(animate);
};

onMounted(() => {
  const element = document.querySelector(".counter");

  if (element) {
    // Add IntersectionObserver with a fallback for mobile
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating.value) {
            startCounting();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    // Fallback in case the observer doesn't trigger on mobile
    setTimeout(() => {
      if (!isAnimating.value) {
        startCounting();
      }
    }, 500); // A short delay to allow for viewport detection
  }
});

onBeforeUnmount(() => {
  if (observer && observer.disconnect) {
    observer.disconnect();
  }
});
</script>
