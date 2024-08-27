import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentInterface } from "../interface/ContentInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faXmark,
    faPenToSquare,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";

export default function PostView() {
    const { section_id } = useParams();
    const [posts, setPosts] = useState<ContentInterface[]>([]);
    const [postContext, setPostContext] = useState("");
    const [postID, setPostID] = useState<number>(0);
    const [newPost, setNewPost] = useState<boolean>(false);
    const [showEditor, setShowEditor] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        GetContent();
    }, []);

    const GetContent = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/post/${section_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const Edit = (text: string, postID: number) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPostContext(text);
        setPostID(postID);
        setNewPost(false);
        setShowEditor(true);
    };

    const Delete = async (postID: number) => {
        try {
            const response = await fetch(
                `http://localhost:5000/post/${postID}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            console.log("ERROR: ", error);
        }

        GetContent();
    };

    const Save = async () => {
        if (newPost) {
            try {
                const response = await fetch("http://localhost:5000/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: postContext,
                        section_id: section_id,
                    }),
                });
            } catch (error) {
                console.log("ERROR: ", error);
            }
        } else {
            try {
                const response = await fetch(
                    `http://localhost:5000/post/${postID}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            content: postContext,
                            section_id: section_id,
                        }),
                    }
                );
            } catch (error) {
                console.log("ERROR: ", error);
            }
        }

        GetContent();
        setNewPost(false);
        setPostContext("");
        setShowEditor(false);
    };

    return (
        <div>
            <div className="menu">
                <button className="menu-item" onClick={() => navigate("/edit")}>
                    Back
                </button>
                <button
                    className="add-post-button"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setNewPost(true);
                        setShowEditor(true);
                    }}
                >
                    add new post
                </button>
            </div>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <MDEditor.Markdown source={post.content}/>

                    <button
                        className="options-button delete-button"
                        onClick={() => Delete(post.id)}
                    >
                        Delete <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                        className="edit-button options-button"
                        onClick={() => Edit(post.content, post.id)}
                    >
                        Edit <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            ))}

            <div
                className={showEditor ? "show post-editor" : "hide post-editor"}
            >
                <MDEditor
                    value={postContext}
                    onChange={(e) => setPostContext(e || "")}
                    height={500}
                />

                <div className="save-post-button">
                    <button
                        className="accept-button options-button"
                        onClick={Save}
                    >
                        Save <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                        className="delete-button options-button"
                        onClick={() => {
                            setShowEditor(false);
                            setPostContext("");
                        }}
                    >
                        Cancel <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>
        </div>
    );
}
