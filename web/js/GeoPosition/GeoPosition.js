/**
 * @param {TopicStatus} topic
 * @param {moment} receivedAt
 * @param {float} latitude
 * @param {float} longitude
 * @param {float} altitude
 * @constructor
 */
function GeoPosition(topic, receivedAt, latitude, longitude, altitude)
{
    AbstractTopicMessage.call(this, topic, receivedAt);

    this.longitude = longitude;
    this.latitude = latitude;
    this.altitude = altitude;
}