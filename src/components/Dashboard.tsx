import React, { useState } from 'react';
import { parseData, getAgeCounts, getFruitCounts, getLocationCounts, getCriteriaCounts, getPriceCounts, getEatenWithCounts, getTimeCounts, getShopLocationCounts, translateAge, translateFruit, translateLocation, translateCriteria, translateEatenWith, translateTime, translateShopLocation, fruitColors, rawData } from '../utils/dataParser';
import Header from './Header';
import AgeChart from './charts/AgeChart';
import FruitPreferenceChart from './charts/FruitPreferenceChart';
import PurchaseLocationChart from './charts/PurchaseLocationChart';
import SelectionCriteriaChart from './charts/SelectionCriteriaChart';
import PriceChart from './charts/PriceChart';
import EatenWithChart from './charts/EatenWithChart';
import TimeChart from './charts/TimeChart';
import ShopLocationChart from './charts/ShopLocationChart';
import SummaryCards from './SummaryCards';

const Dashboard: React.FC = () => {
  const [data] = useState(parseData(rawData));
  const [filter, setFilter] = useState<string | null>(null);
  
  const ageCounts = getAgeCounts(data);
  const fruitCounts = getFruitCounts(data);
  const locationCounts = getLocationCounts(data);
  const criteriaCounts = getCriteriaCounts(data);
  const priceCounts = getPriceCounts(data);
  const eatenWithCounts = getEatenWithCounts(data);
  const timeCounts = getTimeCounts(data);
  const shopLocationCounts = getShopLocationCounts(data);
  
  const handleAgeClick = (age: string | null) => {
    setFilter(age);
  };
  
  const filteredData = filter 
    ? data.filter(item => item.age === filter)
    : data;
  
  const filteredFruitCounts = filter
    ? getFruitCounts(filteredData)
    : fruitCounts;
    
  const filteredLocationCounts = filter
    ? getLocationCounts(filteredData)
    : locationCounts;
    
  const filteredCriteriaCounts = filter
    ? getCriteriaCounts(filteredData)
    : criteriaCounts;
    
  const filteredPriceCounts = filter
    ? getPriceCounts(filteredData)
    : priceCounts;
    
  const filteredEatenWithCounts = filter
    ? getEatenWithCounts(filteredData)
    : eatenWithCounts;
    
  const filteredTimeCounts = filter
    ? getTimeCounts(filteredData)
    : timeCounts;
    
  const filteredShopLocationCounts = filter
    ? getShopLocationCounts(filteredData)
    : shopLocationCounts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {filter && (
          <div className="mb-6">
            <button
              onClick={() => setFilter(null)}
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span>Clear Age Filter: {translateAge(filter)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        
        <div className="mb-8">
          <SummaryCards data={data} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Age Distribution</h2>
            <AgeChart data={ageCounts} onAgeClick={handleAgeClick} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Top 10 Favorite Fruits</h2>
            <FruitPreferenceChart data={filteredFruitCounts} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Purchase Locations</h2>
            <PurchaseLocationChart data={filteredLocationCounts} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Selection Criteria</h2>
            <SelectionCriteriaChart data={filteredCriteriaCounts} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Expected Price Range</h2>
            <PriceChart data={filteredPriceCounts} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Eaten With</h2>
            <EatenWithChart data={filteredEatenWithCounts} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Preferred Time</h2>
            <TimeChart data={filteredTimeCounts} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Preferred Shop Locations</h2>
            <ShopLocationChart data={filteredShopLocationCounts} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>FruitInsight Dashboard • Data collected June 2025</p>
          <p className="mt-2">A comprehensive analysis of fruit consumption habits</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
