module.exports = transformLocation = (locationString) => {
    const [latitude, longitude] = locationString.split(',').map(coord => parseFloat(coord.trim()));

    return {
        type: 'Point',
        coordinates: [longitude, latitude],
    };
}


