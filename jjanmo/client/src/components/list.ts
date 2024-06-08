import { dispatch, state } from '@/store'
import { renderToggleAllBtn } from './form'

const $todoList = document.querySelector('.todo-list') as HTMLUListElement

export const renderList = () => {
  const { todos } = state

  const updated = todos.map((todo) => {
    const { id, text, status } = todo
    return `
      <li key=${id} class="todo-item" id=${id}>
        <input class="todo-item-checkbox ${status}" type="checkbox"/>
        <div class="todo-content">
          <div class="todo-text ${status}">${text}</div>
          <button class="todo-item-delete-btn">✕</button>
        </div>
      </li>
    `
  })

  $todoList.innerHTML = updated.join('')
}

const handleClick = (e: Event) => {
  const target = e.target as HTMLElement
  const className = target.className
  const id = target.closest('.todo-item')?.id

  if (!id) return

  if (className.includes('delete')) {
    dispatch({ type: 'DELETE_TODO', payload: { id } })
    renderList()
    renderToggleAllBtn()
    return
  }

  if (className.includes('checkbox')) {
    dispatch({ type: 'TOGGLE_TODO_ITEM', payload: { id } })
    renderList()
    renderToggleAllBtn()
    return
  }
}

const init = () => {
  $todoList.addEventListener('click', handleClick)
}

init()
