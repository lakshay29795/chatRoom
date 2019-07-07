<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <!-- <v-flex xs12 sm6 md4>
          <v-slider v-model="slider" :min="16" :max="256" label="Size" thumb-label></v-slider>

          <v-switch v-model="tile" label="Tile"></v-switch>
        </v-flex> -->

        <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
          <v-avatar :tile="tile" :size="avatarSize" color="grey lighten-4" @click="selectImageFile">
            <img v-if="url === ''" src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
            <img v-else :src="url" alt="avatar">
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-btn @click="SaveImage">Save</v-btn>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        size: 200,
        tile: false,
        imageData: '',
        url: '',
      }
    },
    computed: {
      avatarSize () {
        return `${this.size}px`
      },
    },
    methods: {
      selectImageFile(e) {
        console.log('4444444444', e);
        // e.preventDefault();
        // e.stopPropagation();
        let ele = document.createElement("input");
        // this.addImage = true;
        ele.type = "file";
        ele.name = "profileImage";
        ele.onchange = this.uploadImageFile;
        ele.click();
      },
      uploadImageFile(e) {
        console.log('onchange occur', e);
        let file = e.target.files[0];
        let reader = new FileReader();
        // const { outerIdx, innerRowIdx, innerColIdx } = this.selectedData;
        this.imageData = {
          data: e.target.files[0],
          type: file.name.split('.')[1],
        };
        reader.onload = evt => {
          this.url = evt.target.result;
        // this.imageData.data = this.url;
        };
        reader.readAsDataURL(file);
      },
      SaveImage(e) {
        this.$emit('uploadImage', this.imageData);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .UploadImage {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
