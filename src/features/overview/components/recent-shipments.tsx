import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  description: string;
  category: string;
  photoUrl: string;
}

interface OrderItem {
  product: Product;
}

interface Shipment {
  orderItems: OrderItem[];
}

interface RecentShipmentsProps {
  recentShipments: Shipment[];
}

export function RecentShipments({ recentShipments }: RecentShipmentsProps) {
  return (
    <div className="space-y-8">
      {recentShipments.map((shipment, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={shipment.orderItems[0].product.photoUrl}
              alt={shipment.orderItems[0].product.name}
            />
            <AvatarFallback>
              {shipment.orderItems[0].product.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {shipment.orderItems[0].product.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {shipment.orderItems[0].product.description}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm">
            +${shipment.orderItems[0].product.price.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
