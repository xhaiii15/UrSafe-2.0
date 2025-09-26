import React, { useState, useEffect } from "react";
import axios from "axios";
import { Shield, LogOut, Plus, Pencil, Trash } from "lucide-react";

function Dashboard({ onPostCreated, newPost }) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "https://ursafe-2-0-backend.onrender.com/api/posts/create",
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTitle("");
            setDescription("");
            setIsAddDialogOpen(false);

            setPosts((prev) => [res.data.post, ...prev]);

        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
        }
    };

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://ursafe-2-0-backend.onrender.com/api/posts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (newPost) {
            setPosts((prev) => [newPost, ...prev]);
        }
    }, [newPost]);

    const handleDelete = async (id) => {
        try {
            setPosts((prev) => prev.filter((post) => post._id !== id));
            setSelectedPost(null);
            setIsViewDialogOpen(false);
        } catch (error) {
            console.error("Error deleting post:", error.response?.data || error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `https://ursafe-2-0-backend.onrender.com/api/posts/${selectedPost._id}`,
                {
                    title: editTitle,
                    description: editDescription,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            await fetchPosts();
            setSelectedPost(null);
            setIsViewDialogOpen(false);
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-blue-50">
            {/* Header */}
            <div className="bg-white shadow-md">
                <div className="w-full px-4 py-4">
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                            <Shield className="h-6 w-6 text-[#FFD93D] mr-1" />
                            <h1 className="text-xl font-bold">Ursafe</h1>
                        </div>
                        <div className="flex items-center gap-5">
                            <p className="text-sm text-[#7A7A73]">Your safety, our priority</p>
                            <button
                                className="flex items-center gap-2 p-1 cursor-pointer"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 text-red-600" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <Shield className="h-16 w-16 text-[#7A7A73] mx-auto mb-4" />
                        <h2 className="text-xl font-medium mb-2">No memories yet...</h2>
                        <p className="text-[#7A7A73] max-w-md mx-auto">
                            Share, Store, and Secure your Memories using the plus button below.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white rounded-lg p-6"
                                onClick={() => {
                                    setSelectedPost(post);
                                    setEditTitle(post.title);
                                    setEditDescription(post.description);
                                    setIsEditing(false);
                                    setIsViewDialogOpen(true);
                                }}
                            >
                                <div className="pb-2">
                                    <div className="text-lg leading-tight font-bold ">{post.title}</div>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3">{post.description}</p>
                                <div className="text-xs text-gray-500">
                                        <small>{new Date(post.createdAt).toLocaleString()}</small>
                                    </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6">
                <button
                    className="flex items-center justify-center h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-[#0F0E0E] cursor-pointer"
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    <Plus className="h-6 w-6 text-white" />
                </button>
            </div>

            {/* Add Item Modal */}
            {isAddDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold mb-2">Add New Item</h2>
                        <p className="text-sm text-gray-500 mb-4">Share, Store, and Secure your Memories</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Title</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddDialogOpen(false)}
                                    className="px-4 py-2 border rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!title.trim() || !description.trim()}
                                    className="px-4 py-2 bg-[#0F0E0E] text-white rounded-md"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View/Edit Item Modal */}
            {isViewDialogOpen && selectedPost && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-10  ">
                        <h2 className="text-2xl mb-2 font-bold">
                            {isEditing ? "Edit Item" : selectedPost.title}
                        </h2>
                        {!isEditing && (
                            <p className="text-sm text-gray-500 mb-4">
                                {formatDate(selectedPost.createdAt)}
                            </p>
                        )}

                        {isEditing ? (
                            <div className="space-y-3">
                                <input
                                    className="w-full border rounded-md px-3 py-2"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <textarea
                                    rows={4}
                                    className="w-full border rounded-md px-3 py-2"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-black break-words whitespace-pre-line text-justify">{selectedPost.description}</p>
                        )}

                        <div className="mt-6 flex justify-end gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        className="px-4 py-2 border rounded-md"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#0F0E0E]    text-white rounded-md"
                                        onClick={handleUpdate}
                                        disabled={!editTitle.trim() || !editDescription.trim()}
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="px-4 py-2  rounded-md text-red-500"
                                        onClick={() => handleDelete(selectedPost._id)}
                                    >
                                        <Trash/>
                                    </button>
                                    <button
                                        className="px-4 py-2  rounded-md"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Pencil/>
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#0F0E0E] text-white rounded-md"
                                        onClick={() => setIsViewDialogOpen(false)}
                                    >
                                        Close
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
