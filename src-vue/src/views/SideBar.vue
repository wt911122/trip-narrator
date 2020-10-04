<template>
    <div :class="$style.sidebar">
        <div v-for="(loc, index) in locations" :id="loc.address" :class="$style.block" :style="getStyle(loc)" @click="setCurLoc(loc)">
            <p style="font-size: 1.2em;font-weight:bold;">{{loc.address}}</p>
            <p>{{loc.content}}</p>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import macaoLocations from '../addresses/macao.json'
const colors = {
    hotel: '#1296db',
    meal: '#f4ea2a',
    shopping: '#13227a',
    spot: '#d81e06',
}
export default {
    // data() {
    //     const {
    //         locations
    //     } = macaoLocations;
    //     return {
    //         locations
    //     }
    // },
    computed: mapState({
        currloc: state => state.currLocation,
        locations: state => state.data.locations,
    }),
    watch: {
        currloc(val) {
            if(val){
                document.getElementById(val.address).scrollIntoView()
            }
        }
    },
    methods: {
        setCurLoc(loc){
            this.$store.commit('SET_CUR_LOC', loc)
        },
        getStyle(loc){
            const color = colors[loc.type];
            if(this.currloc && loc.address === this.currloc.address) {
                return `border-color: ${color};background: ${color};color: #fff;`
            }
            return `border-color: ${color};`
        }
    }
}
</script>
<style module>
.sidebar {
    width: 100%;
    padding: 12px;
    height: 100%;
    overflow: scroll;
    box-sizing: border-box;
}
.block {
    border: 3px solid #fff;
    cursor: pointer;
    font-size: 14px;
}
.block + .block {
    margin-top: 12px;
}
.block > p {
    margin: 0;
}
@media only screen
and (min-device-width : 320px)
and (max-device-width : 680px)
and (orientation : portrait){
    .sidebar {
        display: inline-flex;
        flex-wrap: nowrap;
    }
    .block {
        min-width: 180px;
    }
    .block + .block {
        margin-top: 0;
        margin-left: 12px;
    }
}
</style>