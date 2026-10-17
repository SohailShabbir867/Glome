import { useState } from 'react';
import {
  Search,
  Send,
  Phone,
} from 'lucide-react';

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    customer: 'Ayesha Khan',
    phone: '+92 300 1234567',
    avatar: 'AK',
    topic: 'Size Exchange on #ORD-1042',
    status: 'Active',
    unread: false,
    time: '10:24 AM',
    messages: [
      { sender: 'customer', text: 'Hi! I received the Classic Leather Loafers today, but size 41 is slightly tight on the heel.', time: '10:20 AM' },
      { sender: 'admin', text: 'Hello Ayesha! Thank you for reaching out to GLOME. We would be happy to exchange this for size 42 for you.', time: '10:22 AM' },
      { sender: 'customer', text: 'That would be wonderful! Do you have size 42 in stock right now?', time: '10:24 AM' },
    ],
  },
  {
    id: 2,
    customer: 'Usman Ali',
    phone: '+92 301 9876543',
    avatar: 'UA',
    topic: 'Order Tracking #ORD-1041',
    status: 'Unread',
    unread: true,
    time: '09:17 AM',
    messages: [
      { sender: 'customer', text: 'As-salamu alaykum, could you please provide the courier tracking ID for my order?', time: '09:17 AM' },
    ],
  },
  {
    id: 3,
    customer: 'Sara Malik',
    phone: '+92 302 4567890',
    avatar: 'SM',
    topic: 'Discount inquiry on Handbag',
    status: 'Replied',
    unread: false,
    time: 'Yesterday',
    messages: [
      { sender: 'customer', text: 'Is code GLOME20 applicable to the Italian Leather Handbag?', time: 'Yesterday' },
      { sender: 'admin', text: 'Yes, Sara! GLOME20 provides an instant 20% discount on all leather bags this weekend.', time: 'Yesterday' },
    ],
  },
  {
    id: 4,
    customer: 'Bilal Ahmed',
    phone: '+92 305 6677889',
    avatar: 'BA',
    topic: 'Sizing recommendation for Wool Blazer',
    status: 'Replied',
    unread: false,
    time: 'Oct 28',
    messages: [
      { sender: 'customer', text: 'I am 5ft 10in with a 38in chest. Should I choose 38R or 40R?', time: 'Oct 28' },
      { sender: 'admin', text: 'We recommend 38R for a modern tailored fit, or 40R if you prefer layering with sweaters.', time: 'Oct 28' },
    ],
  },
];

export default function AdminMessagesTab() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(1);
  const [replyText, setReplyText] = useState('');
  const [search, setSearch] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      sender: 'admin',
      text: replyText.trim(),
      time: 'Just now',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId ? { ...c, messages: [...c.messages, newMsg] } : c
      )
    );

    setReplyText('');
  };

  const handleQuickReply = (text) => {
    setReplyText(text);
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.customer.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">
          Contacts & Customer Communications
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Real-time inquiries, customer support desk, exchange communications, and dispatch notifications.
        </p>
      </div>

      {/* 2-Pane Chat Layout */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-2xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        {/* Left Pane: Conversation List (4 Cols) */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-gray-100 flex flex-col bg-[#fcfdfd]">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filteredConversations.map((c) => {
              const isSelected = c.id === activeConvId;
              const lastMsg = c.messages[c.messages.length - 1];

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveConvId(c.id)}
                  className={`w-full text-left p-4 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected ? 'bg-emerald-50/60 border-l-4 border-[#012D1D]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-[#012D1D] flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-xs text-[#14211d] truncate">{c.customer}</span>
                      <span className="text-xs text-gray-400 shrink-0">{c.time}</span>
                    </div>
                    <div className="font-medium text-xs text-[#012D1D] truncate">{c.topic}</div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{lastMsg?.text}</p>
                  </div>
                  {c.unread && (
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Live Chat Window (8 Cols) */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between bg-white">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfd]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#012D1D] text-white flex items-center justify-center font-extrabold text-xs">
                {activeConv.avatar}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#14211d]">{activeConv.customer}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Phone className="h-3 w-3 text-emerald-600" />
                  <span>{activeConv.phone}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{activeConv.topic}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${activeConv.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-emerald-50 text-[#012D1D] font-bold text-xs hover:bg-[#012D1D] hover:text-white transition-all cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Call Client</span>
              </a>
            </div>
          </div>

          {/* Chat Message Bubble History */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/40">
            {activeConv.messages.map((m, idx) => {
              const isAdminMsg = m.sender === 'admin';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isAdminMsg ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 text-xs shadow-2xs leading-relaxed ${
                      isAdminMsg
                        ? 'bg-[#012D1D] text-white rounded-br-xs'
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

          {/* Quick Replies & Input Bar */}
          <div className="p-4 border-t border-gray-100 space-y-3 bg-white">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-gray-400 font-bold shrink-0">Quick Templates:</span>
              <button
                type="button"
                onClick={() =>
                  handleQuickReply(
                    'Yes! We have size 42 in stock and our warehouse can dispatch it today.'
                  )
                }
                className="px-2.5 py-1 min-h-[44px] rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#012D1D] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Available in Stock
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickReply(
                    'Your order is packed and will be picked up by the courier this afternoon.'
                  )
                }
                className="px-2.5 py-1 min-h-[44px] rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#012D1D] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Courier Pick Up
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickReply(
                    'We have approved your size exchange request. A return label is being generated.'
                  )
                }
                className="px-2.5 py-1 min-h-[44px] rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#012D1D] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Exchange Approved
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response to the customer..."
                className="flex-1 rounded-xl border border-gray-200 py-2.5 px-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#012D1D] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#012D1D] text-white px-5 py-2.5 min-h-[44px] text-xs font-bold hover:bg-[#124e3b] transition-all cursor-pointer shadow-md shrink-0"
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
