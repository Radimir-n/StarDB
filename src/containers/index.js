import React from 'react'
import {ToolBar} from '../containers/toolBar/index'
import {Content} from '../containers/content/index'

export const App = () => {
  return (
    <div className='app'>
      <ToolBar/>
      <Content/>
    </div>
  )

}
