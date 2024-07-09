export interface BillboardProp {
  label: string;
  imageUrl: string;
  publicId: string;
  id: string;
  showDate: Date | string;
  endDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProductProp {
  id: string;
  title: string;
  imageUrl?: string;
  price: number;
  description: string;
  category: string[];
}
