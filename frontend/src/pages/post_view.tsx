import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentInterface } from "../interface/ContentInterface";
import MDEditor from '@uiw/react-md-editor';


export default function PostView() {
  const { section_id } = useParams();
  const [posts, setPosts] = useState<ContentInterface[]>([]);
  const [postContext, setPostContext] = useState("");
  const [postID, setPostID] = useState<number>(0);
  const [newPost, setNewPost] = useState<boolean>(false);

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
    setPostContext(text);
    setPostID(postID);
    setNewPost(false);
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
        const response = await fetch(`http://localhost:5000/post/${postID}`, {
          method: "PUT",
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
    }

    GetContent();
    setNewPost(false);
    setPostContext("");
  };

  return (
    <div >
        <button onClick={() => navigate("/edit")} >Back</button>
      {posts.map((post) => (
        <div key={post.id}>
          <MDEditor.Markdown source={post.content}/>
          <button onClick={() => Delete(post.id)}>Delete</button>
          <button onClick={() => Edit(post.content, post.id)}>Edit</button>
        </div>
      ))}
      <button onClick={() => setNewPost(true)}>add new post</button>
      <MDEditor
        value={postContext}
        onChange={(e) => setPostContext(e || "")}
      />
      
      <button onClick={Save}>Save</button>
    </div>
  );
}

