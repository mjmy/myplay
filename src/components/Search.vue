<template>
    <div class="page">
       <div class="searchBox">
           <p>查詢帳號 :</p>
           <input type="text" v-model="searchAcc">
           <button @click="Search">Go</button>
        </div>
        <div class="tableBox">
            <table id="table">
                <tr>
                    <th>OID</th>
                    <th>Username</th>
                    <th>MemLevel</th>
                    <th>Amount</th>
                </tr>
                <tr v-for="(value ,key) in dataList" :key="key">
                    <td>{{value['OID']}}</td>
                    <td>{{value['Username']}}</td>
                    <td>{{value['MemLevel']}}</td>
                    <td>{{value['Amount']}}</td>
                </tr>
            </table>
        </div>
    </div>
    
</template>
<script>
export default {
  name: "Find",
    data(){
        return{
            searchAcc:'',
            dataList:[]
        }
    },
    mounted(){
    },
    methods:{
        Search(){
            this.$http.get('http://127.0.0.1:8000/api/oder',   
            {
                params:{'acc':this.searchAcc}
            })
            .then(response => (
                // console.log(response)
                this.getList(response)
            ));
        },
        getList(data){
            this.dataList = data.data;
        }

    }
};
</script>
<style lang="less" scoped>
   .searchBox{
       input{
           margin-right: 10px;
       }
       button{
           width: 100px;
       }
   }
   .tableBox{
        display: flex;
        justify-content: center;
    }
    #table{
    }
</style>

