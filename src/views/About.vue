<template>
  <div class="about">
    <div class="btn">
      <p class="icon"></p>
      <span></span>
  </div>
  </div>
</template>
<style lang="less" scoped>
  .btn {//btn的容器
    text-align: center;
    width: 100px;
    height: 30px;
    margin: 1em;
    padding: 0px 10px 0px;
    border: 1px solid;
    border-radius: 20px;
    cursor: pointer;
  }
  .icon {//會滑動的icon
    margin: 0px;
    padding: 0px;
    display: inline-block;
    position: relative;
    right: 14px;
    height: 29px;
    width: 29px;
    border: 1px solid;
    border-radius: 999px;
    background-color: #fff;
    z-index: 999;
    -webkit-transition: 0.6s;
    -moz-transition: 0.6s;
    -o-transition: 0.6s;
    transition: 0.6s;
  }
  .btn:hover .icon {//讓icon向右邊跑
    right: -55px;
  }
  .btn:hover{
    background-color: aqua;
  }
  .btn span {//一開始的內文
    opacity: 1;
    position: relative;
    bottom: 10px;
    right: 10px;
    -webkit-transition: 0.6s;
    -moz-transition: 0.6s;
    -o-transition: 0.6s;
    transition: 0.6s;
  }
  .btn:after {//icon滑動後更新的內文
    content: 'Go now';
    opacity: 0;//更新前是看不到的所以把他能見度設定0
    display: inline-block;
    position: relative;
    bottom: 32px;
    right: 10px;
      -webkit-transition: 0.6s;
  -moz-transition: 0.6s;
  -o-transition: 0.6s;
  transition: 0.6s;
  }
</style>

