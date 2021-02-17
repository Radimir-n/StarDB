import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { ComponentContent} from '../../components/content/index'

import { setActivePage} from '../../actions/index'

export const Content = () => {

  const dispatch = useDispatch()

  const activePage = useSelector(state => state.toolBar.page)

  return (
    <ComponentContent
      onActivePage={ (value) => dispatch( setActivePage(value) ) }
      activePage={ activePage }
    />
  )
}
