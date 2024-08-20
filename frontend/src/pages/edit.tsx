import { useEffect, useState } from "react";
import { SectionInterface } from "../interface/SectionInterface";
import { useNavigate } from "react-router-dom";

export default function Edit() {
    const [sections, setSections] = useState([]);
    const [sectionName, setSectionName] = useState("");
    const [newSectionName, setNewSectionName] = useState("");
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
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/section/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name: newSectionName }),
                    }
                );
                const data = await response.json();
                console.log(data);
                GetSections();
                setNewSectionName("");
            } catch (error) {
                console.error("Error:", error);
            }

            GetSections();
        };

        fetchData();
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
                    <div>{section.name}</div>
                    <button onClick={() => DeleteSection(section.id)}>
                        Delete
                    </button>
                    <button onClick={() => redirect(`/edit/post/${section.id}`)}>
                        Edit
                    </button>
                    <button>Change Name</button>
                    <div>
                        <input type="text" onChange={(e) => setNewSectionName(e.target.value)}></input>
                        <button onClick={() => UpdateSection(section.id)}>Update</button>
                        <button>Cancel</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
