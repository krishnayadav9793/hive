import React, { useState } from 'react';
import { Building2, User, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

function HostelRegistration() {
  const [formData, setFormData] = useState({
    hostelName: '',
    address: '',
    ownerName: '',
    ownerContact: '',
    managerName: '',
    managerContact: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset after showing success
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header Section */}
        <div className="bg-slate-900 px-8 py-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-slate-800 rounded-full opacity-50 blur-xl"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-indigo-400" />
              Hostel Registration
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Register a new property in the system.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section: Property Details */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                Property Details
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="hostelName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Hostel Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      id="hostelName"
                      name="hostelName"
                      required
                      value={formData.hostelName}
                      onChange={handleChange}
                      placeholder="e.g. Sunrise Student Living"
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none text-slate-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, City, Zip Code"
                      className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Personnel */}
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                Management Details
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                
                {/* Owner Info */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Owner Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        required
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ownerContact" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Owner's Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        id="ownerContact"
                        name="ownerContact"
                        required
                        value={formData.ownerContact}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Manager Info */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="managerName" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Manager Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        id="managerName"
                        name="managerName"
                        value={formData.managerName}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="managerContact" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Manager Contact
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        id="managerContact"
                        name="managerContact"
                        value={formData.managerContact}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full flex items-center justify-center gap-2 h-11 rounded-md text-sm font-medium text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
                  ${submitted ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'}
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : submitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Registration Complete
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Register Hostel <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                By clicking register, you agree to our terms of service and data policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HostelRegistration;