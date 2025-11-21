import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Smartphone } from 'lucide-react';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface MpesaPaymentProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  purpose: string;
  onSuccess?: () => void;
}

export const MpesaPayment = ({ open, onClose, amount, purpose, onSuccess }: MpesaPaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);

  const handleInitiatePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid M-Pesa phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/payments/mpesa/initiate/', {
        phone_number: phoneNumber,
        amount: amount,
        description: purpose,
      });

      setCheckoutRequestId(response.data.checkout_request_id);
      
      toast({
        title: 'Payment Initiated',
        description: 'Please check your phone and enter your M-Pesa PIN',
      });

      // Start polling for payment status
      pollPaymentStatus(response.data.checkout_request_id);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to initiate payment',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (requestId: string) => {
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkStatus = async () => {
      try {
        const response = await api.get(`/payments/mpesa/status/${requestId}/`);
        
        if (response.data.status === 'completed') {
          toast({
            title: 'Payment Successful',
            description: 'Your payment has been processed successfully',
          });
          setLoading(false);
          onSuccess?.();
          onClose();
        } else if (response.data.status === 'failed') {
          toast({
            title: 'Payment Failed',
            description: response.data.message || 'Payment was not completed',
            variant: 'destructive',
          });
          setLoading(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 3000);
        } else {
          toast({
            title: 'Payment Timeout',
            description: 'Payment verification timed out. Please check your transaction history.',
            variant: 'destructive',
          });
          setLoading(false);
        }
      } catch (error) {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 3000);
        } else {
          setLoading(false);
        }
      }
    };
    
    checkStatus();
  };

  const handleClose = () => {
    if (!loading) {
      setPhoneNumber('');
      setCheckoutRequestId(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            M-Pesa Payment
          </DialogTitle>
          <DialogDescription>
            Pay KSH {amount.toLocaleString()} for {purpose}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Enter your Safaricom phone number
            </p>
          </div>

          {loading && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <div>
                  <p className="font-medium">Processing Payment...</p>
                  <p className="text-sm text-muted-foreground">
                    Check your phone and enter your M-Pesa PIN
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleInitiatePayment}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
