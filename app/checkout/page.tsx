"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock cart data - in real app, this would come from state management
const initialCartItems = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 350,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    price: 280,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Gulab Jamun",
    price: 150,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 40
  const taxes = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + deliveryFee + taxes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="container py-6 max-w-2xl">
        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link href="/dashboard">
                <Button>Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-orange-600 font-semibold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bill Details */}
            <Card>
              <CardHeader>
                <CardTitle>Bill Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Charges</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">₹{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proceed Button */}
            <Link href="/payment">
              <Button className="w-full" size="lg">
                Proceed to Payment (₹{total})
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
