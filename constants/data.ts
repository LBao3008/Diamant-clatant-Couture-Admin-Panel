import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Order = {
  _id: number;
  user: string; // assuming ObjectId is stored as a string
  cart: object[];
  name: string;
  address: string;
  email: string;
  contact: string;
  city: string;
  country: string;
  zipCode: string;
  subTotal: number;
  shippingCost: number;
  discount: number;
  totalAmount: number;
  shippingOption?: string;
  cardInfo?: object;
  paymentIntent?: object;
  paymentMethod: string;
  orderNote?: string;
  invoice: number;
  status?: string; // add the possible status values as a union type if needed
  saleStaff?: {
    id: string;
    name: string;
  };
  deliveryStaff?: {
    id: string;
    name: string;
  };
  orderStatusHistory?: {
    statusName: string;
    staff_id: string;
    note: string;
    updateDate: Date;
  }[];
  productCertificateInformation?: {
    certificateId: string;
    certificateUrl: string;
  }[];
  warrantyInformation?: {
    warrantyId: string;
    title: string;
    customerName: string;
    dateOfPurchase: string;
    service: string;
    warrantyPeriod: string;
    warrantyDescription: string;
    companyName: string;
    phoneNumber: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type Price = {
  _id: number;
  // other order fields
};

export type SideStone = {
  _id: number;
  name: string;
  currentBuyPrice: number;
  currentSellPrice: number;
  currentEffectDate: string;
  currentUpdateDate: string;
  priceHistory: {
    buyPrice: number;
    sellPrice: number;
    date: string;
  }[];
};

export type MainDiamond = {
  _id: number;
  origin: string;
  caratWeight: number;
  cut: string;
  color: string;
  clarity: string;
  currentBuyPrice: number;
  currentSellPrice: number;
  currentEffectDate: string;
};

export type PriceHistory = {
  buyPrice: number;
  sellPrice: number;
  effectDate: string;
  date: string;
};

export type Density = {
  value: number;
  unit: string;
};

export type Material = {
  _id: string;
  name: string;
  density: Density;
  priceUnit: string;
  DiamondShells: string[]; // Assuming DiamondShells are referenced by their IDs
  currentBuyPrice: number;
  currentSellPrice: number;
  currentEffectDate: string;
  currentUpdateDate: string;
  priceHistory: PriceHistory[];
};

export type Product = {
  _id: number;
  sku: string;
  img: string;
  title: string;
  slug: string;
  unit: string;
  parent: string;
  children: string;
  price: number;
  discount: number;
  quantity: number;
  brand: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
  status: string;
  mainDiamond: {
    origin: string;
    caratWeight: number;
    cut: string;
    color: string;
    clarity: string;
    price: number;
  };
  diamondShell: {
    size: string;
    material: string;
    price: number;
  };
  sideStone: {
    sideStoneName: string;
    sideStoneAmount: number;
    sideStonePrice: number;
    totalPrice: number;
  };
  processingFee: number;
  markupRate: number;
  classificationAttributes: {
    type: string;
    attributes: {
      key: string;
      value: string[];
    }[];
  }[];
  productSpecifications: {
    type: string;
    sets: {
      set_id: string;
      set_values: {
        key: string;
        value: string;
      }[];
      set_price: number;
    }[];
  }[];
  productVariants: {
    productVariantAttributes: {
      type: string;
      set: {
        set_id: string;
        set_values: {
          key: string;
          value: string;
        }[];
        set_price: number;
      };
    }[];
    subTotalPrice: number;
    variantProcessingFee: number;
    variantMarkupRate: number;
    finalPrice: number;
    quantity: number;
    variantWarrantyPeriod: string;
  }[];
  warrantyPeriod: string;
  lowestPrice: number;
  highestPrice: number;
  reviews: string[];
  productType: string;
  description: string;
  videoId: string;
  additionalInformation: {
    key: string;
    value: string;
  }[];
  tags: string[];
  sizes: string[];
  offerDate: {
    startDate: string;
    endDate: string;
  };
  featured: boolean;
  sellCount: number;
  createdAt: string;
  updatedAt: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Order',
    href: '/dashboard/order',
    //icon: 'order',
    label: 'order'
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    //icon: 'product',
    label: 'product'
  },
  {
    title: 'Material',
    href: '/dashboard/material',
    //icon: 'customer',
    label: 'material'
  },
  {
    title: 'Main diamond',
    href: '/dashboard/main-diamond',
    //icon: 'customer',
    label: 'main-diamond'
  },
  {
    title: 'Side stone',
    href: '/dashboard/side-stone',
    //icon: 'customer',
    label: 'side-stone'
  },
  {
    title: 'Price table',
    href: '/dashboard/price-table',
    //icon: 'customer',
    label: 'price-table'
  },
  {
    title: 'Inventory',
    href: '/dashboard/inventory',
    //icon: 'customer',
    label: 'inventory'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Employee',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
