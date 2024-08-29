import { useEffect, useState } from "react";
import { SectionInterface } from "../interface/SectionInterface";
import { PostContentInterface } from "../interface/PostCreatorInterface";
import { useNavigate } from "react-router-dom";
import Slider from "../components/slider";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
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

  const replaceSlidersWithDivs = (text: string): JSX.Element => {
    const contentRegex = /::slider\s*((?:\!\[\]\([^\)]+\)\s*)+)\s*::endslider/g;
    const contentArray = text.split(contentRegex);

    return (
      <React.Fragment>
        {contentArray.map((element, index) => {
          const imageRegex = /\!\[\]\(([^\)]+)\)/g;
          const images = element.match(imageRegex);
          if (images) {
            return <Slider key={index} urls={images.map((image) => image.replace(imageRegex, '$1'))} />;
          }
          return (
            <MDEditor.Markdown source={element}/>
          );
        })}
      </React.Fragment>
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
            replaceSlidersWithDivs(post.content)
          ))}
      </div>
    </div>
  );
}

