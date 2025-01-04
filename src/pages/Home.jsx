import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents || []);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-8 mt-4">
        <Container>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
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
      <div className="w-full py-8 mt-4">
        <Container>
          <h1 className="text-2xl font-bold text-gray-600 text-center">
            No posts available. Please log in to read posts. 😊
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
      <div className="flex flex-wrap -mx-2">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/2 lg:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
      </Container>
    </div>
  );
}

export default Home;
