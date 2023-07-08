<template>
    <control-wrapper
      v-bind="controlWrapper"
      :styles="styles"
      :is-focused="isFocused"
      :applied-options="appliedOptions"
    >
      <k-input
        :id="control.id + '-input'"
        type="text"
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
isStringControl,
  } from '@jsonforms/core';
  import { defineComponent } from 'vue';
  import {
    rendererProps,
    useJsonFormsControl,
    RendererProps,
  } from '@jsonforms/vue';
  import { default as ControlWrapper } from './ControlWrapper.vue';
  import { useVanillaControl } from '@jsonforms/vue-vanilla';
  import { Input } from '@progress/kendo-vue-inputs';
  
  const controlRenderer = defineComponent({
    name: 'KendoInputControl',
    components: {
      ControlWrapper,
      'k-input': Input
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
    tester: rankWith(2, isStringControl),
  };
  </script>