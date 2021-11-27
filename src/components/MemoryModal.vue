<template>
  <div class="modal-backdrop">
    <div class="modal">

      <section class="modal-body">
        <slot name="body">
          You won!
        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
        </slot>

      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryModal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow:
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07)
  ;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}

.modal-footer {
  padding: 15px;
  display: flex;
  flex-direction: row;
}
.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  margin: auto;
}

</style>
