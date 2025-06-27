"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, Smartphone, Banknote, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay securely with your card",
  },
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    description: "Pay using UPI apps",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: Banknote,
    description: "Pay when your order arrives",
  },
]

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [upiId, setUpiId] = useState("")

  const handleCardChange = (field: string, value: string) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = () => {
    // Mock payment processing
    alert("Payment successful! Your order has been placed.")
  }

  const total = 1110 // Mock total from checkout

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container py-4">
          <div className="flex items-center space-x-4">
            <Link href="/checkout">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Payment</h1>
          </div>
        </div>
      </header>

      <main className="container py-6 max-w-2xl">
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethod === method.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <method.icon className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{method.name}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    {selectedMethod === method.id && <Check className="h-5 w-5 text-orange-500" />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Details */}
          {selectedMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => handleCardChange("number", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardChange("expiry", e.target.value)}
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardChange("cvv", e.target.value)}
                  />
                </div>
                <Input
                  label="Cardholder Name"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => handleCardChange("name", e.target.value)}
                />
              </CardContent>
            </Card>
          )}

          {selectedMethod === "upi" && (
            <Card>
              <CardHeader>
                <CardTitle>UPI Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  label="UPI ID"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </CardContent>
            </Card>
          )}

          {selectedMethod === "cod" && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-4">
                  <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-2">Cash on Delivery</h3>
                  <p className="text-gray-600">Pay ₹{total} when your order is delivered to your doorstep.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Total */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount</span>
                <span className="text-orange-600">₹{total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Pay Button */}
          <Button className="w-full" size="lg" onClick={handlePayment}>
            {selectedMethod === "cod" ? "Place Order" : `Pay ₹${total}`}
          </Button>
        </div>
      </main>
    </div>
  )
}
