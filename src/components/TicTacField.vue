<template>
  <div>
    <h2 class="text-center">{{your_turn?"Sua vez!":"Vez de "+"x"}}</h2>
    <br/>
    <div class="progress w-50 m-auto">
      <div 
        class="progress-bar progress-bar-striped progress-bar-animated" 
        role="progressbar" 
        :style="{width: time_count+'%'}"
      ></div>
    </div>
    <br/>
    <div :class='{"container-flex":true, "your-turn":your_turn}'>
      <div class="box" v-for="(row, i) of board">
        <div v-for="(col, j) of row">
          <div 
            :class="{item:true, marcado:board[i][j]!='', borda:j<2}"
            @click.prevent="putInBoard(i, j)"
          >
            <span>{{type?'X':'O'}}</span>
            <span class="colocado">{{board[i][j]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  type:boolean = true;
  your_turn:boolean = true;
  board: String[][] = new Array();
  time_count:number = 50
  constructor () {
    super()
    for(let i=0; i< 3; ++i){
      this.board.push(new Array())
      for(let j =0; j<3; ++j){
        this.board[i].push("")
      }
    }
  }

  putInBoard(i:number, j:number){
    if(!this.board[i][j] && this.your_turn){
      this.board[i][j] = this.type?"X":"O"
      Vue.set(this.board, i, this.board[i])
    }
  }
}
</script>

<style lang="scss" scoped>
.container-flex{
  display: flex;
  width: 450px;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 15;
  justify-content: center;
  margin: 0 auto;
  .box{
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    &:nth-child(1), &:nth-child(2){
      border-bottom: 1px solid #fff;
      box-shadow: 0 7px 7px -7px rgb(29, 29, 29);
    }
  }
  .item{
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    flex-grow: 1;
    cursor: pointer;
    width: 150px;
    height: 150px;
    &.borda{
      border-right: 1px solid #fff;
      // -webkit-box-shadow: 10px 0 5px -2px #888;
      box-shadow: 7px 0 7px -7px rgb(29, 29, 29);
    }
    span{
      font-size: 5em;
      opacity: 0;
      display: block;
    }
    &.marcado > span{
      display: none;
    }
    &.marcado > span.colocado{
      display: block;
      opacity: 1;
    }
  }

  &.your-turn  .item:hover:not(.marcado) > span{
    opacity: 0.7;
    -webkit-transition: all 0.5s ease-in;
    -moz-transition: all 0.5s ease-in;
    -ms-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    transition: all 0.5s ease-in;
  }
}

</style>
