"use client";

import { useState, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { chatConversations } from '@/data/mockData';
import { 
  Send, Paperclip, MoreVertical, ChevronLeft, 
  Trash2, Eraser, Info, Edit3, Reply, CheckCheck 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedConversation = chatConversations.find((c) => c.id === selectedChat);

  // --- UI Components ---

  const MessageBubble = ({ text, isSender, time }: { text: string, isSender: boolean, time: string }) => (
    <div className={cn("flex flex-col mb-4 group", isSender ? "items-end" : "items-start")}>
      <div className="relative flex items-center gap-2 max-w-[85%]">
        {/* Hover Actions */}
        <div className={cn(
          "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background/80 backdrop-blur shadow-sm border rounded-full p-1 z-10",
          isSender ? "-left-16" : "-right-16"
        )}>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => toast.info("Replying...")}>
            <Reply size={12} />
          </Button>
          {isSender && (
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => toast.info("Edit mode active")}>
              <Edit3 size={12} />
            </Button>
          )}
        </div>

        <div className={cn(
          "p-3 rounded-2xl text-sm font-medium shadow-sm transition-all active:scale-[0.99]",
          isSender 
            ? "bg-primary text-primary-foreground rounded-br-none" 
            : "bg-muted text-foreground rounded-bl-none"
        )}>
          {text}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1 px-1">
        <span className="text-[10px] text-muted-foreground uppercase">{time}</span>
        {isSender && <CheckCheck size={12} className="text-primary" />}
      </div>
    </div>
  );

  if (!selectedChat) {
    return (
      <AppLayout title="Messages">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl text-[12px] font-bold text-primary">
            <Info size={16} />
            <span>History clears at 12 AM (except 6 pinned chats)</span>
          </div>
          {/* List mapping same as before... */}
          {chatConversations.map(chat => (
            <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 cursor-pointer active:scale-95 transition-all">
               <img src={chat.avatar} className="h-12 w-12 rounded-full object-cover" alt="" />
               <div className="flex-1">
                  <div className="flex justify-between"><span className="font-bold text-sm">{chat.name}</span><span className="text-[10px] opacity-60">{chat.time}</span></div>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
               </div>
            </div>
          ))}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout 
      showHeader={false} 
      className="!p-0 !overflow-hidden max-h-screen h-screen "
    >
      {/* 🟢 Header with Negative Margin to fit AppLayout perfectly */}
      <div className="flex flex-col h-screen  overflow-hidden">
        <header className="flex items-center gap-3 p-4 border-b bg-background/95 backdrop-blur-md z-20">
          <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)} className="rounded-full">
            <ChevronLeft size={24} />
          </Button>
          <div className="flex flex-1 items-center gap-3">
            <div className="relative">
              <img src={selectedConversation?.avatar} className="h-10 w-10 rounded-full object-cover" alt="" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-none">{selectedConversation?.name}</h3>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Online</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical size={20} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onClick={() => toast.info("History cleared")}><Eraser className="mr-2 h-4 w-4" /> Clear Chat</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => setSelectedChat(null)}><Trash2 className="mr-2 h-4 w-4" /> Delete Chat</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* 🔵 Scrollable Chat Area */}
        <main className="flex-1 p-4 overflow-y-auto bg-muted/10">
          <MessageBubble text="Hey! Can I get more details about the venue?" isSender={false} time="2:10 PM" />
          <MessageBubble text="Sure! We have a rooftop area available for the date you selected." isSender={true} time="2:12 PM" />
          <MessageBubble text="Awesome, checking reviews now." isSender={false} time="2:15 PM" />
        </main>

        {/* 🟡 Floating Input Area */}
        <footer className="p-4 bg-background border-t">
          <div className="flex items-center gap-2 bg-muted/50 border border-border p-1.5 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <input type="file" ref={fileInputRef} className="hidden" onChange={() => toast.success("File attached")} />
            <Button variant="ghost" size="icon" className="rounded-full shrink-0" onClick={() => fileInputRef.current?.click()}>
              <Paperclip size={20} className="text-muted-foreground" />
            </Button>
            
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none text-sm outline-none px-2 min-w-0"
              onKeyDown={(e) => e.key === 'Enter' && message.trim() && toast.success("Sent!")}
            />
            
            <Button 
              disabled={!message.trim()}
              className="rounded-full h-10 w-10 p-0 bg-primary text-white shadow-lg active:scale-90 transition-transform shrink-0"
            >
              <Send size={18} />
            </Button>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
};

export default ChatPage;