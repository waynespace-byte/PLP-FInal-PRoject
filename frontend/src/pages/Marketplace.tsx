import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Search, ShoppingBag, ShoppingCart } from 'lucide-react';
import { MpesaPayment } from '@/components/MpesaPayment';
import { marketplaceAPI } from '@/services/api';  // Use updated api.ts
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  seller_name: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await marketplaceAPI.getProducts();  // Use api.ts export (matches backend /marketplace/products/)
      setProducts(response.data.results || response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: 'Purchase Successful',
      description: `You have successfully purchased ${selectedProduct?.name}`,
    });
    setSelectedProduct(null);
    setShowPayment(false);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
              <p className="text-muted-foreground">Buy quality farm inputs and equipment</p>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  {product.image_url && (
                    <div className="w-full h-48 bg-muted rounded-lg mb-4 overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-2xl font-bold text-primary">
                      KSH {product.price.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">Seller: {product.seller_name}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleBuyNow(product)} className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search</p>
          </div>
        )}
      </main>

      {selectedProduct && (
        <MpesaPayment
          open={showPayment}
          onClose={() => setShowPayment(false)}
          amount={selectedProduct.price}
          purpose={`Purchase: ${selectedProduct.name}`}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Marketplace;