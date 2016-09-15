import React from 'react'
import { render } from 'react-dom'
import { Map, MarkerGroup } from 'react-d3-map';

export default class MyMap extends React.Component {
  constructor () {
    super()
  }

  render () {
    var width = window.innerWidth;
    var height = 700;
    var scale = 1200 * 2;
    var scaleExtent = [1 << 12, 1 << 13]
    var center = [this.props.center.lat, this.props.center.lng];
    var data = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                  this.props.center.lat,
                  this.props.center.lng
              ]
            }
        }
    var popupContent = function(d) { return d.properties.text; }
    console.log(this.props.center)
    return (
      <div>
        <h1>Users:</h1>
        { JSON.stringify(this.props.users) }
        <Map
          width= {width}
          height= {height}
          scale= {scale}
          scaleExtent= {scaleExtent}
          center= {center} >
          <MarkerGroup
            key= {"polygon-test"}
            data= {data}
            popupContent= {popupContent}
            markerClass= {"your-marker-css-class"}
          />
        </Map>
      </div>
    )
  }
}
