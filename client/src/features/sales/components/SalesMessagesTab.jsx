import { useState } from 'react';
import {
  Search,
  Send,
  Phone,
} from 'lucide-react';

const SALES_CHATS = [
  {
    id: 1,
    client: 'Ayesha Khan',
    phone: '+92 300 1234567',
    avatar: 'AK',
    topic: 'Order #ORD-1042 Delivery Confirmation',
    time: '11:15 AM',
    messages: [
      { sender: 'sales', text: 'Hello Ayesha! This is Ali Raza from GLOME. I am calling to confirm your address for Order #ORD-1042.', time: '11:10 AM' },
      { sender: 'client', text: 'Hi Ali! Yes, B-14 Gulberg III is correct. Will it arrive before 6 PM?', time: '11:12 AM' },
      { sender: 'sales', text: 'Yes, our dispatch rider has marked it for priority afternoon delivery!', time: '11:15 AM' },
    ],
  },
  {
    id: 2,
    client: 'Usman Ali',
    phone: '+92 301 9876543',
    avatar: 'UA',
    topic: 'Shoe sizing advice on Sneakers',
    time: '10:04 AM',
    messages: [
      { sender: 'client', text: 'Hi Ali, should I go true to size on the Minimalist White Sneakers?', time: '09:50 AM' },
      { sender: 'sales', text: 'They run true to size. If you normally wear 42 in European sizing, 42 will fit comfortably.', time: '10:04 AM' },
    ],
  },
];

export default function SalesMessagesTab() {
  const [chats, setChats] = useState(SALES_CHATS);
  const [activeChatId, setActiveChatId] = useState(1);
  const [reply, setReply] = useState('');
  const [search, setSearch] = useState('');

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    const newMsg = {
      sender: 'sales',
      text: reply.trim(),
      time: 'Just now',
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, newMsg] } : c
      )
    );
    setReply('');
  };

  const handleQuickTemplate = (txt) => {
    setReply(txt);
  };

  const filteredChats = chats.filter(
    (c) =>
      c.client.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">
          Client Messaging & Order Verification
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Chat directly with customers to verify delivery locations, answer size questions, and provide courier updates.
        </p>
      </div>

      {/* 2-Pane Chat */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
        {/* Left Pane (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-gray-100 flex flex-col bg-[#fcfdfd]">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filteredChats.map((c) => {
              const isSelected = c.id === activeChatId;
              const last = c.messages[c.messages.length - 1];

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveChatId(c.id)}
                  className={`w-full text-left p-4 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected ? 'bg-emerald-50/60 border-l-4 border-[#0b3b2c]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-[#0b3b2c] flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-xs text-[#14211d] truncate">{c.client}</span>
                      <span className="text-xs text-gray-400 shrink-0">{c.time}</span>
                    </div>
                    <div className="font-medium text-xs text-[#0b3b2c] truncate">{c.topic}</div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{last?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane (8 cols) */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between bg-white">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfd]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0b3b2c] text-white flex items-center justify-center font-extrabold text-xs">
                {activeChat.avatar}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#14211d]">{activeChat.client}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Phone className="h-3 w-3 text-emerald-600" />
                  <span>{activeChat.phone}</span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${activeChat.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-emerald-50 text-[#0b3b2c] font-bold text-xs hover:bg-[#0b3b2c] hover:text-white transition-all cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call Client</span>
            </a>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/40">
            {activeChat.messages.map((m, idx) => {
              const isSales = m.sender === 'sales';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isSales ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 text-xs shadow-2xs leading-relaxed ${
                      isSales
                        ? 'bg-[#0b3b2c] text-white rounded-br-xs'
                        : 'bg-white text-[#14211d] border border-gray-100 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-3 bg-white">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-gray-400 font-bold shrink-0">Templates:</span>
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    'Your order has been verified and will be delivered today before 6 PM.'
                  )
                }
                className="px-2.5 py-1 min-h-[44px] rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#0b3b2c] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Order Confirmed
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickTemplate(
                    'We have verified size availability in the warehouse. Size 42 is in stock.'
                  )
                }
                className="px-2.5 py-1 min-h-[44px] rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#0b3b2c] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Size Available
              </button>
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type message to client..."
                className="flex-1 rounded-xl border border-gray-200 py-2.5 px-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0b3b2c] text-white px-5 py-2.5 min-h-[44px] text-xs font-bold hover:bg-[#124e3b] transition-all cursor-pointer shadow-md shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
