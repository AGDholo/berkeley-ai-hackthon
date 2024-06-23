import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button} from "@/components/ui/button.tsx";
import {Apple, Code2, CornerDownLeft} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@radix-ui/react-dropdown-menu";
import {Badge} from "@/components/ui/badge.tsx";
import {Input} from "@/components/ui/input.tsx";
import {CircularProgress, LinearProgress} from "@mui/joy";
import NutritionInfo from "@/components/nutritionInfo.tsx";
import Markdown from "react-markdown";
import {Chart} from "@/components/Chart.tsx";
import SearchList from "@/components/SearchList"; // 假设你的 SearchList 组件位于这个路径

type FileUploadEvent = ChangeEvent<HTMLInputElement>;
type TextInputEvent = ChangeEvent<HTMLInputElement>;

type Message = {
    type: "user" | "api" | "component" | "search";
    content?: string;
    componentData?: any;
};

function App() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const [componentData, setComponentData] = useState<any>(null);
    const [image, setImage] = useState<string>("0");
    const [imageType, setImageType] = useState<string>("");

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        breakfast: "",
        lunch: "",
        dinner: "",
        others: "",
    });

    // 新增状态用于重置文件输入
    const [fileInputKey, setFileInputKey] = useState<number>(0);

    const handleInputChange = (event: TextInputEvent): void => {
        const {id, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleFileChange = (event: FileUploadEvent): void => {
        const fileInputId = event.target.id;
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData((prevData) => ({
                    ...prevData,
                    [fileInputId]: base64String,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = (event: FileUploadEvent): void => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String.split(",")[1]);
                setImageType(base64String.split(",")[0] + ",");
                // 成功处理后重置文件输入
                setFileInputKey((prevKey) => prevKey + 1);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                type: "user",
                content: `Name: ${formData.name}, Age: ${formData.age}, Height: ${formData.height}, Weight: ${formData.weight}`,
            },
        ]);

        setLoading(true);

        axios
            .post(
                "http://127.0.0.1:8000/todaymeal/",
                {
                    name: formData.name,
                    age: formData.age,
                    height: formData.height,
                    weight: formData.weight,
                    breakfast: formData.breakfast,
                    lunch: formData.lunch,
                    dinner: formData.dinner,
                    others: "N/A",
                    breakfast_annotations: "N/A",
                    lunch_annotations: "N/A",
                    dinner_annotations: "N/A",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setComponentData(response.data);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        type: "component",
                        content: response.data,
                        componentData: response.data,
                    },
                ]);
            })
            .catch((error) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        type: "api",
                        content: error.message,
                    },
                ]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleMessageSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim() === "") return;

        const userMessage: Message = {type: "user", content: message};
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setMessage("");

        setLoading(true);
        setIsError(false);

        try {
            const historyMessages = messages
                .map((msg) => {
                    if (msg.type === "component" && msg.componentData) {
                        return JSON.stringify(msg.componentData);
                    }
                    return msg.content || "";
                })
                .join(" ");

            const response = await axios.post("http://127.0.0.1:8000/chat/", {
                information: historyMessages,
                message: message.toString(),
                image: image,
                image_type: 'image/jpeg',
            });

            let chatResponse = response.data.chat_response.chat_response;
            const searchResponse = response.data.chat_response.search;

            if (Array.isArray(chatResponse)) {
                if (chatResponse.length === 1) {
                    chatResponse = chatResponse[0]?.text;
                } else {
                    console.warn("Unexpected array length for chatResponse:", chatResponse);
                    chatResponse = chatResponse.join(' ');
                }
            }

            if (typeof chatResponse !== "string") {
                console.error("chatResponse is not a string or a single-element array:", chatResponse);
                chatResponse = String(chatResponse);
            }

            const newMessages = [...messages];
            if (searchResponse) {
                newMessages.push({type: "search", content: searchResponse});
            } else {
                newMessages.push({type: "api", content: chatResponse});
            }

            setMessages(newMessages);
        } catch (error) {
            console.error("Error sending message:", error);

            setIsError(true);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    type: "api",
                    content: "Error sending message. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
            setImage("0");
            setImageType("");
        }
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <div className="grid h-screen w-full pl-[56px]">
                <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                    <div className="border-b p-2">
                        <Button variant="outline"
                                size="icon"
                                aria-label="Home">
                            <img src={"/logo.png"}
                                 className="size-5 fill-foreground"/>
                        </Button>
                    </div>
                    <nav className="grid gap-1 p-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost"
                                            size="icon"
                                            className="rounded-lg"
                                            aria-label="API">
                                        <Code2 className="size-5"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right"
                                                sideOffset={5}>
                                    Github
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                    <nav className="mt-auto grid gap-1 p-2">
                        <Button variant="ghost"
                                size="icon"
                                className="mt-auto rounded-lg"
                                aria-label="Account">
                            <Apple className="size-5"/>
                        </Button>
                    </nav>
                </aside>
                <div className="flex flex-col">
                    <header className="bg-white sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                        <h1 className="text-xl font-semibold">Golden Groceries</h1>
                        <Button variant="outline"
                                size="sm"
                                className="ml-auto gap-1.5 text-sm">
                            <Apple className="size-3.5"/>
                            Health
                        </Button>
                    </header>
                    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className={`relative flex-col items-start gap-8   ${messages && messages.length > 0 ? "hidden" : "flex"}`}
                             x-chunk="dashboard-03-chunk-0">
                            <form className="grid w-full items-start gap-6">
                                <fieldset className={`grid gap-6 rounded-lg border p-4`}>
                                    <legend className="-ml-1 px-1 text-sm font-medium">Intake</legend>
                                    <div className="grid gap-1">
                                        <Label>Name</Label>
                                        <Input id="name"
                                               type="text"
                                               onChange={handleInputChange}/>
                                    </div>

                                    <div className="grid gap-1">
                                        <Label>Age</Label>
                                        <Input id="age"
                                               type="number"
                                               onChange={handleInputChange}/>
                                    </div>
                                    <div className="grid gap-1">
                                        <Label>Height(M)</Label>
                                        <Input id="height"
                                               type="number"
                                               onChange={handleInputChange}/>
                                    </div>
                                    <div className="grid gap-1">
                                        <Label>Weight(KG)</Label>
                                        <Input id="weight"
                                               type="number"
                                               onChange={handleInputChange}/>
                                    </div>

                                    <div className="grid gap-1">
                                        <Label>Breakfast</Label>
                                        <Input id="breakfast"
                                               type="file"
                                               key={fileInputKey}
                                               onChange={handleFileChange}/>
                                    </div>
                                    <div className="grid gap-1">
                                        <Label>Lunch</Label>
                                        <Input id="lunch"
                                               type="file"
                                               key={fileInputKey}
                                               onChange={handleFileChange}/>
                                    </div>
                                    <div className="grid gap-1">
                                        <Label>Dinner</Label>
                                        <Input id="dinner"
                                               type="file"
                                               key={fileInputKey}
                                               onChange={handleFileChange}/>
                                    </div>

                                    <div className="grid gap-1">
                                        <Label>others</Label>
                                        <Input id="others"
                                               type="text"
                                               onChange={handleInputChange}/>
                                    </div>

                                    <Button type="button"
                                            onClick={handleSubmit}
                                            className="ml-auto gap-1.5">
                                        Submit
                                    </Button>
                                </fieldset>
                            </form>
                        </div>
                        <div className={`flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 ${messages && messages.length > 0 ? "lg:col-span-1" : "lg:col-span-2"}`}>
                            <Badge variant="outline"
                                   className="absolute right-3 top-3 bg-white">
                                Output
                            </Badge>
                            <div className="flex-1 max-h-[100vh] overflow-y-auto ">
                                <div className="chat-history pt-10 space-y-8">
                                    {messages.map((msg, index) => (
                                        <div key={index}
                                             className={`message ${msg.type} flex`}>
                                            {msg.type === "component" ? (
                                                <div className={`border pb-4 px-4 rounded-3xl`}>
                                                    <NutritionInfo data={msg.componentData}/>
                                                </div>
                                            ) : msg.type === "search" ? (
                                                <SearchList search={msg.content || ''}/>
                                            ) : (
                                                msg?.content && (
                                                    <div className={`border p-4 rounded-3xl ${msg.type === "user" && "ml-auto"}`}>
                                                        <Markdown>{msg.content}</Markdown>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messageEndRef}></div>
                                </div>
                                {isError || loading ? (
                                    <div className={"max-w-sm border p-4 rounded-3xl"}>
                                        {loading && (
                                            <>
                                                AI Generating... <LinearProgress/>
                                            </>
                                        )}

                                        {isError && <div className="text-red-500">Error sending message</div>}
                                    </div>
                                ) : null}
                            </div>
                            <form onSubmit={handleMessageSubmit}
                                  className="mt-5 relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                                <Label className="sr-only">Message</Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                                />
                                <div className="flex items-center p-3 pt-0">
                                    <Input id="image-upload"
                                           type="file"
                                           accept="image/*"
                                           key={fileInputKey}
                                           onChange={handleImageUpload}/>
                                    <Button type="submit"
                                            size="sm"
                                            disabled={loading}
                                            className={`ml-auto gap-1.5 ${loading && "cursor-not-allowed"}`}>
                                        {loading ? (
                                            <>
                                                <CircularProgress color="neutral"
                                                                  size="sm"/>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <CornerDownLeft className="size-3.5"/>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className={`${messages && messages.length > 0 ? "lg:col-span-2" : "hidden"}`}>
                            <Chart/>

                            {componentData && (
                                <div className={`border pb-4 px-4 rounded-3xl`}>
                                    <NutritionInfo
                                        data={{
                                            showBars: true,
                                            nutrition_needing: componentData.nutrition_needing,
                                            meal_nutrition: componentData.meal_nutrition,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
