<template>
    <div class="page">
        <div class="box">
            <div class="item">
                <span>Account :</span>
                <input type="text" v-model="acc">
            </div>
            <div class="item">
                <span>Password :</span>
                <input type="password"  v-model="pwa">
            </div>
            <div class="btn">
                <button @click="login()">登入</button>
                <button @click="cancel()">取消</button>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
  name: "Login",
    data(){
        return{
            acc:'',
            pwa:''
        }
    },
    methods:{
        login(){
            // this.$http.get('http://127.0.0.1:8000/api/user/',
            // {
            //     params:{'acc':this.acc,'pwa':this.pwa}
            // })
            // .then(response => (
            //     // console.log(response)
            //     this.back(response)
            // ));
            this.callApi('http://127.0.0.1:8000/api/user/' ,{'acc':this.acc,'pwa':this.pwa} ,res=>{
                console.log(res);
            });
        },
        cancel(){
            this.acc ='';
            this.pwa = '';
        },
        back(data){
            if(data['data']['status']){
                this.$router.push('/Find');
            }
        }

    }
};
</script>
<style lang="less" scoped>
    .page{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .box{
        border: 1px solid;
        width: 500px;
        height: 300px;
        text-align: center;
    }
    .item:first-child{
        margin-top: 90px;
    }
    .item{
        margin-top: 40px;
        display: block;
        span{
            padding: 10px;
            width: 30px;
        }
        input{

        }
    }
    .btn{
        display: flex;
        margin-top: 60px;
        justify-content: space-around;
        button{
            width: 200px;
            height: 30px;
        }
    }
</style>

