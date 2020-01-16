<template>
  <div>
    <div class="jumbotron jumbotron-fluid header">
      <div class="container">
        <h1 class="display-4">
          Tic Tac Toe<br>Battle Royale
        </h1>
        <p class="lead">Prove ser o melhor neste clássico jogo. Agora em versão battle royale =)</p>
        <p v-if="players_online>0">Estamos com {{players_online}} {{players_online==1?'jogador':'jogadores'}} online</p>
      </div>
    </div>
    <div class="container">
      <div class="w-50 mx-auto">
        <input 
          type="text" 
          class="form-control form-control-lg input-name" 
          placeholder="Seu nick" 
          v-model="name"
          @keyup.enter="connectToSocket()"
        >
        <br>
        <p class="text-center">
          <button @click="connectToSocket()" class="my-super-cool-btn mx-auto">
            <div class="dots-container">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <span>Vamos!</span>
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Socket } from 'vue-socket.io-extended';

@Component({})
export default class Home extends Vue{
    name:String=""
    players_online:number=0
    connectToSocket(){
        if(!this.name){
            this.$swal('Escolha um nome','','error')
            return
        }
        this.$socket.client.emit('findMatch',this.name) 
    }
   
    @Socket('findMatch')
    findMatch(val: any){
        this.$store.commit('setMatchKey', val.match_key)
        this.$store.commit('setNumberOfPlayers', val.players)
        this.$store.commit('setTotal', val.total )
        this.$router.push({
            name:'lobby'
        })
    }

    @Socket('getOnlineUsers')
    getOnlineUsers(val:number){
        this.players_online=val
    }
}
</script>
<style>
.header{
  background-color: transparent !important;
  color:#fff;
}

.input-name.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #fff;
    outline: 0;
    border-color: #6f42c1;
    -webkit-box-shadow: -1px 0px 5px 0px #6f42c1;;
    -moz-box-shadow: -1px 0px 5px 0px #6f42c1;;
    box-shadow: -1px 0px 5px 0px #6f42c1;;
}

.div-logo{
  margin-right: 10px;
  padding-right: 10px; 
  border-right: 1px solid #fff; 
}

.my-super-cool-btn{
  background-color: transparent;
  border:none;
  position:relative;
  text-decoration:none;
  color:#fff;
  letter-spacing:1px;
  font-size:2rem;
  box-sizing:border-box;
}
.my-super-cool-btn:focus{
  outline: none;
}
.my-super-cool-btn span{
  position:relative;
  box-sizing:border-box;
  display:flex;
  align-items:center;
  justify-content:center;
  width:200px;
  height:200px;
}
.my-super-cool-btn span:before{
  content:'';
  width:100%;
  height:100%;
  display:block;
  position:absolute;
  border-radius:100%;
  border:7px solid #EDC2C0;
  box-sizing:border-box;
  transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
  box-shadow: 0 30px 85px rgba(0,0,0,0.14), 0 15px 35px rgba(0,0,0,0.14);
}
.my-super-cool-btn:hover span:before{
  transform:scale(0.8);
  box-shadow: 0 20px 55px rgba(0,0,0,0.14), 0 15px 35px rgba(0,0,0,0.14);
}
.my-super-cool-btn .dots-container{
  opacity:0;
  animation: intro 1.6s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn .dot{
  width:8px;
  height:8px;
  display:block;
  background-color:#EDC2C0;
  border-radius:100%;
  position:absolute;
  transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
}
.my-super-cool-btn .dot:nth-child(1){
  top:50px;
  left:50px;
  transform:rotate(-140deg);
  animation: swag1-out 0.3s;
  animation-fill-mode: forwards;
  opacity:0;
}
.my-super-cool-btn .dot:nth-child(2){
  top:50px;
  right:50px;
  transform:rotate(140deg);
  animation: swag2-out 0.3s;
  animation-fill-mode: forwards;
  opacity:0;
}
.my-super-cool-btn .dot:nth-child(3){
  bottom:50px;
  left:50px;
  transform:rotate(140deg);
  animation: swag3-out 0.3s;
  animation-fill-mode: forwards;
  opacity:0;
}
.my-super-cool-btn .dot:nth-child(4){
  bottom:50px;
  right:50px;
  transform:rotate(-140deg);
  animation: swag4-out 0.3s;
  animation-fill-mode: forwards;
  opacity:0;
}
.my-super-cool-btn:hover .dot:nth-child(1){
  animation: swag1 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn:hover .dot:nth-child(2){
  animation: swag2 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn:hover .dot:nth-child(3){
  animation: swag3 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn:hover .dot:nth-child(4){
  animation: swag4 0.3s;
  animation-fill-mode: forwards;
}
@keyframes intro {
   0% {
     opacity:0;
  }
  100% {
     opacity:1;
  }
}
@keyframes swag1 {
   0% {
     top:50px;
     left:50px;
     width:8px;
  }
  50% {
    width:30px;
    opacity:1;
  }
  100% {
     top:20px;
     left:20px;
     width:8px;
     opacity:1;
  }
}
@keyframes swag1-out {
   0% {
     top:20px;
     left:20px;
     width:8px;
  }
  50% {
     width:30px;
    opacity:1;
  }
  100% {
     top:50px;
     left:50px;
     width:8px;
    opacity:0;
  }
}
@keyframes swag2 {
   0% {
     top:50px;
     right:50px;
     width:8px;
  }
  50% {
    width:30px;
    opacity:1;
  }
  100% {
     top:20px;
     right:20px;
     width:8px;
     opacity:1;
  }
}
@keyframes swag2-out {
   0% {
     top:20px;
     right:20px;
     width:8px;
  }
  50% {
     width:30px;
    opacity:1;
  }
  100% {
     top:50px;
     right:50px;
     width:8px;
    opacity:0;
  }
}
@keyframes swag3 {
   0% {
     bottom:50px;
     left:50px;
     width:8px;
  }
  50% {
    width:30px;
    opacity:1;
  }
  100% {
     bottom:20px;
     left:20px;
     width:8px;
     opacity:1;
  }
}
@keyframes swag3-out {
   0% {
     bottom:20px;
     left:20px;
     width:8px;
  }
  50% {
     width:30px;
    opacity:1;
  }
  100% {
     bottom:50px;
     left:50px;
     width:8px;
    opacity:0;
  }
}
@keyframes swag4 {
   0% {
     bottom:50px;
     right:50px;
     width:8px;
  }
  50% {
    width:30px;
    opacity:1;
  }
  100% {
     bottom:20px;
     right:20px;
     width:8px;
     opacity:1;
  }
}
@keyframes swag4-out {
   0% {
     bottom:20px;
     right:20px;
     width:8px;
  }
  50% {
     width:30px;
    opacity:1;
  }
  100% {
     bottom:50px;
     right:50px;
     width:8px;
    opacity:0;
  }
}


</style>

