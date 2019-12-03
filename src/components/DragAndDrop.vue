<template>
  <div class="container">
    <div id="box1" class="box1" @dragover="allowDrop" @drop="drop">
      <div class="item-box" draggable="true" @dragstart="drag" id="item1"></div>
    </div>
    <div id="box2" class="box2" @dragover="allowDrop" @drop="drop"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    }
  }
};
</script>

<style scoped>
.container {
  margin: 1rem;
  display: flex;
  justify-content: space-around;
}
.box1 {
  width: 100px;
  height: 100px;
  border: 1px solid;
  display: block;
  padding: 5px;
}
.box2 {
  width: 100px;
  height: 100px;
  border: 1px solid;
  display: block;
  padding: 5px;
}
.item-box {
  width: 100%;
  height: 100%;
  background-color: blueviolet;
  transition: 0.5s ease-in;
}
.item-box:hover {
  transform: translate(10px, -10px);
  box-shadow: -7px 7px 11px #888888;
}
</style>
