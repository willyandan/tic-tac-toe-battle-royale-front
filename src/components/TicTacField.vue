<template>
  <div>
    <h2 class="text-center">{{your_turn?"Sua vez!":`Vez de ${opponent.player.name}`}}</h2>
    <br/>
    <div class="progress w-50 m-auto">
      <div 
        class="progress-bar progress-bar-striped" 
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
            <span>{{me.type==1?'X':'O'}}</span>
            <span class="colocado">{{board[i][j]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Socket } from 'vue-socket.io-extended';
@Component
export default class TicTacField extends Vue {
  me:any = {}
  opponent:any = {}
  your_turn:boolean = true;
  board: String[][] = new Array();
  time_count:number = 50
  interval_id:number = 0
  constructor () {
    super()
  }

  /**
   * Lifecycle
   */
  mounted(){
    this.initMatch(this.matchState)
    if(this.turn){
      this.newTurn(this.turn)
    }
  }


  /**
   * Getters
    */
  get matchState(){
    return this.$store.state.match
  }
  
  get turn(){
    return this.$store.state.turn
  }

  /**
   * Watchers
   */
  @Watch('matchState')
  watchMatchState(value: any, oldValue: any){
    this.initMatch(value)
  }

  @Watch('turn')
  watchTurn(value:any, oldValue: any){
    if(value)
      this.newTurn(value)
  }

  /**
   * Sockets
   */
  @Socket('win')
  win(){
    this.countDownStop()
    this.$store.commit('setTurn',null)
    this.$router.replace({
      name: 'waiting-room'
    })
  }

  @Socket('lose')
  lose(position:any){
    this.countDownStop()
    this.$store.commit('setMatchKey',null)
    this.$store.commit('setMatch', null)
    this.$store.commit('setPosition', position)
    this.$router.replace({
      name:'position'
    })
  }

  /**
   * Functions
   */

  cleanBoard(){
    this.board = new Array()
    for(let i=0; i< 3; ++i){
      this.board.push(new Array())
      for(let j =0; j<3; ++j){
        this.board[i].push("")
      }
    }
  }

  initMatch(matchState:any){
    console.log(matchState)
    this.cleanBoard()
    for(let player of matchState.players){
      if(player.id == this.$socket.client.id){
        this.me = player
      }else{
        this.opponent = player
      }
    }
    this.your_turn = matchState.turn === this.me.type
    this.countDownStart()
  }

  putInBoard(i:number, j:number){
    if(!this.board[i][j] && this.your_turn){
      this.board[i][j] = this.me.type==1?"X":"O"
      Vue.set(this.board, i, this.board[i])
      this.countDownStop()
      this.$socket.client.emit('put_in_board',{
        x:i,
        y:j
      })
    }
  }

  countDownStart(){
    this.time_count = 100
    setTimeout(()=>{
      this.interval_id = setInterval(()=>{
        this.time_count -= 1
        if(this.time_count == 0){
          if(this.your_turn){
            this.$socket.client.emit('countdown_end')
            this.countDownStop()
          }
        }
      }, 150)
    },1000)
  }

  countDownStop(){
    clearInterval(this.interval_id)
    this.time_count = 100
  }

  newTurn(val:any){
    this.your_turn = val.turn === this.me.type
    const new_board = val.grid.map((row:Array<number>)=>{
      return row.map((col:number)=>{
        if(col == 0) return ''
        else if(col == 1) return 'X'
        else return 'O'
      })
    })
    this.board = new_board
    this.countDownStart()
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
