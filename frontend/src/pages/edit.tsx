import { useEffect, useState } from "react";
import { SectionInterface } from "../interface/SectionInterface";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPlus,
    faPenToSquare,
    faCheck,
    faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

export default function Edit() {
    const [sections, setSections] = useState([]);
    const [sectionName, setSectionName] = useState("");
    const [newSectionName, setNewSectionName] = useState("");
    const redirect = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            redirect("/login");
        }
        GetSections();
    }, []);

    function LogOut(){
        localStorage.removeItem("token");
        redirect("/login");
    }

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
            <h1>Menu sections </h1>
            <button title="Log out" onClick={LogOut} className="log-out"><FontAwesomeIcon icon={faPowerOff} /></button>
            <div className="container">
                <div className="new-section">
                    <input
                        type="text"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                    ></input>
                    <button onClick={AddSection} className="accept-button options-button" id="add">
                        New Section <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className="section">
                    {sections.map((section: SectionInterface) => (
                        <div key={section.id}>
                            <div className="section-name">
                                <div className="section-name-text">{section.name}</div>
                                <div className="section-options">
                                    <button
                                        title="Delete Section"
                                        className="delete-button options-button"
                                        onClick={() =>
                                            DeleteSection(section.id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button
                                        title="Edit Section Content"
                                        className="edit-button options-button"
                                        onClick={() =>
                                            redirect(`/edit/post/${section.id}`)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h2>Sectio options</h2>
                                <div className="section-name">
                                    <div>
                                    <input
                                        title="Enter new section name"
                                        type="text"
                                        onChange={(e) =>
                                            setNewSectionName(e.target.value)
                                        }
                                        placeholder="Enter new section name"
                                    ></input>
                                    </div>
                                    <div className="section-options">
                                        <button
                                            title="Accept Section Name"
                                            className="accept-button options-button"
                                            onClick={() =>
                                                UpdateSection(section.id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
