
import { useState } from "react";
import { Search, Plus, Home, Calendar, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom"

type MessageType = {
  id: string;
  sender: {
    name: string;
    role: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  isNew: boolean;
  isUrgent: boolean;
  isRead: boolean;
};

const messages: MessageType[] = [
  {
    id: "1",
    sender: {
      name: "Dr. Sarah",
      role: "Family Care",
      avatar: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=300",
    },
    message: "Your lab results are ready to view",
    timestamp: "2h ago",
    isNew: true,
    isUrgent: false,
    isRead: false,
  },
  {
    id: "2",
    sender: {
      name: "Nurse Johnson",
      role: "Care Coordinator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    },
    message: "How are you feeling today?",
    timestamp: "1d ago",
    isNew: false,
    isUrgent: false,
    isRead: true,
  },
  {
    id: "3",
    sender: {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300",
    },
    message: "Please schedule a follow-up",
    timestamp: "2d ago",
    isNew: false,
    isUrgent: true,
    isRead: true,
  },
];

type FilterType = "all" | "unread" | "urgent";

const Index = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const handleFilterClick = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !msg.isRead) ||
      (filter === "urgent" && msg.isUrgent);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-2xl mx-auto bg-[#E8E5DF] flex flex-col">
      {/* Header */}
      <div className="p-6 bg-[#FBF9F8] sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <button className="text-[#004852] hover:opacity-80 transition-opacity">
            <Plus size={24} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FF8D6E]/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex gap-3">
        {["all", "unread", "urgent"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => handleFilterClick(filterType as FilterType)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all",
              filter === filterType
                ? "bg-[#CBDDE0] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-6">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelectedChat(msg.id)}
            className="bg-white rounded-xl p-4 mb-3 cursor-pointer hover:shadow-md transition-all message-transition slide-in"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={msg.sender.avatar}
                  alt={msg.sender.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{msg.sender.name}</h3>
                    <p className="text-sm text-gray-500">{msg.sender.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{msg.timestamp}</span>
                    {msg.isNew && (
                      <span className="px-2 py-1 text-xs font-medium bg-[#CBDDE0] text-white rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
