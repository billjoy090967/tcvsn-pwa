import fetch from 'isomorphic-fetch'
import {
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY,
  SET_EDIT_CATEGORY,
  IS_ACTIVE,
  CONFIRM_CATEGORY_DELETE,
  DENY_CATEGORY_DELETE,
  ERROR
} from '../constants'
import history from '../history'
import { isEmpty, assoc } from 'ramda'

const url = process.env.REACT_APP_BASE_URL

export const setCategories = async (dispatch, getState) => {
  const response = await fetch(`${url}/categories`).then(res => res.json())
  dispatch({ type: SET_CATEGORIES, payload: response })
  // history.push('/categories')
}

export const setCurrentCategory = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/categories/${id}`).then(res =>
    res.json()
  )
  dispatch({
    type: SET_CURRENT_CATEGORY,
    payload: assoc('confirmDelete', false, response)
  })
}

export const deleteCategory = id => async (dispatch, getState) => {
  if (!window.localStorage.getItem('access_token')) {
    return dispatch({ type: ERROR, payload: 'Can not delete category' })
  }

  const response = await fetch(`${url}/categories/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
    },
    method: 'DELETE'
  }).then(res => res.json())

  if (!response.ok) {
    dispatch({ type: CONFIRM_CATEGORY_DELETE })
    dispatch({ type: DENY_CATEGORY_DELETE, payload: response.message })
    return
  }
  dispatch({
    type: SET_CURRENT_CATEGORY,
    payload: {}
  })
  history.push('/categories')
}

export const createCategory = async (dispatch, getState) => {
  const category = getState().category
  if (!window.localStorage.getItem('access_token')) {
    return dispatch({ type: ERROR, payload: 'Could not add category' })
  }
  const response = await fetch(`${url}/categories`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
    },
    method: 'POST',
    body: JSON.stringify(category)
  }).then(res => res.json())

  if (!response.ok) {
    dispatch({ type: ERROR, payload: 'Could not add category' })
    return
  }
  dispatch(setCategories)
  // dispatch({ type: IS_ACTIVE, payload: true })
  history.push('/categories')
}

export const setEditCategory = id => async (dispatch, getState) => {
  const response = await fetch(`${url}/categories/${id}`).then(res =>
    res.json()
  )
  dispatch({ type: SET_EDIT_CATEGORY, payload: response })
  dispatch(isActive)
}

export const updateCategory = data => async (dispatch, getState) => {
  if (!window.localStorage.getItem('access_token')) {
    return dispatch({ type: ERROR, payload: 'Could not update category' })
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
  }
  const method = 'PUT'
  const body = JSON.stringify(data)

  const result = await fetch(`${url}/categories/${data._id}`, {
    headers,
    method,
    body
  }).then(res => res.json())

  if (result.ok) {
    dispatch(setCategories)
    // dispatch({ type: IS_ACTIVE, payload: true })
    history.push('/categories/' + data._id)
  } else {
    // handle error
  }
}

export const isActive = async (dispatch, getState) => {
  const currentData = !isEmpty(getState().category.name)
    ? getState().category
    : getState().editCategory
  const { name, desc, shortDesc, icon } = currentData
  if (isEmpty(name) || isEmpty(desc) || isEmpty(shortDesc) || isEmpty(icon)) {
    dispatch({ type: IS_ACTIVE, payload: true })
  } else {
    dispatch({ type: IS_ACTIVE, payload: false })
  }
}
