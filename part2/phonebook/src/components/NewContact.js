import React from 'react'

export default ({
  addContact,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addContact}>
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              {' '}
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>number:</td>
            <td>
              <input
                type="text"
                value={newNumber}
                onChange={e => setNewNumber(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">add</button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}
