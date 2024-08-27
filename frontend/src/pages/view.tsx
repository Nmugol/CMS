import { useEffect, useState } from "react";
import { SectionInterface } from "../interface/SectionInterface";
import { PostContentInterface } from "../interface/PostCreatorInterface";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

export default function View() {

    const [sections, setSections] = useState<SectionInterface[]>([]);
    const [postList, setPostList] = useState<PostContentInterface[] | null>(null);
    const [selectedSection, setSelectedSection] = useState<number>(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/section", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data);
                setSections(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/post/${selectedSection}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                setPostList(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [selectedSection]);

    return (
        <div >
            <div className="menu" >
                {sections.map((section) => (
                    <button
                        className="menu-item"
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                    >
                        {section.name}
                    </button>
                ))}
                <button className="menu-item" onClick={() => {
                    if(localStorage.getItem("token")){
                        navigate("/edit");
                    }
                    else{
                        navigate("/login");
                    }
                }}>Edit</button>
            </div>
            <div className="post-container">
                {postList && postList.length > 0 && postList.map((post: PostContentInterface) => (
                    <MDEditor.Markdown source={post.content}/>
                ))}

            </div>
        </div>
    );
}

