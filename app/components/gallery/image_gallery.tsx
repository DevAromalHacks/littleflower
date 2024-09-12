"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaperPlane,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import LoginPromptModal from "./LoginPromptModal";

const supabase = createClientComponentClient();

interface ImageData {
  id: number;
  src: string;
  title: string;
  description: string;
  likes: number;
  comments: string; // Add comments field
}
interface User {
  id: number;
  email: string;
  className: string;
  name: string;
  div: string;
}

const ImageGallery: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [model, setModel] = useState(false);
  const [tempSrc, setTempSrc] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [tempLikes, setTempLikes] = useState(0);
  const [tempImageId, setTempImageId] = useState<number | null>(null);
  const [galleryColumns, setGalleryColumns] = useState(3);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]); // For storing all comments

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("hasLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Upload")
          .select("id, secure_url, title, likes, comments");

        if (error) {
          throw error;
        }

        const formattedData = data.map(
          (item: {
            id: number;
            secure_url: string;
            title: string;
            likes: number;
            comments: string;
          }) => ({
            id: item.id,
            src: item.secure_url,
            title: item.title,
            description: item.title,
            likes: item.likes || 0,
            comments: item.comments || "",
          })
        );

        setImages(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const savedLikes = localStorage.getItem("likedImages");
    if (savedLikes) {
      setLikedImages(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  const getImg = (
    src: string,
    description: string,
    likes: number,
    id: number,
    existingComments: string
  ) => {
    setTempSrc(src);
    setTempDescription(description);
    setTempLikes(likes);
    setTempImageId(id);
    setComments(existingComments ? existingComments.split("|") : []);
    setModel(true);
  };

  const handleClose = () => {
    setModel(false);
    setComment(""); // Reset the comment box on close
  };

  const updateColumns = () => {
    if (window.innerWidth < 992 && window.innerWidth >= 481) {
      setGalleryColumns(2);
    } else if (window.innerWidth < 481) {
      setGalleryColumns(1);
    } else {
      setGalleryColumns(3);
    }
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const handleLikeClick = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();

    if (!isLoggedIn) {
      setLoginPromptOpen(true);
      return;
    }

    const imageToLike = images.find((image) => image.id === id);
    if (!imageToLike) return;

    let updatedLikes = imageToLike.likes;
    let newLikedImages = new Set(likedImages);

    if (likedImages.has(id)) {
      updatedLikes -= 1;
      newLikedImages.delete(id);
    } else {
      updatedLikes += 1;
      newLikedImages.add(id);
    }

    const { error } = await supabase
      .from("Upload")
      .update({ likes: updatedLikes })
      .eq("id", id);

    if (error) {
      console.error("Error updating likes:", error);
      return;
    }

    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id ? { ...image, likes: updatedLikes } : image
      )
    );

    setLikedImages(newLikedImages);
    localStorage.setItem(
      "likedImages",
      JSON.stringify(Array.from(newLikedImages))
    );
  };

  const handleShareClick = (event: React.MouseEvent, src: string) => {
    event.stopPropagation();

    if (navigator.share) {
      navigator.share({
        title: "Check out this image",
        url: src,
      });
    } else {
      navigator.clipboard.writeText(src);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      setLoginPromptOpen(true);
      return;
    }

    if (!tempImageId || !comment.trim()) return;

    const updatedComments = [...comments, comment];
    const commentString = updatedComments.join("|");

    const { error } = await supabase
      .from("Upload")
      .update({ comments: commentString })
      .eq("id", tempImageId);

    if (error) {
      console.error("Error submitting comment:", error);
      return;
    }

    setComments(updatedComments);
    setComment("");
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      const fetchUser = async () => {
        try {
          const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", userEmail)
            .single();

          if (error) throw error;
          setUser(userData);
        } catch (error) {
          console.log("error occurred", error);
        }
      };
      fetchUser();
    }
  }, [supabase]);

  return (
    <>
      <LoginPromptModal
        open={loginPromptOpen}
        handleClose={() => setLoginPromptOpen(false)}
      />
      <div>
        <div
          className="obsidean overflow-y-scroll"
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transition:
              "opacity 0.4s ease, visibility 0.4s ease, transform 0.5s ease-in-out",
            visibility: model ? "visible" : "hidden",
            opacity: model ? 1 : 0,
            transform: model ? "scale(1)" : "scale(0)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 999,
          }}
        >
          <button
            style={{ position: "absolute", top: "20px", right: "20px" }}
            onClick={handleClose}
          >
            <div className="cursor-pointer">
              <div className="w-8 h-1 bg-white rotate-45 translate-y-5"></div>
              <div className="w-8 h-1 bg-white -rotate-45 translate-y-4"></div>
            </div>
          </button>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <img
              src={tempSrc}
              alt="enlarged"
              style={{
                width: "auto",
                maxWidth: "100%",
                maxHeight: "calc(100vh - 80px)",
                display: "block",
                padding: "40px 0 20px",
                margin: "0 auto",
                boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
              }}
            />
            {/* Comment Section */}
            <div className="w-full lg:w-[400px] md:w-[400px] mt-10 obsidean rounded-lg shadow-lg h-[600px] flex flex-col">
              <header className="pt-4 px-6 border-b border-gray-300">
                <h2 className="text-2xl font-bold text-center pb-2">
                  Comments
                </h2>
              </header>
              <ul className="flex-1 overflow-auto bg-stone-950 px-6 py-4">
                {comments.map((comment, index) => (
                  <li key={index} className="mb-2 px-2 shadow-sm">
                    <span className="text-gray-300 font-bold">
                      {user?.name} :
                    </span>{" "}
                    <span className="text-white">{comment}</span>
                  </li>
                ))}
              </ul>
              {isLoggedIn ? (
                <div className="flex border-t border-gray-300">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-12 rounded-lg border-gray-300 bg-transparent pl-3 py-2 focus:outline-none pr-10"
                    placeholder="Add a comment..."
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="text-blue-600 relative -mr-4 right-8 flex items-center justify-center focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <p className="text-red-500 text-center mt-4">
                  Log in to add a comment.
                </p>
              )}
            </div>
          </div>
          <div className="px-10 mt-4">
            <p className="text-center text-white">{tempDescription}</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <FontAwesomeIcon
                icon={faHeart}
                className="w-8 h-8 text-red-500"
              />
              <p className="text-white">{tempLikes}</p>
              <FontAwesomeIcon
                icon={faShareAlt}
                className="w-8 h-8 text-white cursor-pointer"
                onClick={(e) => handleShareClick(e, tempSrc)}
              />
            </div>
            {showCopied && (
              <p className="text-center text-green-400 mt-2">Copied!</p>
            )}
          </div>
        </div>

        <div
          className="gallery"
          style={{
            padding: "0 12px",
            columnCount: galleryColumns,
            columnWidth: `${100 / galleryColumns}%`,
          }}
        >
          {images.map((image) => (
            <div
              className="media"
              key={image.id}
              onClick={() =>
                getImg(
                  image.src,
                  image.description,
                  image.likes,
                  image.id,
                  image.comments
                )
              }
              style={{
                transition: "all 350ms ease",
                cursor: "pointer",
                marginBottom: "12px",
                position: "relative",
              }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                onClick={(e) => handleLikeClick(e, image.id)}
                className={`absolute top-2 left-2 w-4 h-4 cursor-pointer ${
                  likedImages.has(image.id) ? "text-red-700" : "text-white"
                }`}
              />
              <Image
                src={image.src}
                alt={image.title}
                width={500}
                height={700}
                className="w-full h-full cursor-pointer hover:opacity-75 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
