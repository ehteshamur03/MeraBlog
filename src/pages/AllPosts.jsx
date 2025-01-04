import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents || []);
        }
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="ml-4 text-lg font-semibold text-gray-600">
            Loading posts...
          </p>
        </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
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
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-600">
            No posts available at the moment.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
