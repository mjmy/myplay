<template>
    <div class="container">
        <div class="container-box">
            <p></p>
            <div class="body">
                
            </div>
            <div class="input-container">
                <textarea class="input-box">

                </textarea>
            </div>
        </div>
    </div>
</template>

<script>


// import firebase from 'firebase';
// import firebase from 'firebase/database';
// const config = {
//     apiKey: "AIzaSyDipspqrdYoOPOib_KdebbbCzY64fFrToI",
//     authDomain: "lofty-bolt-234506.firebaseapp.com",
//     databaseURL: "https://lofty-bolt-234506.firebaseio.com",
//     projectId: "lofty-bolt-234506",
//     storageBucket: "lofty-bolt-234506.appspot.com",
//     messagingSenderId: "446571584079",
//     appId: "1:446571584079:web:764dd2fb7b7919a7"
//   }
  
//     firebase.initializeApp(config);
//     var db = firebase.firestore();
//     var testRef = firebase.database().ref('/test/');
export default {
    name:'talkbox',
    data(){
        return{
            dataList:[]
        }
    },
    mounted(){
      let vm = this;
      let mes = [];
    //   testRef.on('value',function(res){
    //       var val = res.val();
    //       console.log(val)
    //   })
        
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
    .container{
        height: 100%;
        position: fixed;
        width: 100%;
        .container-box{
            background-color :rgba(233, 234, 225, 0.66);
            display: inline-block;
            width: 20%;
            height: 70%;
            
        }
        .body{
            height: 70%;
            background-color: white;
            margin: 0px 5px 0px 5px;
        }
        .input-container{
            display: block;
            
            .input-box{
                // position: absolute;
                // bottom: 0;
                width: -webkit-fill-available;
                margin: 70px 5px 5px;
                height: 100px;
            }
        }
    }
</style>

