import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { ComponentList } from '../../components/list/index'

import { setActivePage} from '../../actions/index'

export const List = () => {

  const dispatch = useDispatch()

  const activePage = useSelector(state => state.toolBar.page)


  return (
    <ComponentList
      activePage={ activePage }
    />
  )
}
