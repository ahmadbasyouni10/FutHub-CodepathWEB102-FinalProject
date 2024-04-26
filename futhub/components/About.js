import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from './Card';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';


const About = () => {
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [session, setSession] = useState(null);
    const router = useRouter();
    console.log({router})
    const userID = router?.query.profile? router.query.profile[0] : null;
    const [updatedAbout, setUpdatedAbout] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: users, error } = await supabase.from('users').select().eq('id', userID);
            if (error) {
                console.error('Error fetching user:', error);
            } else if (users && users.length > 0) {
                setProfile(users[0]);
            } else {
                console.error('No user found with id:', userID);
            }
        };
        if (userID) {
            fetchProfile();
        }
    }, [userID]);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (!session) {
                router.push('/login');
                return
              }
            const { data: users, error } = await supabase.from('users').select().eq('id', session.user.id);
            if (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchSession();
    }, [router, supabase]);

    const isMyProfile = session?.user?.id === userID;

    const handleUpdateAbout = async (e) => {
        setUpdatedAbout(e.target.value);
    }
    
    const handleSavingAbout = async () => {
            setLoading(true);
            supabase.from('users').update({about: updatedAbout}).eq('id', session.user.id).then((result) => {
                if (result.error) {
                    console.error('Error updating user:', result.error);
                } else {
                    setProfile({...profile, about: updatedAbout});
                    setEditing(false);
                    setLoading(false);
                }
            })
    }
    
    return (
        <div>
            <Card Padding={true}>
                <div>
                <h2 className="text-3xl mb-2">
                    {!loading && profile?.about ? profile.about : (!editing ? 'No about section yet' : '')}
                    {editing && <textarea className="text-black h-20 py-1 px-2 w-full rounded-md border border-black text-sm" type='text' onChange={handleUpdateAbout} placeholder="Tell people about yourself..." value={updatedAbout} />}
                    {loading && <ClipLoader color={'#000'} loading={loading} size={20} />}
                </h2>
                </div>
                {isMyProfile && !editing && (
                    <button onClick={() => setEditing(!editing)} className='text-blue-500'>Edit</button>
                )}
                {isMyProfile && editing && (
                    <div className='flex gap-2'>
                    <button onClick={handleSavingAbout} className='text-blue-500 cursor-pointer'>Save</button>
                    <button onClick={() => setEditing(!editing)} className='text-red-500 cursor-pointer'>Cancel</button>
                    </div>
                )}
            </Card>

        </div>
    )
}
export default About;
