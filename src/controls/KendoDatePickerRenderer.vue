<template>
    <control-wrapper
      v-bind="controlWrapper"
      :styles="styles"
      :is-focused="isFocused"
      :applied-options="appliedOptions"
    >
      <datepicker
        :id="control.id + '-input'"
        type="date"
        :class="styles.control.input"
        :default-value="control.data"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="appliedOptions.placeholder"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </control-wrapper>
  </template>
  
  <script lang="ts">
  import {
    ControlElement,
    JsonFormsRendererRegistryEntry,
    rankWith,
isDateControl,
  } from '@jsonforms/core';
  import { defineComponent } from 'vue';
  import {
    rendererProps,
    useJsonFormsControl,
    RendererProps,
  } from '@jsonforms/vue';
  import { default as ControlWrapper } from './ControlWrapper.vue';
  import { useVanillaControl } from '@jsonforms/vue-vanilla';
  import { DatePicker } from '@progress/kendo-vue-dateinputs';
  
  const controlRenderer = defineComponent({
    name: 'KendoDatePickerControl',
    components: {
      ControlWrapper,
      'datepicker': DatePicker
    },
    props: {
      ...rendererProps<ControlElement>(),
    },
    setup(props: RendererProps<ControlElement>) {
      return useVanillaControl(
        useJsonFormsControl(props),
        (target) => target.value || undefined
      );
    },
  });
  
  export default controlRenderer;
  
  export const entry: JsonFormsRendererRegistryEntry = {
    renderer: controlRenderer,
    tester: rankWith(3, isDateControl),
  };
  </script>