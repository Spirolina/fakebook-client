import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';



export const useFriendRec = () => {
  const [friendRecs, setFriendRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.token) {
      setLoading(true);
      axios
      .get(`https://spirolina-fakebook.herokuapp.com/api/users`, {
        headers: {
          'Authorization': auth.token
        }
      })
      .then(res => {
        setFriendRecs(res.data.users);
        setLoading(false);
      })
}

    },[auth.token])



  return [friendRecs, loading]

}
