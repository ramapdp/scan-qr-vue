import { createApp } from 'vue';
import App from './App.vue';
import { QrcodeStream } from 'vue3-qr-reader';

const app = createApp(App);

// Daftarkan komponen global
app.component('qrcode-stream', QrcodeStream);

app.mount('#app');