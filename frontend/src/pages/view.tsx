import { useEffect, useState } from "react";
import { SectionInterface } from "../interface/SectionInterface";
import { PostContentInterface } from "../interface/PostCreatorInterface";
import { useNavigate } from "react-router-dom";
import MarkdownView from "react-showdown";
import Slider from "../components/slider";
export default function View() {
  const [sections, setSections] = useState<SectionInterface[]>([]);
  const [postList, setPostList] = useState<PostContentInterface[] | null>(null);
  const [selectedSection, setSelectedSection] = useState<number>(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  const replaceSlidersWithDivs = (text: string): string => {
    return text.replace(
      /::slider\s*((?:\!\[\]\([^\)]+\)\s*)+)\s*::endslider/g,
      (match, content) => {
        const names = content
          .match(/\!\[\]\(([^\)]+)\)/g)
          ?.map((image: string) => {
            const nameMatch = image.match(/\!\[\]\(([^)]+)\)/);
            if (nameMatch) {
              const name = nameMatch[1];
              return `<img key=${name} src=${name} alt=${name} />`;
            }
            return "";
          }) || [];

        return names.join("");
      }
    );
  };

  return (
    <div>
      <div className="menu">
        {sections.map((section) => (
          <button
            key={section.id}
            className="menu-item"
            onClick={() => setSelectedSection(section.id)}
          >
            {section.name}
          </button>
        ))}
        <button
          className="menu-item"
          onClick={() => {
            if (localStorage.getItem("token")) {
              navigate("/edit");
            } else {
              navigate("/login");
            }
          }}
        >
          Edit
        </button>
      </div>
      <div className="post-container">
        {postList &&
          postList.length > 0 &&
          postList.map((post: PostContentInterface) => (
            <MarkdownView
              key={post.id}
              markdown={replaceSlidersWithDivs(post.content)}
              options={{ tables: true, emoji: true }}
            />
          ))}
      </div>
    </div>
  );
}

