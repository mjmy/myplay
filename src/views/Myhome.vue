<template>
  <div class="page"  ref="pagebox">
    <div class="searhBar">
        <input type="text" v-model="search" >
        <button @click="goSearch()">Search</button>
    </div>
    <div  id="player" class="player video-wrapper"  v-if="player" >
        <div class="player" :class="{small:voideSamll}" :style="{width:voideSamll==true ? Width+'px' : 'auto',height:'auto'}">
            <vue-plyr  ref="plyr" >
                <div class="plyr__video-embed"  >
                <iframe
                    style="width:100%;height:100%"
                    :src="iframe_url"
                    allowfullscreen allowtransparency allow="autoplay" >
                </iframe>
                </div>
            </vue-plyr>
        </div>
        <!-- <iframe width="640" height="360" 
        :src="iframe_url" 
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen ></iframe> -->
    </div>
    <div class="box">
        <div class="boxitem" v-for="(item ,id ,key) in dataList" :key="key" @click="getVideoList(item['id'])">
            <img :src="item['snippet']['thumbnails']['medium']['url']">
            <p>{{item['snippet']['title'].replace(/&#39;/gi,"'")}}</p>
        </div>
    </div>
   
    
  </div>
</template>

<script>
export default {
    name: "myhome",
    data(){
        return{
            fullWidth:0,
            fullHeight:0,
            player:false,
            playerOptions:{
                autoplay:true,//自動撥放
                muted:false,//默認下消除音頻
                loop:false,//循環播放
                preload:'auto',//瀏覽器在<video>家仔后開始下載影片
                language:'zh-CN',
                aspectRatio: '16:9',
                fluid: true,//按比例縮放尺寸
                techOrder: [ 'youtube'],
                sources: [{
                    type: "video/youtube",
                    src: "" 
                }],
                poster: "./assets/logo.png", //你的封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            },
            search:'刀劍',
            dataList:[],
            voideheigth:0,
            voideSamll:false,
            play:{},
            iframe_url:'https://www.youtube.com/embed/'
        }
    },
    watch:{
        /**
         * handler：其值是一个回调函数。即监听到变化时应该执行的函数
         * deep：其值是true或false；确认是否深入监听
         * immediate：其值是true或false；确认是否以当前的初始值执行handler的函数
         */
      
    },
    computed:{
        //縮放比例
        Height(){
            return this.fullHeight/3.1;
        },
        Width(){
            return this.fullWidth/4.8;
        }
    },
    mounted(){
        this.fullHeight = window.innerHeight;//page height
        this.fullWidth = window.innerWidth;//page Width
        window.addEventListener('resize', this.handleWindow);
        
        this.dataList = [];
        this.goSearch();
    },
    methods:{
        handleScroll () { //改变元素#searchBar的top值
            
            var scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
            var offsetTop = document.querySelector('#player').offsetTop;
            // console.log(scrollTop,offsetTop)
            // console.log(scrollTop-offsetTop)
            // console.log(this.fullWidth/4.8)
            // console.log(this.fullHeight/3.1)
            this.voideheigth = scrollTop-offsetTop;

            if(this.voideheigth>252){
                    this.voideSamll = true;
            }else{
                this.voideSamll = false;
            }
        },
        handleWindow(){
            this.fullHeight = window.innerHeight;//page height
            this.fullWidth = window.innerWidth;//page Width
            console.log(this.fullWidth,this.fullHeight)
            
        },
        goSearch(){
            //https://www.googleapis.com/youtube/v3/search?key={your key}
            let searurl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCzwjDLmrgCbpy-85dPrn-t-1eFa-zYg6w';
            // let searurl = 'https://www.googleapis.com/youtube/v3/activities?key=AIzaSyCzwjDLmrgCbpy-85dPrn-t-1eFa-zYg6w';
            let searchitem={
                //必填
                'part': 'snippet',
                //選填
                'maxResults': '50',//返回數量
                'q': this.search,//搜尋關鍵字
                'type': 'video',//限制搜尋結果為 video、channel(頻道 ) 或 playlist(播放清單)
                'home':true,
                'order':'title'
            }
            this.$http.get(searurl,
            {
                params:searchitem
            })
            .then(response => (
                // console.log(response)
                //返回JSON data
                this.Resolve(response) //送去解析
            ));
        },
        Resolve(data){
            console.log(data);
            // console.log(data['data']['items'][0])
            this.dataList = data['data']['items'];
            for(let l in this.dataList){
                // console.log(this.dataList[l]['snippet']['title'].replace(/&#39;/gi,"'"))
                this.dataList[l]['snippet']['title'] = this.dataList[l]['snippet']['title'].replace(/&#39;/gi,"'");
            }
            
        },
        getVideoList(item){
            // console.log(item)
            this.$http.get('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCzwjDLmrgCbpy-85dPrn-t-1eFa-zYg6w',
            {
                params:{
                        'id': item['videoId'],
                        'part': 'snippet,contentDetails,statistics'
                        }
            })
            .then(response => (
                // console.log(response)
                //返回JSON data
                this.getPlayer(response) //送去解析
            ));
        },
        getPlayer(data){
            console.log(data)
            console.log('play')
            
            // this.getRighList(data['data']['items'][0]['snippet']['categoryId']);//相關資料
            let watch_url = 'https://www.youtube.com/watch?v='+data['data']['items'][0]['id'];
            this.playerOptions.sources[0]['src'] = watch_url;
            // this.iframe_url +=  data['data']['items'][0]['id'] +'?rel=0&autoplay=1';
            this.iframe_url = watch_url;
            window.scrollTo(0, 0)//設scrollTopel高度為零
            
            if(this.play.ready){
                console.log(watch_url)
                this.play.src = watch_url
                this.play.stop()
                console.log(this.play.togglePlay)
            }
            this.player = true;
            //异步更新
            this.$nextTick((callback) => {
                window.addEventListener('scroll', this.handleScroll); // 添加滚动事件
                this.play = this.$refs.plyr.player;
                setTimeout(()=>{
                    // console.log(play.ready)
                    if(this.play.ready){
                        this.play.play();
                    }
                },1000);
                
            })
           
        },
        getRighList(id){
            console.log(id)
            this.$http.get('https://www.googleapis.com/youtube/v3/youtube.channels.list?key=AIzaSyCzwjDLmrgCbpy-85dPrn-t-1eFa-zYg6w',
            {
                params:{
                        categoryId: id,
                        part: 'snippet,contentDetails'
                    }
            })
            .then(response => (
                
                console.log('categoryId'+response)
                //返回JSON data

            ));
        }
    },
    optionply(obj){
        console.log(obj.ready)
    },
    //離開頁面
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll);// 移除滚动事件
    }
};
</script>
<style scoped lang="less">
    .page{
        // border: 1px solid rgb(189, 171, 189);
        // width: 100%;
        // margin-left: 600px;
        // height: 100%;
        text-align: -webkit-center;
        
    }
    .searhBar{
        margin-top: 5px;
        padding: 30px;
        input{
            width: 200px;
            margin-right: 20px;
        }
        button{
            padding: 10px;
        }
    }
    .box{

        display:inline-flex;
        justify-content: center;
        flex-wrap:wrap;
        margin: 20px;
        border: 1px solid rgb(189, 171, 189);
        // position: absolute;
        width: -webkit-fill-available;
        // width: 100%;
        padding-left: 10px;
        .boxitem{
            cursor: pointer;
            display:inline-flex;
            flex-wrap:wrap;
             align-content:flex-start;
            border: 1px solid rgba(0, 0, 0, 0.918);
            float: left;
            height: 300px;
            width: 260px;
            margin: 23px;
            img{
                max-height: -webkit-fill-available;
                max-width: -webkit-fill-available;
            }
        }
    }
    .player{
        margin-top: 20px;
        // border: 1px solid rgb(189, 171, 189);
        height: 300px;
        width: 500px;
        // display: none;
        position :relative;
        // transition: all .3s;
    }
    .actitv{
        display: inline;
    }
    .small{
        bottom: 0px;
        position: fixed;
        right: 0px;
        z-index: 10;
        transition: all .3s;
    }
</style>