import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

type Pin = {
    story_id?: string; // Optional for newly created pins
    position: [number, number];
    text: string;
    title: string;
    likes?: number;
    dislikes?: number;
    user_id?: number;
};

interface PinContextType {
    pins: Pin[];
    addPin: (pin: Omit<Pin, "story_id" | "likes" | "dislikes" | "user_id">) => Promise<void>;
    fetchPins: () => Promise<void>;
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export const PinProvider = ({ children }: { children: ReactNode }) => {
    const [pins, setPins] = useState<Pin[]>([]);

    const fetchPins = async () => {
        try {
            const response = await axios.get("/api/story/all"); // Adjust endpoint if necessary
            const fetchedPins = response.data.map((story: any) => ({
                story_id: story.story_id,
                position: [story.latitude, story.longitude],
                text: story.text,
                title: story.title,
                likes: story.likes,
                dislikes: story.dislikes,
                user_id: story.user_id,
            }));
            setPins(fetchedPins);
        } catch (error) {
            console.error("Failed to fetch pins:", error);
        }
    };

    const addPin = async (newPin: Omit<Pin, "story_id" | "likes" | "dislikes" | "user_id">) => {
        try {
            const response = await axios.post("/api/story", {
                text: newPin.text,
                title: newPin.title,
                latitude: newPin.position[0],
                longitude: newPin.position[1],
            });
            const createdPin = {
                story_id: response.data.story_id,
                position: [response.data.latitude, response.data.longitude],
                text: response.data.text,
                title: response.data.title,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
                user_id: response.data.user_id,
            };
            setPins((prevPins) => [...prevPins, createdPin]);
        } catch (error) {
            console.error("Failed to add pin:", error);
        }
    };

    useEffect(() => {
        fetchPins(); // Fetch pins on context initialization
    }, []);

    return (
        <PinContext.Provider value={{ pins, addPin, fetchPins }}>
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
