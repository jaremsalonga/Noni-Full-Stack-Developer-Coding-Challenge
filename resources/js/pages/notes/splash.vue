<template>
  <div class="container-fluid">
    <medium-editor v-on:edit="editTitle" 
    :text="notesModel.title" 
    :options="titleOption" />

    <medium-editor v-on:edit="editContent" 
    :text="cardData.content" 
    :options="contentOption" />
    
  </div>
</template>
<script>
import editor from 'vue2-medium-editor'
import { mapActions, mapGetters, mapMutations } from "vuex";
const DEFAULT_CONF = {
  toolbar: {
    buttons: [
      "italic",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
      "anchor",
      "image",
      "quote",
      "pre",
      "orderedlist",
      "unorderedlist",
      "indent",
      "outdent",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "justifyFull",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "removeFormat",
      "html"
    ]
  }
};

export default {
  components: {
    'medium-editor': editor
  },
  data() {
    return {
      cardData : '',
      notesModel : {
        title : '',
        content : '',
      },
      titleOption: {
        ...DEFAULT_CONF,
        placeholder: {
          text: "Your title!"
        }
      },
      contentOption: {
        ...DEFAULT_CONF,
        placeholder: {
          text: "Your awesome content!"
        }
      }
    };
  },
  mounted() {
    this.$store.dispatch("notes/fetchNote", this.$route.params.id).then((note) => {
      let {title, content} = note;
      this.cardData = note;
      this.notesModel.title = title;
      this.notesModel.content = content;
    });
  },
  methods: {
    editContent: function(operation) {
      this.notesModel.content = operation.api.origElements.innerHTML
      this.$store.commit("notes/FETCH_NOTES_BY_ID",Object.assign(this.cardData,this.notesModel))
      // this.content = operation;
    },
    editTitle: function(operation) {
      console.log(operation)
      this.notesModel.title = operation.api.origElements.innerHTML
      this.$store.commit("notes/FETCH_NOTES_BY_ID",Object.assign(this.cardData,this.notesModel))
      // this.title = operation;
    }
  }
};
</script>