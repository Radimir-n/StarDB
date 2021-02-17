import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { ComponentToolBar } from '../../components/toolBar/index'

import { setActivePage} from '../../actions/index'

export const ToolBar = () => {

  const dispatch = useDispatch()

//   const leftMenuOpened = useSelector(state => state.general.leftMenuOpened)
//   const leftMenu = useSelector(state => state.general.leftMenu)

  return (
    <ComponentToolBar
    //   leftMenuOpened={ leftMenuOpened }
      onActivePage={ (value) => dispatch( setActivePage(value) ) }
    //   leftMenu={ leftMenu }
    //   setBreadCrumbs={ (value) => dispatch( setBreadCrumbs(value) ) }
    //   toggleLeftMenu={ (value) => dispatch( toggleLeftMenu(value) ) }
    />
  )
}
