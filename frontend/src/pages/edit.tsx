import { useEffect, useState } from "react";
import { SectionInterface } from "../interface/SectionInterface";
import Section from "../components/section";
import { useNavigate } from "react-router-dom";

export default function Edit() {
    const [sections, setSections] = useState([]);
    const [sectionName, setSectionName] = useState("");
    const [sectionId, setSectionId] = useState(0);
    const redirect = useNavigate();

    useEffect(() => {
        GetSections();
    }, []);

    function AddSection() {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/section", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: sectionName }),
                });
                const data = await response.json();
                console.log(data);
                GetSections();
                setSectionName("");
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }

    function DeleteSection(id: number) {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/section/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                console.log(data);
                GetSections();
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }

    function UpdateSection(id: number) {
        console.log(id);
        setSectionId(id);
        redirect(`/postEditor/${id}`);
    }

    function GetSections() {
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
    }

    return (
        <div>
            <h1>Edit</h1>
            <input
                type="text"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
            ></input>
            <button onClick={AddSection}>Add Section</button>
            {sections.map((section: SectionInterface) => (
                <div key={section.id}>
                    <Section name={section.name} id={0} />
                    <button onClick={() => DeleteSection(section.id)}>
                        Delete
                    </button>
                    <button onClick={() => redirect(`/postEditor/${section.id}`)}>
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
}
