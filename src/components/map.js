import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, withProps, lifecycle } from "recompose"
import { uniqueId } from 'lodash'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
  InfoWindow
} from "react-google-maps"
import Setting from './setting'
// const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
let DirectionsService = null

const getLatLng = (str) => {
  const coord = { lat: 35.6693863, lng: 139.6012946 };
  if(!str){
    return coord
  }
  const arr = str.split(',');
  coord.lat = +arr[0];
  coord.lng = +arr[1];
  return coord;
}

const mapStateToProps = (state) => {
  console.log(state)
  const prop = {
    center: getLatLng(state.coordinate),
    time: new Date(state.datetime),
    which: state.index
  }
  if(state.zoom) prop.zoom = state.zoom
  return prop;
}
const delayfunc = (func) => {
  let i = null
  return function(){
    if(i) clearTimeout(i);
    i = setTimeout(func, 500);
  }
}
const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps (nextProps){
    if(nextProps.center){
      console.log(nextProps.which)
      this.mapInstance.panTo(nextProps.center);
      let lastIndex = nextProps.which - 1;
      if(lastIndex >= 0 &&  this.props.center){
        route(DirectionsService, getLatLng(this.props.agendaplan[lastIndex].coordinate), this.props.time, nextProps.center)
          .then(result => {
            this.setState({
              routeGoogle: result
            })
          })
          .catch((err) => {
            this.setState({
              routeGoogle: null
            })
          })
      }

    }
    if(nextProps.zoom){
      console.log(nextProps.zoom)
      delayfunc(() => {
        this.setState({
          zoom: nextProps.zoom
        })
      })();
    }
  }

  renderRoutes() {
    return this.state.directions.map((dir) => <DirectionsRenderer directions={dir} />)
  }

  renderinfoWindow = (setting) => (
    <InfoWindow>
      <Setting {...setting} />
    </InfoWindow>)

  renderMarkers = () =>
    (this.props.agendaplan.map((setting, index) =>
      <Marker
        key={uniqueId("markers_")}
        icon={image}
        position={ getLatLng(setting.coordinate) }>
        {this.props.which === index && this.renderinfoWindow(setting)}
      </Marker>))

  render() {
    return <GoogleMap
      defaultZoom={9}
      defaultCenter={{ lat: 35.6693863, lng: 139.6012946 }}
      zoom={this.state.zoom || 9}
      ref={(map) => {this.mapInstance = map}}
    >
      {this.props.isMarkerShown && <Marker position={this.props.center || { lat: 35.6693863, lng: 139.6012946 }} />}
      { this.renderMarkers() }
      <Polyline
        options={{
          path: this.props.agendaplan.map((setting) => {
            if(setting.main)
              return getLatLng(setting.coordinate)
            else
              return null
          }).filter(Boolean),
          icons: [{
             /* eslint-disable no-undef */
            icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
            offset: '50%',
            repeat: '100px'
          }]
        }}
      />
      {this.state.routeGoogle && <DirectionsRenderer
        directions={this.state.routeGoogle}
        defaultOptions={{
          polylineOptions: {
            strokeColor: "#144099"
          }
        }}
      />}
    </GoogleMap>
  }

}


const route = (DirectionsService, start, startTime, end) => {
  return new Promise((resolve, reject) => {
    const _request = {
      /* eslint-disable no-undef */
      origin: new google.maps.LatLng(start.lat, start.lng),
      destination: new google.maps.LatLng(end.lat, end.lng),/* eslint-disable no-undef */
      travelMode: google.maps.TravelMode.DRIVING,/* eslint-disable no-undef */
    }
    DirectionsService.route(_request, (result, status) => {
      /* eslint-disable no-undef */
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(result);
        resolve(result);
      } else {
        console.log(result);
        reject(`error fetching directions ${result}`);
      }
    });
  })
};
const routes = (agenda, DirectionsService) => {
  let len = agenda.length;
  let pros = [];
  for (let i = 0; i<len-1; i++){

    pros.push(route(
      DirectionsService,
      getLatLng(agenda[i].coordinate),
      getLatLng(agenda[i+1].coordinate)));
  }
  return pros;
}

const formatRoutes = (agenda) => {

  /* eslint-disable no-undef */
  const DirectionsService = new google.maps.DirectionsService();
  return Promise.all(routes(agenda, DirectionsService));
}


const TripMapComponent = compose(
  withProps({
    isMarkerShown: true,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDpO3lH-mAj6xjGsqCpFWx21eOg5Fx4XIY&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      DirectionsService = new google.maps.DirectionsService();
      /*formatRoutes(this.props.agendaplan)
        .then((dirs) => {
          this.setState({
            directions: dirs
          })
        })
        .catch((err) => {
          console.log(err)
        })*/
    }
  })
)(MapWrapper)



export default TripMapComponent;


