import React from 'react';
import { Material } from '@/constants/data';

type MaterialEditFormProps = {
  material: Material;
};

export const MaterialEditForm: React.FC<MaterialEditFormProps> = ({
  material
}) => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" defaultValue={material.name} />
      </div>
      <div>
        <label htmlFor="density">Density:</label>
        <input
          id="density"
          name="density"
          type="text"
          defaultValue={material.density.value}
        />
      </div>
      <div>
        <label htmlFor="priceUnit">Price Unit:</label>
        <input
          id="priceUnit"
          name="priceUnit"
          type="text"
          defaultValue={material.priceUnit}
        />
      </div>
      <div>
        <label htmlFor="diamondShells">Diamond Shells:</label>
        <input
          id="diamondShells"
          name="diamondShells"
          type="text"
          defaultValue={material.DiamondShells.join(', ')}
        />
      </div>
      <div>
        <label htmlFor="currentBuyPrice">Current Buy Price:</label>
        <input
          id="currentBuyPrice"
          name="currentBuyPrice"
          type="number"
          defaultValue={material.currentBuyPrice}
        />
      </div>
      <div>
        <label htmlFor="currentSellPrice">Current Sell Price:</label>
        <input
          id="currentSellPrice"
          name="currentSellPrice"
          type="number"
          defaultValue={material.currentSellPrice}
        />
      </div>
      <div>
        <label htmlFor="currentEffectDate">Current Effect Date:</label>
        <input
          id="currentEffectDate"
          name="currentEffectDate"
          type="date"
          defaultValue={material.currentEffectDate}
        />
      </div>
      <div>
        <label htmlFor="currentUpdateDate">Current Update Date:</label>
        <input
          id="currentUpdateDate"
          name="currentUpdateDate"
          type="date"
          defaultValue={material.currentUpdateDate}
        />
      </div>
      <div>
        <label htmlFor="priceHistory">Price History:</label>
        <textarea
          id="priceHistory"
          name="priceHistory"
          defaultValue={JSON.stringify(material.priceHistory, null, 2)}
        />
      </div>
      <button type="submit">Update Material</button>
    </form>
  );
};
