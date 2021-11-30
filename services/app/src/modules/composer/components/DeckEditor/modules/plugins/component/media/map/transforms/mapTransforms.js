import { config } from "../../../../../../../../../../config";

const apiKey = `${config.elements.map.google.apiKey}`;
export const getMapUrl = ({
  location, width, height, zoomLevel, accentColor, backgroundColor = "0xf5f5f5", titleColor
  // poiColor = '0xff2600',
  // textStrokeColor = '0xf5f5f5',
  // primaryTextFillColor = '0x616161',
  // secondaryTextFillColor = '0x9e9e9e',
  // poiTextColor = '0x757575'
}) => `https://maps.googleapis.com/maps/api/staticmap?maptype=roadmap&center=${location}`
  + `&zoom=${zoomLevel}&size=${width}x${height}&scale=2&maptype=roadmap&key=${apiKey}&style=element:labels.icon%7Cvisibility:off`
  + `&style=element:geometry%7Ccolor:0xf5f5f5`
  + `&style=element:labels.icon%7Cvisibility:off`
  + `&style=element:labels.text.fill%7Ccolor:${titleColor}`
  + `&style=element:labels.text.stroke%7Ccolor:${backgroundColor}`
  + `&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd`
  + `&style=feature:administrative.neighborhood%7Cvisibility:off`
  + `&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee`
  + `&style=feature:poi%7Celement:labels.text%7Cvisibility:off`
  + `&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575`
  + `&style=feature:poi.business%7Cvisibility:off`
  + `&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5`
  + `&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e`
  + `&style=feature:road%7Celement:geometry%7Ccolor:0xffffff`
  + `&style=feature:road%7Celement:labels%7Cvisibility:off`
  + `&style=feature:road%7Celement:labels.icon%7Cvisibility:off`
  + `&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575`
  + `&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada`
  + `&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161`
  + `&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e`
  + `&style=feature:transit%7Cvisibility:off`
  + `&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5`
  + `&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee`
  + `&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9`
  + `&style=feature:water%7Celement:labels.text%7Cvisibility:off`
  + `&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e`;
