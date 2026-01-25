import { useEffect, useState } from 'react';
import { getMenuByDate, subscribeToMenuUpdates } from '../../lib/supabase';
import MealCard from './MealCard';

export default function MessMenuDisplay() {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    
    useEffect(() => {
        loadMenu(selectedDate);
        
        // Real-time subscription
        const subscription = subscribeToMenuUpdates((payload) => {
            console.log('Menu updated:', payload);
            loadMenu(selectedDate);
        });
        
        return () => {
            subscription.unsubscribe();
        };
    }, [selectedDate]);
    
    async function loadMenu(date) {
        try {
            setLoading(true);
            const data = await getMenuByDate(date);
            setMenu(data);
        } catch (error) {
            console.error('Error loading menu:', error);
        } finally {
            setLoading(false);
        }
    }
    
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date().toDateString();
        const tomorrow = new Date(Date.now() + 86400000).toDateString();
        
        if (date.toDateString() === today) return "Today's Menu";
        if (date.toDateString() === tomorrow) return "Tomorrow's Menu";
        
        return date.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading menu...</p>
                </div>
            </div>
        );
    }
    
    if (!menu) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center shadow-lg">
                    <span className="text-6xl mb-4 block">🍽️</span>
                    <h3 className="text-2xl font-bold text-yellow-900 mb-2">
                        No Menu Available
                    </h3>
                    <p className="text-yellow-700 mb-4">
                        The mess menu for {formatDate(selectedDate)} hasn't been published yet.
                    </p>
                    <p className="text-sm text-yellow-600">
                        Please check back later or contact the mess admin.
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-4xl font-bold mb-2 text-gray-800">🍽️ Mess Menu</h1>
                    <p className="text-xl text-gray-600">{formatDate(selectedDate)}</p>
                </div>
                
                {/* Date Selector */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                {/* Special Notice */}
                {menu.special_note && (
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 rounded-lg p-5 mb-6 shadow-md">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">📢</span>
                            <div>
                                <h4 className="font-bold text-pink-900 mb-1 text-lg">Special Announcement</h4>
                                <p className="text-pink-800">{menu.special_note}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Holiday Notice */}
                {menu.is_holiday && (
                    <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 mb-6 text-center shadow-md">
                        <span className="text-6xl block mb-3">🏖️</span>
                        <p className="font-bold text-red-900 text-xl">Mess Closed - Holiday</p>
                        <p className="text-red-700 text-sm mt-2">Enjoy your day off!</p>
                    </div>
                )}
                
                {/* Meals Grid */}
                {!menu.is_holiday && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <MealCard mealType="breakfast" mealData={menu.breakfast} />
                        <MealCard mealType="lunch" mealData={menu.lunch} />
                        <MealCard mealType="snacks" mealData={menu.snacks} />
                        <MealCard mealType="dinner" mealData={menu.dinner} />
                    </div>
                )}
                
                {/* Footer */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <p className="text-sm text-gray-600">
                        Last updated: {new Date(menu.updated_at).toLocaleString('en-IN')}
                    </p>
                    {menu.version > 1 && (
                        <p className="text-xs text-blue-600 mt-1">
                            Version {menu.version} (Menu revised)
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}