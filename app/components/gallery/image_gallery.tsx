"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const supabase = createClientComponentClient();

interface ImageData {
  id: number;
  src: string;
  title: string;
  description: string;
  likes: number;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [model, setModel] = useState(false);
  const [tempSrc, setTempSrc] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [tempLikes, setTempLikes] = useState(0);
  const [galleryColumns, setGalleryColumns] = useState(3);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          .from('Upload')
          .select('id, secure_url, title, likes');

        if (error) {
          throw error;
        }

        const formattedData = data.map((item: { id: number; secure_url: string; title: string; likes: number }) => ({
          id: item.id,
          src: item.secure_url,
          title: item.title,
          description: item.title,
          likes: item.likes || 0
        }));

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

  const getImg = (src: string, description: string, likes: number) => {
    setTempSrc(src);
    setTempDescription(description);
    setTempLikes(likes);
    setModel(true);
  };

  const handleClose = () => {
    setModel(false);
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

  const handleLikeClick = async (event: React.MouseEvent<SVGElement, MouseEvent>, id: number) => {
    event.stopPropagation();

    if (!isLoggedIn) {
      alert("You must be logged in to like an image.");
      return;
    }

    const imageToLike = images.find(image => image.id === id);
    if (!imageToLike) return;

    let updatedLikes = imageToLike.likes;
    let newLikedImages = new Set(likedImages);

    if (likedImages.has(id)) {
      // Unlike the image
      updatedLikes -= 1;
      newLikedImages.delete(id);
    } else {
      // Like the image
      updatedLikes += 1;
      newLikedImages.add(id);
    }

    const { error } = await supabase
      .from('Upload')
      .update({ likes: updatedLikes })
      .eq('id', id);

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
    localStorage.setItem("likedImages", JSON.stringify(Array.from(newLikedImages)));
  };

  return (
    <>
      <div>
        <div
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
            backgroundColor: "#333",
            transition:
              "opacity 0.4s ease, visibility 0.4s ease, transform 0.5s ease-in-out",
            visibility: model ? "visible" : "hidden",
            opacity: model ? 1 : 0,
            transform: model ? "scale(1)" : "scale(0)",
            overflow: "auto",
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
          <img
            src={tempSrc}
            alt="enlarged"
            style={{
              width: "auto",
              maxWidth: "100%",
              maxHeight: "calc(100vh - 80px)",
              display: "block",
              boxSizing: "border-box",
              padding: "40px 0 20px",
              margin: "0 auto",
            }}
          />
          <p>{tempDescription}</p>
          <p>Likes: {tempLikes}</p>
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
              onClick={() => getImg(image.src, image.description, image.likes)}
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
                className={`absolute top-2 left-2 w-8 h-8 cursor-pointer ${
                  likedImages.has(image.id) ? 'text-red-500' : 'text-white'
                }`}
              />
              <Image
                src={image.src}
                alt={image.title}
                width={500}
                height={700}
                className="w-full h-full cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
