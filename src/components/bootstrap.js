import { createApp } from "vue";
import MainLayout from './MainLayout.vue'
import { DatePicker } from "v-calendar";

const app = createApp(MainLayout);
app.component("V-Calender", DatePicker);
app.mount("#app");