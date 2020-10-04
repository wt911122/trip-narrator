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
import macaoLocations from '../addresses/macao.json';
import { mapState } from 'vuex';
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
        currloc: state => state.currLocation
    }),
    watch: {
        currloc(val){
            const marker = this.markers.find(m => m.address === val.address);
            marker.emit('click', {
                target: marker
            })
        }
    },
    mounted(){
        console.log(macaoLocations)
        const {
            center, zoom, locations, city
        } = macaoLocations;
        const map = this.map = new AMap.Map('mapContainer', {
            center,
            zoom
        }); 
        this.geocoder = new AMap.Geocoder({
            city, //城市设为北京，默认：“全国”
        });
        this.markers = locations.map((loc) => {
            const marker = new AMap.Marker({
                map,
                position: loc.location,
                icon: new AMap.Icon({
                    size: new AMap.Size(36, 36),
                    image: icons[loc.type],
                    imageSize:  new AMap.Size(24, 24),
                }),
            });
            marker.address = loc.address;
            marker.content = loc.content;
            marker.on('click', this.markerClick);
            marker.on('touchend', this.markerClick);
            return marker;
        })
        this.infoWindow = new AMap.InfoWindow({
            autoMove: true,
            offset: {x: 0, y: -30}
        });
    },
    methods: {
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
            console.log(e);
            const { infoWindow, map } = this;
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
            
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