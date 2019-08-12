<template>
<div>
  <div>
    <tic-tac-field class="field mr-auto ml-auto"></tic-tac-field>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TicTacField  from "@/components/TicTacField.vue";

@Component({
  components: {TicTacField}
})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.field{
  margin-top: 40px;
}
</style>

