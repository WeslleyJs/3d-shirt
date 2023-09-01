import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#2dcf1b', '#009FDC', '#F3222E', '#353934'],
  // decals: ['react', 'three2', 'pmndrs'],
  decals: ['react'],
  selectedColor: '#353934',
  selectedDecal: 'react'
})

export { state }
