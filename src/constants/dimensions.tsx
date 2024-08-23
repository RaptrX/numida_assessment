import { Dimensions } from "react-native"

export const width = Dimensions.get('window').width
export const height = Dimensions.get('screen').height

const guidelineBaseWidth = 375

export const scale = (size: number) => {
    if (height > width) {
        return Math.round((width / guidelineBaseWidth) * size)
    } else {
        return Math.round((height / guidelineBaseWidth) * size)
    }
}

export const large = scale(16)
export const medium = scale(12)
export const small = scale(8)