import './assets/main.css'
import '@progress/kendo-theme-default/dist/all.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Input } from '@progress/kendo-vue-inputs';
import { DateInput, DatePicker } from '@progress/kendo-vue-dateinputs';
import { Error, Hint, Label } from "@progress/kendo-vue-labels";

const app = createApp(App)

app.use(router)
app.component('KendoInput', Input)
app.component('KendoDateInput', DateInput)
app.component('KendoDatePicker', DatePicker)
app.component('KendoLabel', Label)
app.mount('#app')
