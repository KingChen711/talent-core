import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import axios from 'axios'

function useCurrentUser() {
  const { getToken, userId } = useAuth()
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/who-am-i', {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [userId])

  return user
}

export default useCurrentUser
