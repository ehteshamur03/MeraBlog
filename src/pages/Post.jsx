import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // To get user data from Redux
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for better user experience
  const [error, setError] = useState(null); // Error state to show errors
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // Get user data from Redux

  useEffect(() => {
    if (slug) {
      setLoading(true); // Start loading
      setError(null); // Clear previous error

      // Fetch the post by slug
      appwriteService.getPost(slug)
        .then((fetchedPost) => {
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            setError("Post not found");
            navigate('/'); // Redirect to home if post doesn't exist
          }
        })
        .catch((error) => {
          setError("Error fetching post: " + error.message);
          console.error('Error fetching post:', error);
          navigate('/'); // Redirect on error
        })
        .finally(() => {
          setLoading(false); // End loading once data is fetched
        });
    } else {
      setError("Invalid post URL");
      navigate('/'); // Redirect if no slug
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (post) {
      appwriteService.deletePost(post.$id) // Delete post by ID
        .then((status) => {
          if (status) {
            // Delete the associated file if post deletion is successful
            appwriteService.deleteFile(post.featuredImage)
              .then(() => {
                navigate('/'); // Redirect to home after deletion
              })
              .catch((error) => {
                setError("Error deleting file: " + error.message);
                console.error('Error deleting file:', error);
              });
          } else {
            setError('Failed to delete post');
            console.error('Failed to delete post');
          }
        })
        .catch((error) => {
          setError("Error deleting post: " + error.message);
          console.error('Error deleting post:', error);
        });
    }
  };

  // Ensure the post and user match before rendering the content
  const isAuthor = post && userData && String(post.user_Id) === String(userData.targets[0]?.userId);

  // Loading, error, and post rendering logic
  if (loading) {
    return <div className="text-center">Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>; // Show error message
  }

  // Ensure post and user match before rendering the content
  return post ? (
    <div className="py-2 ">
      <Container>
        {isAuthor && (
          <div className="flex justify-end mb-4"> {/* Flex container for right-aligned buttons */}
            <Link to={`/edit-post/${post.$id}`} className="mr-3">
              <Button bgColor="bg-green-500">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
          {post.featuredImage && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {parse(post.content)} {/* Parsing and rendering HTML content */}
        </div>
      </Container>
    </div>
  ) : null; // Render nothing if no post is found
}
