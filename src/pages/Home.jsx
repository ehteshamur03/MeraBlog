import { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
                        <p className="ml-4 text-lg font-semibold text-gray-600">
                            Loading posts...
                        </p>
                    </div>
                </Container>
            </div>
        );
    }


    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts :)
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home