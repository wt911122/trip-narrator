import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

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

const mapStateToProps = (state) => ({center: getLatLng(state.coordinate)})

class MapWrapper extends Component {

  componentWillReceiveProps (nextProps){
    if(nextProps.center){
      this.mapInstance.panTo(nextProps.center);
    }
  }

  render(){
    return <GoogleMap
      defaultZoom={9}
      defaultCenter={{ lat: 35.6693863, lng: 139.6012946 }}
      ref={(map) => {this.mapInstance = map}}
    >
      {this.props.isMarkerShown && <Marker position={this.props.center || { lat: 35.6693863, lng: 139.6012946 }} />}
    </GoogleMap>
  }
}

const TripMapComponent = compose(
  withProps({
    isMarkerShown: true,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  connect(mapStateToProps)
)(MapWrapper)



export default TripMapComponent;


