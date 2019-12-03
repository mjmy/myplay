<template>
    <div class="page">
        <canvas width="500" height="500" style="border: 1px solid;margin-top: 5rem;" id="myCanvas"></canvas>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        this.setCanvas();
    },
    methods:{
        setCanvas(){

            for(let i = 0; i <200; i++){
                let data = [];
                let rantext = Math.ceil(Math.random()*25);
                let textSize = Math.ceil(Math.random()*150);
                rantext = String.fromCharCode(65+rantext)
                data = [rantext,textSize];
                this.list.push(data)
            }
            let canvas = this.$el.querySelector('#myCanvas');
            canvas.width = document.getElementsByClassName("page")[0].clientWidth;
            canvas.height = 500;
            let cxt = canvas.getContext('2d');
            
            let options = {
                list: this.list,
                origin:[canvas.width/2,canvas.height/2],
                drawOutOfBound:false,
                shuffle:true,
                shape:'circle',
                gridSize:30,
                // backgroundColor:"#eae8e8a3"

                
            }
            this.$wordcloud(document.getElementById('myCanvas'), options);
        }
    }
}
</script>

<style>
.page{
  margin: 0 2rem;
  display: block;
}
</style>