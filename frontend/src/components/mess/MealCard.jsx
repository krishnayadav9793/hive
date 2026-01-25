import React from 'react';

const mealIcons = {
    breakfast: '🌅',
    lunch: '🍛',
    snacks: '☕',
    dinner: '🌙'
};

const mealColors = {
    breakfast: 'bg-orange-50 border-orange-300',
    lunch: 'bg-green-50 border-green-300',
    snacks: 'bg-purple-50 border-purple-300',
    dinner: 'bg-blue-50 border-blue-300'
};

export default function MealCard({ mealType, mealData }) {
    if (!mealData || !mealData.items || mealData.items.length === 0) {
        return null;
    }
    
    return (
        <div className={`border-2 rounded-lg p-4 ${mealColors[mealType]}`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{mealIcons[mealType]}</span>
                <div>
                    <h3 className="font-bold text-lg capitalize">{mealType}</h3>
                    <p className="text-xs text-gray-600">{mealData.time}</p>
                </div>
            </div>
            
            <ul className="space-y-1">
                {mealData.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-sm">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}