import { useState } from 'react';
import {
  Search,
  Phone,
} from 'lucide-react';

const SALES_CLIENTS = [
  {
    id: 1,
    name: 'Ayesha Khan',
    phone: '+92 300 1234567',
    email: 'ayesha.k@example.com',
    city: 'Lahore, Gulberg III',
    orders: 14,
    preferredSize: 'Shoe 41 / Dress M',
    notes: 'Prefers dark tones. Always call before 2 PM.',
    avatar: 'AK',
  },
  {
    id: 2,
    name: 'Usman Ali',
    phone: '+92 301 9876543',
    email: 'usman.ali@example.com',
    city: 'Islamabad, F-7',
    orders: 8,
    preferredSize: 'Sneaker 42 / Shirt L',
    notes: 'Regular buyer of white minimalist sneakers.',
    avatar: 'UA',
  },
  {
    id: 3,
    name: 'Sara Malik',
    phone: '+92 302 4567890',
    email: 'sara.malik@example.com',
    city: 'Karachi, DHA',
    orders: 21,
    preferredSize: 'Handbags & Accessories',
    notes: 'VIP customer. Prefers expedited air courier delivery.',
    avatar: 'SM',
  },
  {
    id: 4,
    name: 'Bilal Ahmed',
    phone: '+92 305 6677889',
    email: 'bilal.ahmed@example.com',
    city: 'Lahore, Model Town',
    orders: 5,
    preferredSize: 'Blazer 40R / Shoe 43',
    notes: 'Prefers formal tailored menswear.',
    avatar: 'BA',
  },
];

export default function SalesCustomersTab() {
  const [clients] = useState(SALES_CLIENTS);
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">Assigned Client Directory</h2>
        <p className="text-xs text-gray-500 mt-1">
          Direct client contact info, sizing preferences, order histories, and sales notes.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, city, or phone..."
            className="w-full rounded-xl border border-gray-200 bg-[#f9fafb] py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-[#14211d] placeholder-gray-400 focus:border-[#0b3b2c] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="rounded-3xl bg-white border border-gray-200/80 p-5 shadow-2xs space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-[#0b3b2c] flex items-center justify-center font-extrabold text-xs">
                    {client.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#14211d]">{client.name}</h4>
                    <p className="text-xs text-gray-400">{client.city}</p>
                  </div>
                </div>

                <a
                  href={`tel:${client.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-xl bg-emerald-50 text-[#0b3b2c] font-bold text-xs hover:bg-emerald-100 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call</span>
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">Preferred Sizing:</span>
                  <span className="font-bold text-gray-800">{client.preferredSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-semibold">Total Orders:</span>
                  <span className="font-bold text-[#0b3b2c]">{client.orders} orders</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-xs text-amber-900">
                <span className="font-bold">Sales Note:</span> {client.notes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
