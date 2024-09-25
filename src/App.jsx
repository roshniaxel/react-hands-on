import { useEffect, useState } from "react";

function UserItem({ name }) {
  return <li>{name}</li>;
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setIsLoading(true)

    const controller = new AbortController()
    //fetch("https://jsonplaceholder.typicode.com/users", {
    fetch("/user.json", {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(setUsers)
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <h1>User List</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {users.map(user => {
            return <UserItem key={user.id} name={user.name} />
          })}
        </ul>
      )}
    </>
  )
}

export default App