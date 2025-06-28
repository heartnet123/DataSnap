import React, { useState } from 'react';
import { parseData, getAgeCounts, getFruitCounts, getLocationCounts, getCriteriaCounts, getPriceCounts, getEatenWithCounts, getTimeCounts, getShopLocationCounts, translateAge, rawData } from '../utils/dataParser';
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
        <section className="mb-8 bg-gradient-to-r from-pink-200 to-orange-200 rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">FruitInsight Dashboard</h1>
            <p className="text-gray-600 text-lg">แดชบอร์ดวิเคราะห์พฤติกรรมการบริโภคผลไม้ในประเทศไทย</p>
          </div>
          <img src="https://cdn.pixabay.com/photo/2017/01/20/15/06/fruit-1995056_1280.png" alt="Fruit" className="w-24 h-24 object-contain rounded-full border-4 border-white shadow-md bg-white" />
        </section>
        {filter && (
          <div className="mb-6">
            <button
              onClick={() => setFilter(null)}
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-semibold ring-2 ring-orange-300 hover:ring-pink-400 focus:outline-none"
            >
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3"/>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                ล้างตัวกรองอายุ: {translateAge(filter)}
              </span>
            </button>
          </div>
        )}
        
        <div className="mb-8">
          <SummaryCards data={data} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:ring-2 hover:ring-pink-300 hover:scale-[1.03] transition-all duration-300 min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">สัดส่วนช่วงอายุ</h2>
            <AgeChart data={ageCounts} onAgeClick={handleAgeClick} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:ring-2 hover:ring-pink-300 hover:scale-[1.03] transition-all duration-300 min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">ผลไม้ยอดนิยม 10 อันดับแรก</h2>
            <FruitPreferenceChart data={filteredFruitCounts} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:ring-2 hover:ring-pink-300 hover:scale-[1.03] transition-all duration-300 min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">สถานที่ซื้อผลไม้</h2>
            <PurchaseLocationChart data={filteredLocationCounts} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:ring-2 hover:ring-pink-300 hover:scale-[1.03] transition-all duration-300 min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">เกณฑ์การเลือกซื้อ</h2>
            <SelectionCriteriaChart data={filteredCriteriaCounts} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:ring-2 hover:ring-pink-300 hover:scale-[1.03] transition-all duration-300 min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">ช่วงราคาที่คาดหวัง</h2>
            <PriceChart data={filteredPriceCounts} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:ring-2 hover:ring-pink-300 hover:scale-[1.03] transition-all duration-300 min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">นิยมรับประทานร่วมกับ</h2>
            <EatenWithChart data={filteredEatenWithCounts} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:ring-2 hover:ring-pink-300 hover:scale-[1.03] transition-all duration-300 min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">เวลาที่นิยมบริโภค</h2>
            <TimeChart data={filteredTimeCounts} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow min-h-[300px]">
<h2 className="text-xl font-semibold mb-4 text-gray-800">สถานที่ร้านค้าที่นิยม</h2>
            <ShopLocationChart data={filteredShopLocationCounts} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gradient-to-r from-pink-100 to-orange-100 py-8 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-700 text-base flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-4.03-9-9 0-2.21 1.79-4 4-4 .34 0 .67.04 1 .12C8.33 5.16 10.07 3 12 3c1.93 0 3.67 2.16 4 5.12.33-.08.66-.12 1-.12 2.21 0 4 1.79 4 4 0 4.97-4.03 9-9 9z"/>
            </svg>
            <span className="font-bold">FruitInsight Dashboard</span>
          </div>
          <p>ข้อมูลเก็บรวบรวม มิถุนายน 2025 • วิเคราะห์พฤติกรรมการบริโภคผลไม้ในประเทศไทย</p>
          <p className="text-sm text-gray-500">A comprehensive analysis of fruit consumption habits</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
