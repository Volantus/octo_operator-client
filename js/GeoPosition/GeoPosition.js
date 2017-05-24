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

    /**
     * @type {float}
     */
    this.longitude = longitude;

    /**
     * @type {float}
     */
    this.latitude = latitude;

    /**
     * @type {float}
     */
    this.altitude = altitude;
}