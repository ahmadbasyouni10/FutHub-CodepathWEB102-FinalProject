// import { useEffect, useState } from 'react';
// import { supabase } from '../client';


// export function useSessionData() {
//     const [session, setSession] = useState(null);
//     const [pfp, setPfp] = useState(null);
//     const [nameuser, setNameuser] = useState(null);
//     useEffect(() => {
//         const fetchSession = async () => {
//           const {data: { session },
//           } = await supabase.auth.getSession()
//           setSession(session);
//           supabase.from('users').select().eq('id', session.user.id)
//           .then((result) => {
//             if (result.data.length > 0) {
//               setPfp(result.data[0].picture);
//               setNameuser(result.data[0].name);
//           }}
//         )};
//       fetchSession();
//       }, []);

//       return { pfp, nameuser}
// }
