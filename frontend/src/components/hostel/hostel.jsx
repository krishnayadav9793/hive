import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  UserPlus, 
  Briefcase, 
  Utensils, 
  Plus, 
  Search, 
  Bell, 
  MoreVertical, 
  Home,
  ShieldCheck,
  Hammer,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---
const initialBuildings = [
  {
    id: 1,
    name: "Sunrise Block A",
    type: "Boys Hostel",
    occupancy: "85%",
    floors: [
      {
        level: 1,
        name: "Ground Floor",
        rooms: [
          { number: "101", status: "occupied", capacity: 3, filled: 3 },
          { number: "102", status: "partial", capacity: 3, filled: 1 },
          { number: "103", status: "vacant", capacity: 2, filled: 0 },
          { number: "104", status: "occupied", capacity: 2, filled: 2 },
          { number: "105", status: "maintenance", capacity: 2, filled: 0 },
        ]
      },
      {
        level: 2,
        name: "First Floor",
        rooms: [
          { number: "201", status: "occupied", capacity: 3, filled: 3 },
          { number: "202", status: "occupied", capacity: 3, filled: 3 },
          { number: "203", status: "vacant", capacity: 3, filled: 0 },
          { number: "204", status: "partial", capacity: 2, filled: 1 },
          { number: "205", status: "vacant", capacity: 2, filled: 0 },
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Moonlight Block B",
    type: "Girls Hostel",
    occupancy: "40%",
    floors: [
      {
        level: 1,
        name: "Ground Floor",
        rooms: [
          { number: "101", status: "occupied", capacity: 2, filled: 2 },
          { number: "102", status: "vacant", capacity: 2, filled: 0 },
          { number: "103", status: "vacant", capacity: 2, filled: 0 },
        ]
      },
       {
        level: 2,
        name: "First Floor",
        rooms: [
          { number: "201", status: "partial", capacity: 2, filled: 1 },
          { number: "202", status: "vacant", capacity: 2, filled: 0 },
          { number: "203", status: "vacant", capacity: 2, filled: 0 },
        ]
      }
    ]
  }
];

const initialComplaints = [
  { id: 1, room: "101", student: "Arjun Verma", issue: "Leaking tap in bathroom", priority: "high", time: "2h ago" },
  { id: 2, room: "205", student: "Karan Singh", issue: "Wi-Fi not connecting", priority: "medium", time: "5h ago" },
  { id: 3, room: "302", student: "Rohan Das", issue: "Window latch broken", priority: "low", time: "1d ago" },
  { id: 4, room: "104", student: "Vikram M.", issue: "Study chair broken", priority: "medium", time: "2d ago" },
];

// --- Sub-components ---

const ActionButton = ({ icon: Icon, label, colorClass = "bg-white text-slate-700 hover:bg-slate-50 border-slate-200" }) => (
  <button className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border shadow-sm transition-all ${colorClass}`}>
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const RoomBox = ({ room }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'bg-red-50 border-red-200 text-red-700';
      case 'partial': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'maintenance': return 'bg-slate-100 border-slate-200 text-slate-500';
      default: return 'bg-emerald-50 border-emerald-200 text-emerald-700'; // vacant
    }
  };

  return (
    <div className={`
      relative p-3 rounded-md border text-center cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md
      ${getStatusColor(room.status)}
    `}>
      <div className="font-bold text-sm">R-{room.number}</div>
      <div className="text-[10px] uppercase tracking-wider font-semibold mt-1 opacity-80">{room.status}</div>
      <div className="mt-2 flex justify-center gap-0.5">
        {[...Array(room.capacity)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full ${i < room.filled ? 'bg-current' : 'bg-current opacity-20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const BuildingCard = ({ building }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Building Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{building.name}</h3>
            <p className="text-xs text-slate-500">{building.type} • {building.occupancy} Full</p>
          </div>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-slate-600">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Floors & Rooms */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {building.floors.map((floor) => (
            <div key={floor.level} className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                {floor.name}
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {floor.rooms.map((room) => (
                  <RoomBox key={room.number} room={room} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ComplaintCard = ({ complaint }) => {
  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="group flex items-start gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shadow-sm">
          {complaint.room}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-semibold text-slate-900 truncate pr-2">{complaint.issue}</h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-2">Reported by {complaint.student}</p>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {complaint.time}
          </span>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

function HostelDashboard() {
  const [buildings] = useState(initialBuildings);
  const [complaints] = useState(initialComplaints);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-md">
              <Home className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">HostelOne</span>
          </div>

          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search rooms, students, or staff..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border-none rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-medium cursor-pointer">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Actions Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm">Overview of your properties and occupancy.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <ActionButton icon={UserPlus} label="Add Student" colorClass="bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-md shadow-indigo-200" />
            <ActionButton icon={Briefcase} label="Add Worker" />
            <ActionButton icon={ShieldCheck} label="Add Agency" />
            <ActionButton icon={Utensils} label="Food Menu" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Capacity', value: '450 Beds', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Current Occupancy', value: '342 Students', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Pending Requests', value: '12', icon: UserPlus, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Staff on Duty', value: '8 Active', icon: Hammer, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid: Buildings (Left) & Complaints (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Buildings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Building Overview</h2>
              <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                <Plus className="w-4 h-4" /> Add New Building
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {buildings.map(building => (
                <BuildingCard key={building.id} building={building} />
              ))}
              
              {/* Add Building Placeholder */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-12 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-slate-50/50 transition-all cursor-pointer group h-full min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                  <Plus className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg">Add New Building</h3>
                <p className="text-sm mt-1">Configure floors and rooms</p>
              </div>
            </div>
          </div>

          {/* Right Column: Unresolved Complaints */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Unresolved Issues
              </h2>
              <button className="text-sm text-slate-500 hover:text-slate-700">View All</button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="space-y-3">
                {complaints.map(complaint => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-indigo-600 font-medium border-t border-slate-100 transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> View Resolved History
              </button>
            </div>

            {/* Additional Widget (e.g. Notices) could go here */}
            <div className="bg-indigo-900 rounded-xl p-6 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
               <h3 className="font-bold text-lg mb-2 relative z-10">Staff Meeting</h3>
               <p className="text-indigo-200 text-sm mb-4 relative z-10">Monthly review meeting with all floor managers at 5:00 PM today.</p>
               <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors relative z-10">
                 View Details
               </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default HostelDashboard;