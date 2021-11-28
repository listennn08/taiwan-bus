import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

export const tracking = () => {
  if (import.meta.env.DEV) {
    whyDidYouRender(React, {
      trackAllPureComponents: true,
    })
  }
}