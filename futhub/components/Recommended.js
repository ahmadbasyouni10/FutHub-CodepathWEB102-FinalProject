import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from './Card';
import Avatar from './Avatar';



const Recommended = () => {
    const [session, setSession] = useState(null);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
          const {data: { session },
          } = await supabase.auth.getSession()
          supabase.from('users').select().then((result) => {
            if (result.data.length > 0) {
                setUsers(result.data);
              
          }}
        )};
      fetchUsers();
      }, []);
      return (
        <Card Padding={true}>
                        <h2 className="text-2xl text-gray-400 font-bold">Who To follow</h2>
                        <div className='gap-3 mt-3'>
                            {users.map(user => (
                                <div className="gap-2 flex items-center py-2">
                                    <Avatar url={user.picture} />
                                    <h3 className='font-bold text-center'>{user.name}</h3>
                                </div>
                            ))}
                        </div>
                    </Card>
      )


}

export default Recommended;
