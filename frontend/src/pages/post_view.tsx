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
import MDEditor, {
    commands,
    ICommand,
    TextState,
    TextAreaTextApi,
} from "@uiw/react-md-editor";

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

    const slider: ICommand = {
        name: "slider",
        keyCommand: "slider",
        buttonProps: { "aria-label": "Insert title3" },
        icon: (
            <svg width="12" height="12" viewBox="0 0 520 520">
                <path
                    fill="currentColor"
                    d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
                />
            </svg>
        ),
        execute: (state: TextState, api: TextAreaTextApi) => {
            let modifyText = `::slider ${state.selectedText} ::endslider\n`;
            if (!state.selectedText) {
                modifyText = `::slider ![](image1.jpg) ![](image2.jpg) ![](image3.jpg) ::endslider`;
            }
            api.replaceSelection(modifyText);
        },
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
                    <MDEditor.Markdown source={post.content} />

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
                    commands={[...commands.getCommands(), slider]}
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
