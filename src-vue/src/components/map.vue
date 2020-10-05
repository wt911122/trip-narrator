<template>
<div :class="$style.map">
    <div :class="$style.map" id="mapContainer"></div>
    <!-- <div :class="$style.searchBlock">
        <div>
            <input :class="$style.input" :value="address" @change="address = $event.target.value"/>
        </div>
        <div>{{location}}</div>
        <div>
            <button @click="searchAddress">搜索</button>
            <button @click="getGeoCoder">搜索2</button>
        </div>
    </div> -->
</div>
</template>

<script>
// import macaoLocations from '../addresses/macao.json';
import { mapState } from 'vuex';

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
};
const formatter = new Intl.DateTimeFormat('zh-Hans-CN', {
    timeZone: "Asia/Shanghai",
    ...options
});
const icons = {
    hotel: require('../assets/icons/hotel.png'),
    meal: require('../assets/icons/meal.png'),
    shopping: require('../assets/icons/shopping.png'),
    spot: require('../assets/icons/spot.png'),
}
export default {
    data(){
        return {
            map: null,
            geocoder: null,
            address: '',
            location: '',
            marker: new AMap.Marker(),
            markers: [],
        }
    },
    computed: mapState({
        currloc: state => state.currLocation,
        locations: state => state.data,
    }),
    watch: {
        currloc(val){
            const marker = this.markers.find(m => m.address === val.address);
            marker.emit('click', {
                target: marker
            })
        },
        locations(){
            this.map.clearMap();
            this.generateMarker();
        }
    },
    mounted(){
        const {
            center, zoom, locations, city
        } = this.locations;
        const map = this.map = new AMap.Map('mapContainer', {
            center,
            zoom
        });
        this.geocoder = new AMap.Geocoder({
            city, //城市设为北京，默认：“全国”
        });
        this.generateMarker();
        this.infoWindow = new AMap.InfoWindow({
            autoMove: true,
            offset: {x: 0, y: -30}
        });
        this.getLocate();
    },
    methods: {
        getLocate(){
            console.log('getLocate')
            AMap.plugin('AMap.Geolocation', () => {
                console.log('AMap.Geolocation plugin')
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,     
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB'
                })
                
                this.map.addControl(geolocation);
                geolocation.getCurrentPosition()
            })
        },
        generateMarker(){
            let path = [];
            this.markers = this.locations.locations.map((loc, idx) => {
                if(loc.checkin) {
                    new AMap.Marker({
                        map: this.map,
                        position: loc.location,
                        offset: new AMap.Pixel(-20, -20),
                        content: `${idx}`,
                    });
                }
                const marker = new AMap.Marker({
                    map: this.map,
                    position: loc.location,
                    icon: new AMap.Icon({
                        size: new AMap.Size(36, 36),
                        image: icons[loc.type],
                        imageSize:  new AMap.Size(24, 24),
                    }),
                });
                if(loc.checkin) {
                    path.push(loc.location);
                }
                marker.loc = loc;
                marker.address = loc.address;
                marker.content = this.generateBlock(loc);
                marker.on('click', this.markerClick);
                marker.on('touchend', this.markerClick);
                return marker;
            });
            if(path.length){
                // console.log(path)
                // console.log(path.map((p => new AMap.LngLat(p[0], p[1]))));
                const polyline = new AMap.Polyline({
                    path,
                    borderWeight: 1, // 线条宽度，默认为 1
                    strokeColor: 'red', // 线条颜色
                    lineJoin: 'round', // 折线拐点连接处样式
                    strokeStyle: 'dashed',
                });
                this.map.add(polyline);
            }
        },
        generateBlock(loc) {
            const div = document.createElement('div');
            let divbody = `<div>${loc.content}</div>`;
            if(loc.checkin){
                
                divbody += `<div>${formatter.format(loc.checkin)}</div>`
            }
            div.innerHTML = divbody;
            const button = document.createElement('button');
            button.innerText = '打卡'
            button.addEventListener('click', async (e) => {
                const response = await fetch('/action/checkin', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        location: loc,
                        time: Date.now()
                    })
                });
                const res = await response.json();
                this.$store.dispatch('getData');
            });
            div.appendChild(button);
            return div;
        },

        searchAddress() {
            const {
                map, address
            } = this;
            AMap.service(["AMap.PlaceSearch"], function() {
                //构造地点查询类
                var placeSearch = new AMap.PlaceSearch({
                    pageSize: 5, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    city: "澳门", // 兴趣点城市
                    citylimit: true,  //是否强制限制在设置的城市内搜索
                    map: map, // 展现结果的地图实例
                    panel: "panel", // 结果列表将在此容器中进行展示。
                    autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                });
                //关键字查询
                placeSearch.search(address);
            });
        },
        getGeoCoder() {
            const {
                geocoder, address, marker, map
            } = this;
            geocoder.getLocation(address, function(status, result) {
                console.log(result.geocodes);
                if (status === 'complete'&&result.geocodes.length) {
                    var lnglat = result.geocodes[0].location
                    marker.setPosition(lnglat);
                    map.add(marker);
                    map.setFitView(marker);
                }else{
                    log.error('根据地址查询位置失败');
                }
            });
        },
        markerClick(e) {
            const { infoWindow, map } = this;
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
            this.$store.commit('SET_CUR_LOC', e.target.loc);
        }

    }
}
</script>

<style module>
.map {
    position: relative;
    width: 100%;
    height: 100%;
}
.overlayer{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

}
.searchBlock{
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 180px;
    background: #fff;
}
.input {
    /* border: none; */
    width: 100%;
    padding: 0;
    margin: 0;
}
</style>