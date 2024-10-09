<template>
  <div id="app">
    <h1>Barcode/QR Code Scanner</h1>
    <video ref="video" id="video" width="300" height="300"></video>
    <canvas ref="canvas" id="canvas" width="300" height="300" style="display: none;"></canvas>
    <div v-if="barcode">
      <h2>Hasil Scan:</h2>
      <p>{{ barcode }}</p>
    </div>
  </div>
</template>

<script>
import jsQR from "jsqr";

export default {
  name: "App",
  data() {
    return {
      barcode: null,
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    startCamera() {
      const video = this.$refs.video;
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          video.srcObject = stream;
          video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
          video.play();
          requestAnimationFrame(this.scanBarcode);
        });
    },
    scanBarcode() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const canvasContext = canvas.getContext("2d");

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvasContext.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          this.barcode = code.data;
        }
      }
      requestAnimationFrame(this.scanBarcode);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

video {
  border: 1px solid black;
}
</style>
