import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './createBlog'

test('Test the create new blog form event', () => {
  const createNewBlog = jest.fn()

  const component = render(
    <CreateBlog  handleCreateBlog={createNewBlog}/>
  )
 
  const titleInput = component.container.querySelector('[name="title"]')
  const authorInput = component.container.querySelector('[name="author"]')
  const urlInput = component.container.querySelector('[name="url"]')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { 
    target: { value: 'title9' } 
  })
  fireEvent.change(authorInput, { 
    target: { value: 'author9' } 
  })
  fireEvent.change(urlInput, { 
    target: { value: 'url9' } 
  })
  fireEvent.submit(form)

  expect(createNewBlog.mock.calls).toHaveLength(1);
})