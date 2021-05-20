// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import ReactMapGL from 'react-map-gl';
// import {Auth} from 'aws-amplify';

// import mapboxgl from 'mapbox-gl';
// mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW5oc3UiLCJhIjoiY2tueG9zdzl2MG43NTJxbzg5MXZveG93NSJ9.3dAlMnFfpPCVY5ALKx0wxw';
// function Map() {
//   const [viewport, setViewport] = useState({
//     width: 400,
//     height: 400,
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8
//   });

//   const [credentials, setCredentials] = useState(null);
//   useEffect(() => {
//     const fetchCredentials = async () => {
//       const currentUserCredentials = await Auth.currentUserCredentials;
//       console.log(currentUserCredentials);
//       setCredentials(currentUserCredentials);
//     };
//     fetchCredentials();
//     console.log(credentials);
//   }, []);
//   return (
//     <ReactMapGL
//       {...viewport}
//       onViewportChange={nextViewport => setViewport(nextViewport)}
//     />
//   );
// }
import React, {useRef, useEffect, useState, Component} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW5oc3UiLCJhIjoiY2tueG9zdzl2MG43NTJxbzg5MXZveG93NSJ9.3dAlMnFfpPCVY5ALKx0wxw';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: this.props.lng,
            lat: this.props.lat,
            zoom: 15
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        console.log(this.props);
        console.log(this.state);
        const {lng, lat,zoom} = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        })
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })
        })

        //marker
        var marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
    };

    // componentDidUpdate() {
    //     console.log(this.props);
    //     console.log(this.state);
    //     const {lng, lat, zoom} = this.state;
    //     const map = new mapboxgl.Map({
    //         container: this.mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [this.props.lng, this.props.lat],
    //         zoom: zoom
    //     })
    //     map.on('move', () => {
    //         this.setState({
    //             lng: map.getCenter().lng.toFixed(4),
    //             lat: map.getCenter().lat.toFixed(4),
    //             zoom: map.getZoom().toFixed(2)
    //         })
    //     })

    //     //marker
    //     var marker = new mapboxgl.Marker()
    //     .setLngLat([this.props.lng, this.props.lat])
    //     .addTo(map);
    // }

    render() {
        const {lng, lat, zoom} = this.state;
        return (
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container"></div>
            </div>
           
        )
    }


}

// const Map = () => {
//     const mapContainerRef = useRef(null);
  
//     const [lng, setLng] = useState(5);
//     const [lat, setLat] = useState(34);
//     const [zoom, setZoom] = useState(1.5);
  
//     // Initialize map when component mounts
//     useEffect(() => {
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [lng, lat],
//         zoom: zoom
//       });
  
//       // Add navigation control (the +/- zoom buttons)
//       map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
//       map.on('move', () => {
//         setLng(map.getCenter().lng.toFixed(4));
//         setLat(map.getCenter().lat.toFixed(4));
//         setZoom(map.getZoom().toFixed(2));
//       });
  
//       // Clean up on unmount
//       return () => map.remove();
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
//     return (
//       <div>
//         <div className='sidebarStyle'>
//           <div>
//             Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//           </div>
//         </div>
//         <div className='map-container' ref={mapContainerRef} />
//       </div>
//     );
//   };
  
  export default Map;