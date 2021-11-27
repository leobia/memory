<template>
  <div>
    <div class="header">
      <div>
        {{'Moves: ' +  moves}}
      </div>

      <button class="button" @click="startGame()">Restart</button>
    </div>

    <transition-group tag="div" name="flip-list" class="cards">
      <memory-card v-for="item in deck"
                   :key="item.id"
                   class="card"
                   :face-back="item.flipped"
                   @click.native="handleClick(item)">
        <template v-slot:front>
          <div  class=" front">
            ❓
          </div>
        </template>
        <template v-slot:back>
          <div class="image-container">
            <img :src="require('../assets/' + item.value)" :alt="item.value"
                 class="city-image" :class="{ 'found': item.found }">
            <div class="centered" v-show="item.found">✔️</div>
          </div>

        </template>
      </memory-card>

    </transition-group>

    <memory-modal v-show="isModalVisible" @close="isModalVisible = false">
      <template v-slot:footer>
        <div class="modal-footer">
          <button
            type="button"
            class="button"
            @click="closeModal()"
          >
            Close
          </button>
          <button
            type="button"
            class="button success"
            @click="startGame()"
          >
            Restart
          </button>
        </div>

      </template>
    </memory-modal>
  </div>

</template>

<script>
import MemoryCard from './MemoryCard.vue';
import MemoryModal from './MemoryModal.vue';

export default {
  name: 'MemoryGrid',
  components: { MemoryModal, MemoryCard },
  data() {
    return {
      deck: [],
      cardSelected: [],
      moves: 0,
      isModalVisible: false,
    };
  },
  created() {
    this.createDeck();
    this.startGame();
  },
  methods: {
    createDeck() {
      const images = ['roma.jpg', 'parigi.jpg', 'newyork.jpg', 'milano.jpg', 'firenze.jpg', 'pisa.jpg'];
      this.deck = [...images, ...images].map((el, index) => ({
        id: index,
        value: el,
        flipped: false,
        found: false,
        game: 0,
      }));
    },

    startGame() {
      this.$confetti.stop();
      this.isModalVisible = false;

      for (let i = 0; i < this.deck.length; i++) {
        this.deck[i].flipped = false;
        this.deck[i].found = false;
        this.deck[i].game++;
      }
      this.shuffleDeck(this.deck);
      this.moves = 0;
    },

    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = this.deck[i];
        this.$set(this.deck, i, this.deck[j]);
        this.$set(this.deck, j, temp);
      }
    },

    handleClick(card) {
      if (!card.found && !card.flipped) {
        if (this.cardSelected.length < 2) {
          card.flipped = true;
          this.cardSelected.push(card);
          if (this.cardSelected.length === 2) {
            this.moves++;
            setTimeout(() => {
              if (this.cardSelected[0].value === card.value) {
                this.cardSelected[0].found = true;
                card.found = true;
                this.checkWin();
              } else {
                for (let j = 0; j < this.cardSelected.length; j++) {
                  this.cardSelected[j].flipped = false;
                }
              }
              this.cardSelected = [];
            }, 1000);
          }
        }
      }
    },

    checkWin() {
      if (this.deck.every((c) => c.found)) {
        this.$confetti.start({ defaultDropRate: 3 });
        this.isModalVisible = true;
      }
    },

    closeModal() {
      this.isModalVisible = false;
      this.$confetti.stop();
    },
  },
};
</script>

<style scoped>

.cards {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
}

/* if screen larger than 600px make grid 2 cols*/
@media (min-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* if screen larger than 600px make grid 3 cols*/
@media (min-width: 900px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.city-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.city-image.found {
  transition: 0.5s;
  filter: grayscale(100%);
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flip-list-move {
  transition: transform 0.6s;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  width: 250px;
  justify-content: space-between;
}
</style>
