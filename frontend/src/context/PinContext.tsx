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
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export const PinProvider = ({children}: { children: ReactNode }) => {
    const [pins, setPins] = useState<Pin[]>([]);

    const updatePins = async (pins: Array<Pin>, latLng: [number, number]) => {

        const response = await fetch(`${API_BASE_URL}/api/story/stories?longitude=${latLng[0]}&latitude=${latLng[1]}&radius=10`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        const responseBody = await response.json()
        const fetchedPins = responseBody.map((story, index)=>{
            return {
                story_id: story.story_id,
                position: [story.longitude, story.latitude],
                likes: story.likes,
            }
        });




        setPins((prevPins) => {
            const newPins = fetchedPins.filter((fetchedPin)=> !prevPins.find((oldPin)=> oldPin.story_id == fetchedPin.story_id))

            return [...prevPins, ...newPins]
        });
    }

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

    useEffect(() => {
    }, []);

    return (
        <PinContext.Provider value={{pins, addPin, updatePins}}>
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
