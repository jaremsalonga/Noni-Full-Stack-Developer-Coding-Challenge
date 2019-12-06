<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <router-link :to="{ name: user ? 'home' : 'welcome' }" class="navbar-brand">Card Creator</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarToggler" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <locale-dropdown />
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>-->
        </ul>

        <ul class="navbar-nav ml-auto align-items-center">
          <!-- Authenticated -->
          <li v-if="currentRoute === 'notes'" class="nav-item dropdown">
            <button @click="localPutNotes" type="button" class="btn btn-secondary btn-sm">Publish</button>
          </li>
          <li v-if="user" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-dark"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img :src="user.photo_url" class="rounded-circle profile-photo mr-1" />
              {{ user.name }}
            </a>
            <div class="dropdown-menu">
              <router-link :to="{ name: 'settings.profile' }" class="dropdown-item pl-3">
                <fa icon="cog" fixed-width />
                {{ $t('settings') }}
              </router-link>

              <a href="#" class="dropdown-item pl-3" @click.prevent="localPostNotes">
                <fa icon="file-alt" fixed-width />New Story
              </a>

              <div class="dropdown-divider" />
              <a href="#" class="dropdown-item pl-3" @click.prevent="logout">
                <fa icon="sign-out-alt" fixed-width />
                {{ $t('logout') }}
              </a>
            </div>
          </li>
          <!-- Guest -->
          <template v-else>
            <li class="nav-item">
              <router-link
                :to="{ name: 'login' }"
                class="nav-link"
                active-class="active"
              >{{ $t('login') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'register' }"
                class="nav-link"
                active-class="active"
              >{{ $t('register') }}</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import LocaleDropdown from "./LocaleDropdown";

export default {
  components: {
    LocaleDropdown
  },

  data: () => ({
    appName: window.config.appName
  }),

  computed: {
    currentRoute() {
      return this.$route.name;
    },
    getCurrentRouteParams() {
      return this.$route.params.id;
    },
    ...mapGetters({
      user: "auth/user",
    }),
    ...mapState(["notes"])
  },

  methods: {
    ...mapActions("notes", ["postNotes", "putNote"]),
    localPutNotes() {
      this.putNote({
        id: this.getCurrentRouteParams,
        payload : this.notes.selected
      });
    },
    localPostNotes() {
      let defaultState = {
        title: `<h1></h1>`,
        content: `<p></p>`,
        created_user: this.user.name,
        updated_user: this.user.name
      };
      this.postNotes(defaultState).then(note => {
        this.$router.push({
          name: "notes",
          params: {
            id: note.id
          }
        });
      });
    },
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");

      // Redirect to login.
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.profile-photo {
  width: 2rem;
  height: 2rem;
  margin: -0.375rem 0;
}
</style>
