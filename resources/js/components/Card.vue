<template>
  <div class="col-xs-12 col-sm-4">
    <div class="card">
      <router-link
        class="img-card"
        :to="{ name: 'notes', params: {id: cardRef } }"
      >
        <img
          src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"
        />
      </router-link>
      <div class="card-content">
        <h4 class="card-title">
          <router-link 
            :to="{ name: 'notes', params: {id: cardRef } }"
            >
            <span v-html="title"></span>
          </router-link>
        </h4>
            <div v-html="shortDesc"></div>
      </div>
      <div class="card-details">
          <div class="card-author">
              <p>{{author}}</p>
              <em>{{createdDate}}</em>
          </div>
      </div> 
      <div class="card-read-more d-flex justify-content-between align-items-center">
        <router-link 
        :to="{ name: 'notes', params: {id: cardRef } }"
        class="btn btn-link btn-block">Read More</router-link>
        <fa v-if="this.user.name === author" @click="localdestroyNotes" icon="trash-alt" fixed-width />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    title: { type: String, default: null },
    thumbnail: { type: String, default: null },
    shortDesc: { type: String, default: null },
    author: { type: String, default: null },
    createdDate : { type: String},
    cardRef : {type: Number}
  },
  computed : {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods : {
    localdestroyNotes() {
      this.$store.dispatch("notes/destroyNote",this.cardRef);
    }
  }
};
</script>
