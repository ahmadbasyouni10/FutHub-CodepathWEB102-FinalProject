import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Avatar from '@/components/Avatar';
import Link from 'next/link';

const Notifications = () => {
    return(
        <div>
            <Layout>
                <h1 className='text-4xl mb-4 text-gray-500'>Notifications</h1>
                <Card Padding={true}>
                        <h2 className='text-3xl mb-2'></h2>
                        <div className='gap-3'>
                            <div className='flex items-center pb-4 py-2 mb-5 border-b-2 border-teal-500'>
                                <Avatar />
                                <h3 className='px-3 flex text-center'><div className='font-bold mr-1'>Katherine</div> liked your <Link href={''} className='text-teal-500 hover:underline ml-1'>post</Link></h3>
                            </div>
                            <div className='flex py-2 pb-4 mb-5 items-center border-b-2 border-teal-500'>
                                <Avatar />
                                <h3 className='px-3 flex text-center'><div className='font-bold mr-1'>Katherine</div> liked your <Link href={''} className='text-teal-500 hover:underline ml-1'>post</Link></h3>
                            </div>
                            <div className='flex py-2 pb-4 mb-5 items-center border-b-2 border-teal-500'>
                                <Avatar />
                                <h3 className='px-3 flex text-center'><div className='font-bold mr-1'>Katherine</div> liked your <Link href={''} className='text-teal-500 hover:underline ml-1'>post</Link></h3>
                            </div>
                            <div className='flex py-2 pb-4  mb-5 items-center border-b-2 border-teal-500'>
                                <Avatar />
                                <h3 className='px-3 flex text-center'><div className='font-bold mr-1'>Katherine</div> liked your <Link href={''} className='text-teal-500 hover:underline ml-1'>post</Link></h3>
                            </div>
                        </div>
                    </Card>
            </Layout>

        </div>
    );
}

export default Notifications;