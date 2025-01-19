import React, {createContext, useContext, useEffect, useState, ReactNode} from "react";
import {Pin} from "@mui/icons-material";

const API_BASE_URL = import.meta.env.VITE_BASE || 'http://localhost:8080';

type Pin = {
    story_id?: string; // Optional for newly created pins
    position: [number, number];
    text?: string;
    title?: string;
    likes?: number;
    user_id?: number;
};

interface PinContextType {
    pins: Pin[];
    addPin: (pin: Omit<Pin, "story_id" | "likes" | "user_id">) => Promise<void>;
    updatePins: (pins: Array<Pin>, latLng: [number, number]) => Promise<void>;
    fetchPin: (storyId: string) => Promise<void >;
    likePin: (storyId: string) => Promise<void>;
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export const PinProvider = ({children}: { children: ReactNode }) => {
    const [pins, setPins] = useState<Pin[]>([]);

    const fetchPins = async (pins: Array<Pin>, latLng: [number, number]) => {

        const response = await fetch(`${API_BASE_URL}/api/story/stories?longitude=${latLng[0]}&latitude=${latLng[1]}&radius=10`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        const responseBody = await response.json()
        const fetchedPins = responseBody.map((story, index)=>{
            return {
                story_id: story.storyId,
                position: [story.latitude, story.longitude],
                likes: story.likes,
            }
        });
        console.log(fetchedPins)
        setPins((prevPins) => {
            const newPins = fetchedPins.filter((fetchedPin)=> !prevPins.find((oldPin)=> oldPin.story_id === fetchedPin.story_id))

            return [...prevPins, ...newPins]
        });
    }

    const fetchPin = async (storyId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/story/${storyId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.status === 404) {
                console.warn(`Pin with story_id: ${storyId} does not exist.`);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch pin");
            }

            const body = await response.json();
            console.log("Raw API Response for fetched pin:", body);

            const existingPin = pins.find((pin) => pin.story_id === storyId);
            if (!existingPin) {
                console.error(`No existing position for story_id: ${storyId}`);
                return;
            }

            const updatedPin = {
                story_id: body.story_id,
                position: existingPin.position,
                text: body.text || "",
                title: body.title || "Untitled",
                likes: Number(body.likes) || 0,
                user_id: Number(body.user_id) || 0,
            };

            setPins((prevPins) =>
                prevPins.map((pin) =>
                    pin.story_id === storyId ? updatedPin : pin
                )
            );

            console.log("Updated Pin:", updatedPin);
            return updatedPin;
        } catch (error) {
            console.error("Failed to fetch pin:", error);
        }

    };

    const addPin = async (newPin: Omit<Pin, "story_id" | "likes" | "user_id">) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/story`, {
                method: "POST",
                headers: {
                    "content-type":"application/json;charset=UTF-8"
                },
                body: JSON.stringify({
                    text: newPin.text,
                    title: newPin.title,
                    latitude: newPin.position[0],
                    longitude: newPin.position[1],
                })
            })

            let body = await response.json()
            const createdPin = {
                story_id: body.story_id,
                position: [body.latitude, body.longitude],
                text: body.text,
                title: body.title,
                likes: body.likes,
                user_id: body.user_id,
            };
            setPins((prevPins) => [...prevPins, createdPin]);
        } catch (error) {
            console.error("Failed to add pin:", error);
        }
    };
    const likePin = async (storyId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/story/like/${storyId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const newLikes = data.likes;
                setPins((prevPins) =>
                    prevPins.map((pin) =>
                        pin.story_id === storyId
                            ? {
                                ...pin,
                                likes: newLikes,
                            }
                            : pin
                    )
                );
                console.log(`Pin ${storyId} liked. New likes = ${newLikes}`);
            } else if (response.status === 404) {
                // If the server says the story doesn't exist
                console.error("That story doesn't exist");
            } else {
                console.error("Failed to like story, status code:", response.status);
            }
        } catch (error) {
            console.error("Network error while liking story:", error);
        }
    };



    return (
        <PinContext.Provider value={{pins, addPin, updatePins: fetchPins, fetchPin, likePin}}>
            {children}
        </PinContext.Provider>
    );
};

export const usePins = () => {
    const context = useContext(PinContext);
    if (!context) {
        throw new Error("usePins must be used within a PinProvider");
    }
    return context;
};
