'use client';

import { useState } from 'react';
import { MaterialTab, MainDiamondTab, SideStoneTab } from '@/components/tabs';

type PricePageContentProps = {
  materialData: any[];
  mainDiamondData: any[];
  sideStoneData: any[];
  totalItems: number;
  pageCount: number;
};

export default function PricePageContent({
  materialData,
  mainDiamondData,
  sideStoneData,
  totalItems,
  pageCount
}: PricePageContentProps) {
  const [selectedTab, setSelectedTab] = useState('material');
  const handleTabChange = (tab: string) => setSelectedTab(tab);

  return (
    <div className="flex flex-col space-y-4">
      {/* Removed the search input here */}
      <div className="flex space-x-4">
        <button
          className={`p-2 ${
            selectedTab === 'material' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => handleTabChange('material')}
        >
          Material
        </button>
        <button
          className={`p-2 ${
            selectedTab === 'mainDiamond' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => handleTabChange('mainDiamond')}
        >
          Main Diamond
        </button>
        <button
          className={`p-2 ${
            selectedTab === 'sideStone' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => handleTabChange('sideStone')}
        >
          Side Stone
        </button>
      </div>
      {selectedTab === 'material' && <MaterialTab data={materialData} />}
      {selectedTab === 'mainDiamond' && (
        <MainDiamondTab data={mainDiamondData} />
      )}
      {selectedTab === 'sideStone' && <SideStoneTab data={sideStoneData} />}
    </div>
  );
}
