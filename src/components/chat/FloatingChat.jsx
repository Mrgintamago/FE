import React, { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { key } from "../../utils/constants/key";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FloatingChat = () => {
  const { current } = useSelector((state) => state.user);
  const tokenStream = localStorage.getItem("tokenStream");
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!current || !tokenStream) return;

    async function init() {
      try {
        const chatClient = StreamChat.getInstance(key.REACT_APP_STREAM_API_KEY);
        const user = {
          name: current?.name,
          image: current?.avatar,
          id: current?._id,
        };
        
        await chatClient.connectUser(user, tokenStream);
        
        // Tạo hoặc lấy channel với admin
        const adminId = "6370de3a54ea3d5abac936d7"; // ID admin mặc định
        const channelId = `messaging-${current._id}-${adminId}`;
        const newChannel = chatClient.channel("messaging", channelId, {
          members: [adminId, current._id],
        });
        await newChannel.watch();
        
        setChannel(newChannel);
        setClient(chatClient);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Không thể kết nối chat. Vui lòng thử lại sau.");
      }
    }

    init();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [current, tokenStream]);

  if (!current) {
    return null; // Không hiển thị nếu chưa đăng nhập
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          title="Chat với chúng tôi"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && client && channel && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-semibold">Chat với chúng tôi</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Chat client={client} theme="messaging light">
              <Channel channel={channel}>
                <Window>
                  <MessageList />
                  <MessageInput />
                </Window>
              </Channel>
            </Chat>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;

