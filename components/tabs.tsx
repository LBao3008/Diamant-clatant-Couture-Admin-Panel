// components\tabs.tsx

import { PriceTable } from './tables/price-tables/price-table';
import {
  materialColumns,
  mainDiamondColumns,
  sideStoneColumns
} from './tables/price-tables/columns';

export const MaterialTab = ({ data }) => {
  return (
    <PriceTable
      columns={materialColumns}
      data={data}
      searchKey="search"
      pageNo={1}
      totalItems={data.length}
      pageCount={Math.ceil(data.length / 10)}
    />
  );
};

export const MainDiamondTab = ({ data }) => {
  return (
    <PriceTable
      columns={mainDiamondColumns}
      data={data}
      searchKey="search"
      pageNo={1}
      totalItems={data.length}
      pageCount={Math.ceil(data.length / 10)}
    />
  );
};

export const SideStoneTab = ({ data }) => {
  return (
    <PriceTable
      columns={sideStoneColumns}
      data={data}
      searchKey="search"
      pageNo={1}
      totalItems={data.length}
      pageCount={Math.ceil(data.length / 10)}
    />
  );
};
