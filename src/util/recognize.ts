import { preprocess } from "./imagePreprocess"
import { normalize } from "./math"
const tf = require('@tensorflow/tfjs-node')

export const recognize: any = async (image: any) => {
  const model = await tf.loadLayersModel('file://recjs/model.json')
  const preprocessedImage = preprocess(image)
  const output = Array.from(model.predict(preprocessedImage).dataSync())
  return normalize(output)
}
