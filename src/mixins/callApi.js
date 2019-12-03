export default {
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        },
        callApi(url ,data ,callback){
            this.$http.get(url,   
            {
                params:data
            })
            .then(response => (
                // console.log(response)
                callback(response)
            ));
        }
    }
}