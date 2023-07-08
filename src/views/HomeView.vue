<script setup lang="ts">
import { JsonForms, type JsonFormsChangeEvent } from "@jsonforms/vue"
import { reactive, ref } from "vue"
import Ajv from 'ajv'
import { vanillaRenderers } from "@jsonforms/vue-vanilla"
import '@progress/kendo-theme-default/dist/all.css'
import { kendoVueControlRenderers } from '../controls'

const formData = ref({
  firstName: '',
  lastName: '',
  birthday: '',
  email: '',
});

const renderers = [
  ...vanillaRenderers,
  ...kendoVueControlRenderers,
];

const schema = reactive({
  type: 'object',
  properties: {
    firstName: { type: 'string', },
    lastName: { type: 'string' },
    birthday: { format: 'date' },
    email: { type: 'string', format: 'email' },
  },
  // required: ['firstName', 'lastName', 'birthday'],
})

const uischema = reactive({
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/firstName' },
    { type: 'Control', scope: '#/properties/lastName' },
    { 
      type: 'Control',
      scope: '#/properties/birthday',
      options: {
        format: 'date'
      }
    },
    { 
      type: 'Control',
      scope: '#/properties/email',
      rule: {
        effect: 'HIDE',
        condition: {
          scope: '#/properties/birthday',
          // schema: { type: 'string', format: 'date' },
          // // expectedValue: { $eval: }
        }
      }
    },
  ],
})

const ajv = new Ajv({ allErrors: true })

const isNextButtonEnabled = ref(false)

const checkFormValidity = (event: JsonFormsChangeEvent) => {
  // Check if all fields are valid
  // const valid = ajv.validate(schema, event.data)
  
  // Show the email if abouve 18 years old
  if (event.data.birthday && isAbove18(event.data.birthday)) {
    toggleEmail('SHOW')
  } else if (!isAbove18(event.data.birthday)) { 
    // Hide the email if 18 years old and below
    toggleEmail('HIDE')
  }
  // Enable Next button if above 18 years old
  isNextButtonEnabled.value = isAbove18(event.data.birthday)
}

const isAbove18 = (birthday: Date) => {
  const currentDate = new Date()
  const eighteenYearsAgo = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  
  return birthday <= eighteenYearsAgo
}

const toggleEmail = (effect: any) => {
  uischema.elements[3].rule.effect = effect
}

</script>

<template>
  <main>
    <JsonForms :data="formData" :renderers="Object.freeze(renderers)" :schema="schema" :uischema="uischema" :ajv="ajv" @change="checkFormValidity"/>
    <button :disabled="!isNextButtonEnabled">Next</button>
  </main>
</template>
