import { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null); // Renamed state to match the variable better
    const [loading, setLoading] = useState(true); // Loading state to show user feedback
    const [error, setError] = useState(null); // Error state to handle failures
    const { slug } = useParams();
    const navigate = useNavigate();

    // Fetch post when component mounts or slug changes
    useEffect(() => {
        if (slug) {
            setLoading(true);
            setError(null); // Clear any previous error

            // Fetch post from the service
            appwriteService.getPost(slug)
                .then((fetchedPost) => {
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    } else {
                        setError("Post not found.");
                        navigate('/'); // Redirect if post doesn't exist
                    }
                })
                .catch((err) => {
                    setError("Error fetching post: " + err.message); // Handle fetch errors
                    console.error("Error fetching post:", err);
                })
                .finally(() => {
                    setLoading(false); // Stop loading once the data is fetched
                });
        } else {
            setError("Invalid post URL.");
            navigate('/'); // Redirect if no slug is present
        }
    }, [slug, navigate]);

    // Conditional rendering based on loading, error, and post data
    if (loading) {
        return <div className="text-center">Loading...</div>; // Show loading state
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>; // Show error message
    }

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null; // Render nothing if post is not found
}

export default EditPost;
