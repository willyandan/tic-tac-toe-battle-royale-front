<template>
  <div class="container-position">
    <div class="position">
      <h1 class="text-center" v-if="position == 1">
        Parabéns você ficou em <br/> <b class="place">1º</b><br/>
        GGWP
      </h1>
      <h1 class="text-center" v-else-if="position <= total * 0.3">
        Parabéns você ficou em <br/> <b class="place">{{position}}º</b> <br/>
        Foi um bom jogo mas você consegue melhorar.
      </h1>
      <h1 class="text-center" v-else-if="position != total">
        Você ficou em <br/> <b class="place">{{position}}º</b> <br/>
        Mais sorte na próxima.
      </h1>
      <h1 class="text-center" v-else>
        Você ficou em ultimo lugar :( <br/>
        Treine mais se quiser pegar posições melhores
      </h1>
      <p class="text-center">
        <button class="btn btn-primary btn-lg">
          Jogar novamente
        </button>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Postion extends Vue{
  position:number = 1;
  total = 100
}
</script>

<style lang="scss" scoped>
.container-position{
  height: 100vh;
  position: relative;
  .position{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  b.place{
    font-size: 3em;
  }
}
</style>