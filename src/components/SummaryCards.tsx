import React from 'react';
import { getFruitCounts, getLocationCounts, getCriteriaCounts, translateFruit, translateLocation, translateCriteria } from '../utils/dataParser';

interface SummaryCardsProps {
  data: any[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const fruitCounts = getFruitCounts(data);
  const locationCounts = getLocationCounts(data);
  const criteriaCounts = getCriteriaCounts(data);
  
  const topFruit = fruitCounts[0];
  const topLocation = locationCounts[0];
  const topCriteria = criteriaCounts[0];
  
  const cards = [
    {
      title: "Most Popular Fruit",
      value: translateFruit(topFruit.name),
      subtitle: `${topFruit.value} respondents`,
      color: "from-red-400 to-orange-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 6.5l3.8 3.8a1 1 0 0 1 0 1.4l-5.5 5.5a8 8 0 0 1-11.4-11.2l5.5-5.5a1 1 0 0 1 1.4 0l3.8 3.8a6 6 0 0 0 2.4 1.2z" />
          <path d="M4 14l2.5 2.5" />
          <path d="M7 17l2.5 2.5" />
          <path d="M10 10l2.5 2.5" />
          <path d="M13 13l2.5 2.5" />
        </svg>
      )
    },
    {
      title: "Popular Purchase Location",
      value: translateLocation(topLocation.name),
      subtitle: `${topLocation.value} respondents`,
      color: "from-blue-400 to-cyan-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    },
    {
      title: "Top Selection Criteria",
      value: translateCriteria(topCriteria.name),
      subtitle: `${topCriteria.value} respondents`,
      color: "from-violet-400 to-purple-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      title: "Average Expected Price",
      value: "฿30",
      subtitle: "per serving",
      color: "from-emerald-400 to-green-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
                <p className="text-gray-400 text-xs mt-1">{card.subtitle}</p>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
