<template>
  <div class="container">
    <Button type="primary" icon="ios-search" @click="getLocation"
      >Search</Button
    >
    <Card style="width:320px">
      <div style="text-align:center">
        <div>position :</div>
        <h3>X : {{ position.X }}</h3>
        <h3>Y : {{ position.Y }}</h3>
        <h3>取得位置的時間 {{ position.timestamp }}</h3>
        <h3>當前移動的方向 {{ position.heading }}</h3>
        <h3>移動速度 {{ position.speed }}（m/s）</h3>
      </div>
    </Card>
    <h2></h2>
    <div class="map-container border rounded">
      <ul class="nav justify-content-center border-bottom">
        <!--營運地區 nav-->
      </ul>
      <!--地圖呈現在此-->
      <div class="google-map" id="map"></div>
    </div>
  </div>
  <!-- https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E5%BE%9E%E9%9B%B6%E6%8E%A5%E8%A7%B8-google-map-api-%E5%9C%A8-vue-js-%E4%B8%AD%E5%AF%A6%E4%BD%9C%E5%9C%B0%E5%9C%96-%E5%9C%B0%E6%A8%99-%E8%A8%8A%E6%81%AF%E8%A6%96%E7%AA%97-8eed860637d6 -->
</template>

<script>
export default {
  name: "map",
  data() {
    return {
      map: null,
      //位置預設
      X: 25.0325917,
      Y: 121.5624999,
      position: {
        X: 0, //緯度（degree）
        Y: 0, //經度（degree）
        timestamp: 0, //取得位置資訊的時間（毫秒）
        altitude: 0, //海拔高度（meter）若裝置不支援則回傳0
        accuracy: 0, //	位置的精確度範圍（meter）
        altitudeAccuracy: 0, //海拔精確度範圍（meter）若裝置不支援則回傳0
        heading: 0, //當前移動的方向（degree）
        speed: 0, //裝置的移動速度（m/s）
        msg: ""
      }
    };
  },
  mounted() {
    this.initMap();
    this.setMarker();
    this.getLocation();
  },
  methods: {
    // 建立地圖
    initMap() {
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.map = new google.maps.Map(document.getElementById("map"), {
        // 設定地圖的中心點經緯度位置
        center: { lat: this.X, lng: this.Y },
        // 設定地圖縮放比例 0-20
        zoom: 15,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false
      });
    },
    // 建立地標
    setMarker() {
      // 建立一個新地標
      const marker = new google.maps.Marker({
        // 設定地標的座標
        position: { lat: this.X, lng: this.Y },
        // 設定地標要放在哪一個地圖
        map: this.map
      });
    },
    //取當前位置
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.PositionError
        );
      } else {
        this.position.msg = "Geolocation is not supported by this browser.";
      }
    },
    //顯示位置資訊
    showPosition(Position) {
      let time = new Date(Position.timestamp);
      this.position.timestamp =
        time.getHours() + " : " + time.getMinutes() + " : " + time.getSeconds();
      this.position.X = Position.coords.latitude;
      this.position.Y = Position.coords.longitude;
      this.position.altitude =
        Position.coords.altitude != null ? Position.coords.altitude : "null";
      this.position.accuracy = Position.coords.accuracy;
      this.position.altitudeAccuracy =
        Position.coords.altitudeAccuracy != null
          ? Position.coords.altitudeAccuracy
          : "null";
      this.position.heading =
        Position.coords.heading != null ? Position.coords.heading : "null";
      this.position.speed =
        Position.coords.speed != null ? Position.coords.speed : "null";
      console.log(Position);
    },
    //錯誤回報
    PositionError(error) {
      switch (error.code) {
        case 0:
          this.position.msg = "UNKNOW_ERROR (不明原因錯誤)";
          break;
        case 1:
          this.position.msg =
            "PERMISSION_DENIED (使用者拒絕位置服務，或瀏覽器設定不允許使用位置服務)";
          break;
        case 2:
          this.position.msg = "POSITION_UNAVAILABLE (無法取得位置資訊)";
          break;
        case 3:
          this.position.msg = "TIMEOUT (逾時仍未回傳)";
          break;
      }
      //   this.$Message.error(this.position.msg);
      let config = {
        content: this.position.msg,
        duration: 2.5,
        background: true
      };
      this.$Message.error(config);
    }
  },
  beforeDestroy() {
    navigator.geolocation.clearWatch(); //清除监测
  }
};
</script>

<style scoped>
.container {
  margin: 1rem;
}
.google-map {
  width: 100%;
  height: 400px;
}
</style>
