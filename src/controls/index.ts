export { default as ControlWrapper } from './ControlWrapper.vue'
export { default as KendoInputRenderer } from './KendoInputRenderer.vue'
export { default as KendoDatePickerRenderer } from './KendoDatePickerRenderer.vue'

import { entry as kendoDatePickerRenderer } from './KendoDatePickerRenderer.vue'
import { entry as kendoInputRenderer } from './KendoInputRenderer.vue'

export const kendoVueControlRenderers = [
    kendoInputRenderer,
    kendoDatePickerRenderer,
]