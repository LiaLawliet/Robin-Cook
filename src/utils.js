import config from './config.js'

export function getCoords(leapPoint, frame) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * config.width - config.width / 2,
        y : (1 - normalizedPoint[1]) * config.height
    };
}