<template>
    <div class="flip-container"
         :class="{ 'face-back': faceBack }"
    >
      <div
        class="flipper"
      >
        <div class="front">
          <slot name="front" />
        </div>
        <div class="back">
          <slot name="back" />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MemoryCard',

  props: {
    faceBack: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.flip-container {
  perspective: 1000px;
  width: 100%;
  height: 120px;
}

/* every time the user click the flipper div rotates by 180 deg */
.flip-container.face-back .flipper {
  transform: rotateY(180deg);
}
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}
.front, .back {
  transform-style: preserve-3d; /* this fixed chrome issue*/
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

/* front starts at 0 degree*/
.front {
  z-index: 2;
  transform: rotateY(0);
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

}

/* back starts at 180 degree */
.back {
  transform: rotateY(180deg);
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);

}

.back, .front {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
