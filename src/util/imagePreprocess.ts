const tf = require('@tensorflow/tfjs-node')

export const preprocess = (imgData: any) => {
  return tf.tidy(() => {
    const newData = imgData.map((arr: any) => {
      return arr.map((a: any) => {
        return a.map((el: any) => el / 255)
      })
    })
    return tf.tensor3d(newData).expandDims(0)
 })
}
