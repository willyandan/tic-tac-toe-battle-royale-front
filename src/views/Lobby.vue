<template>
  <div class="container-lobby">
    <div class="lobby">
      <h1 class="loading text-center">Agurdando jogadores
        <span class="one">.</span><span class="two">.</span><span class="three">.</span>
      </h1>
      <div class="display-1 text-center">
        {{qtd}}/{{total}}
      </div>
      <div>
        <button @click="startMatch">delete-me</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  qtd:number = 0
  total:Number = 50

  startMatch(){
    console.log(this.$router.push({name:'match'}))
  }
}
</script>

<style lang="scss" >
.container-lobby{
  height: 100vh;
  position: relative;
  .lobby{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
.loading {
  
  .one {
    opacity: 0;
    -webkit-animation: dot 1.3s infinite;
    -webkit-animation-delay: 0.0s;
    animation: dot 1.3s infinite;
    animation-delay: 0.0s;
  }

.two {
    opacity: 0;
    -webkit-animation: dot 1.3s infinite;
    -webkit-animation-delay: 0.2s;
    animation: dot 1.3s infinite;
    animation-delay: 0.2s;
  }

.three {
    opacity: 0;
    -webkit-animation: dot 1.3s infinite;
    -webkit-animation-delay: 0.3s;
    animation: dot 1.3s infinite;
    animation-delay: 0.3s;
  }
  
}

@-webkit-keyframes dot {
      0% { opacity: 0; }
     50% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes dot {
      0% { opacity: 0; }
     50% { opacity: 0; }
    100% { opacity: 1; }
}
</style>
