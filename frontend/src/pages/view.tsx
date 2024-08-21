import { useEffect, useState } from "react";
import { SectionInterface } from "../interface/SectionInterface";
import { PostContentInterface } from "../interface/PostCreatorInterface";
import MDEditor from "@uiw/react-md-editor";

export default function View() {
    const [sections, setSections] = useState<SectionInterface[]>([]);
    const [postList, setPostList] = useState<PostContentInterface[]>([]);
    const [selectedSection, setSelectedSection] = useState<number>(1);

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
                    <div
                        className="menu-item"
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                    >
                        {section.name}
                    </div>
                ))}
            </div>
            <div className="post-container">
                {postList.map((post: PostContentInterface) => (
                    <MDEditor.Markdown source={post.content}/>
                ))}

            </div>
        </div>
    );
}
