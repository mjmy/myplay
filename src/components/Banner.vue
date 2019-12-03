<template>
  <div class="page" >
      <div class="slideshow-container">
          <!-- Full-width images with number and caption text -->
        <div class="mySlides fade">
            <div  style="width:100%;height: 200px;background-color:red;opacity: 0.4;"></div>
            <div class="text">Caption Text</div>
        </div>

        <div class="mySlides fade">
            <div  style="width:100%;height: 200px;background-color:yellow;opacity: 0.4;"></div>
            <div class="text">Caption Two</div>
        </div>

        <div class="mySlides fade">
            <div  style="width:100%;height: 200px;background-color:blue;opacity: 0.4;"></div>
            <div class="text">Caption Three</div>
        </div>

        <!-- Next and previous buttons -->
        <a class="prev" @click="plusSlides(-1)">&#10094;</a>
        <a class="next" @click="plusSlides(1)">&#10095;</a>
      </div>
      <br>
        <!-- The dots/circles -->
        <div style="text-align:center">
            <span class="dot" @click="currentSlide(1)"></span> 
            <span class="dot" @click="currentSlide(2)"></span> 
            <span class="dot" @click="currentSlide(3)"></span> 
        </div>
        <br>
        <br>
        <!-- ----------------------------------- -->
        <div>
            <div class="container">
                <div class="box">
                    <div class="item" v-for="n in 5" :key="n">
                        <div  style="height: 100px;background-color:blue;opacity: 0.4;"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ----------------------------------- -->
        <div style="margin-top: 20px;">
            <div class="container">
                <div  class="map-item" style="height: 150px;background-color:#00ff098c;;opacity: 0.4;"><h2>Map</h2></div>
                <div class="select-box">
                    <div class="item">
                        <span>demo-1</span>
                        <span>demo-1</span>
                        <span>demo-1</span>
                        <span>demo-1</span>
                    </div>
                </div>
            </div>
        </div>
  </div>
  <!-- box-shadow 属性向框添加一个或多个阴影 -->
</template>
<script>
    export default {
        name:'banner',
        data(){
            return{
                slideIndex :0,
            }
        },
        mounted(){
            this.showSlides(this.slideIndex);
        },
        methods:{
            showSlides(n) {
                // var i;
                // var slides = document.getElementsByClassName("mySlides");
                // var dots = document.getElementsByClassName("dot");
                // if (n > slides.length) {this.slideIndex = 1} 
                // if (n < 1) {this.slideIndex = slides.length}
                // for (i = 0; i < slides.length; i++) {
                //     slides[i].style.display = "none"; 
                // }
                // for (i = 0; i < dots.length; i++) {
                //     dots[i].className = dots[i].className.replace(" active", "");
                // }
                // slides[this.slideIndex-1].style.display = "block"; 
                // dots[this.slideIndex-1].className += " active";
                var i;
                var slides = document.getElementsByClassName("mySlides");
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none"; 
                }
                this.slideIndex++;
                if (this.slideIndex > slides.length) {this.slideIndex = 1} 
                slides[this.slideIndex-1].style.display = "block"; 
                setTimeout(this.showSlides, 5000); // Change image every 2 seconds
            },
            // Next/previous controls
            plusSlides(n) {
                this.showSlides(this.slideIndex += n);
            },

            // Thumbnail image controls
            currentSlide(n) {
                this.showSlides(this.slideIndex = n);
            }
        },
    }
</script>
<style lang="less" scoped>
    .slideshow-container{
        max-width: 100%;
        position: relative;
        margin: auto;
    }
    /* Hide the images by default */
    .mySlides {
    display: none;
    }
    /* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}
.prev{
    left: 0;
}
/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}
/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}
/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}
/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}
.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}
.container{
    // display: flex;
    width: 100%;
    overflow: scroll;
    .box{
        display: inline-flex;
        justify-content: center;
        .item{
            width: 100px;
            margin-right: 15px;
            margin-left: 15px;
            div{
                border-radius: 20px;
            }
        }
    }
    .map-item{
        display: block;
        h2{
            padding-top: 15%;
            text-align: center;
        }

    }
    .select-box{
        width: 100%;
        line-height: 10vw;
        margin-top: 20px;
        background-color:#00ff098c;
        opacity: 0.4;
        .item{
            text-align: left;
            >span{
                display: inline-block;
                height: 10vw;
                margin: 0px 10px;
            }
            // border-radius: 12px;
            // width: 60px;
            // padding: -8px 0px;
            // /* margin: 6px 0px; */
            // background: brown;
        }
    }
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}
</style>



    



