import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

export default function PostEditor() {
    const { section_id } = useParams();
    const [contekst, setContekst] = useState([]);

    useEffect(() => {
        GetContent();
    }, []);

    function GetContent(){
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/post/${section_id}`);
                const data = await response.json();
                setContekst(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }


    return (
        <div>
            {
                contekst.map((post: any) => (
                    <div key={post.id}>
                        <label> constent: {post.content} ID: {post.id}</label>
                    </div>
                ))
            }
        </div>
    );
}