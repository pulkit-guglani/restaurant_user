"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, CheckCircle, Truck, ChefHat, Package } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const orderStatuses = {
  placed: { label: "Order Placed", icon: Package, color: "text-blue-600 bg-blue-100" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-green-600 bg-green-100" },
  preparing: { label: "Preparing", icon: ChefHat, color: "text-orange-600 bg-orange-100" },
  out_for_delivery: { label: "Out for Delivery", icon: Truck, color: "text-purple-600 bg-purple-100" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-600 bg-green-100" },
}

const mockOrders = [
  {
    id: "ORD001",
    restaurantName: "Spice Garden",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: [
      { name: "Butter Chicken", quantity: 2, price: 350 },
      { name: "Paneer Tikka", quantity: 1, price: 280 },
      { name: "Gulab Jamun", quantity: 2, price: 150 },
    ],
    total: 1110,
    status: "delivered",
    orderDate: "2024-01-15T18:30:00Z",
    deliveryDate: "2024-01-15T19:15:00Z",
  },
  {
    id: "ORD002",
    restaurantName: "Pizza Palace",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 450 },
      { name: "Garlic Bread", quantity: 1, price: 180 },
    ],
    total: 670,
    status: "out_for_delivery",
    orderDate: "2024-01-16T19:45:00Z",
    estimatedDelivery: "2024-01-16T20:30:00Z",
  },
  {
    id: "ORD003",
    restaurantName: "Burger Barn",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: [
      { name: "Classic Burger", quantity: 2, price: 320 },
      { name: "French Fries", quantity: 1, price: 150 },
      { name: "Coke", quantity: 2, price: 80 },
    ],
    total: 950,
    status: "preparing",
    orderDate: "2024-01-16T20:15:00Z",
    estimatedDelivery: "2024-01-16T21:00:00Z",
  },
  {
    id: "ORD004",
    restaurantName: "Sushi Zen",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: [
      { name: "California Roll", quantity: 2, price: 420 },
      { name: "Miso Soup", quantity: 1, price: 180 },
    ],
    total: 1020,
    status: "confirmed",
    orderDate: "2024-01-16T20:45:00Z",
    estimatedDelivery: "2024-01-16T21:30:00Z",
  },
]

export default function OrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    if (selectedFilter === "all") return true
    return order.status === selectedFilter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusInfo = (status: keyof typeof orderStatuses) => {
    return orderStatuses[status] || orderStatuses.placed
  }

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
            <h1 className="text-xl font-semibold">My Orders</h1>
          </div>
        </div>
      </header>

      <main className="container py-6 max-w-4xl">
        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: "all", label: "All Orders" },
              { key: "preparing", label: "Active" },
              { key: "delivered", label: "Delivered" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedFilter === filter.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No orders found</p>
                <Link href="/dashboard">
                  <Button>Start Ordering</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status as keyof typeof orderStatuses)
              const StatusIcon = statusInfo.icon

              return (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.restaurantImage || "/placeholder.svg"}
                          alt={order.restaurantName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <CardTitle className="text-lg">{order.restaurantName}</CardTitle>
                          <p className="text-sm text-gray-600">Order #{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">₹{order.total}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Order Items */}
                    <div className="mb-4">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="text-gray-900">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Ordered: {formatDate(order.orderDate)}</span>
                        </div>
                        {order.status === "delivered" && order.deliveryDate ? (
                          <span className="text-green-600 font-medium">
                            Delivered: {formatDate(order.deliveryDate)}
                          </span>
                        ) : order.estimatedDelivery ? (
                          <span className="text-orange-600 font-medium">
                            ETA: {formatDate(order.estimatedDelivery)}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      {order.status === "delivered" && (
                        <>
                          <Button variant="outline" size="sm">
                            Rate Order
                          </Button>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </>
                      )}
                      {(order.status === "preparing" || order.status === "out_for_delivery") && (
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}
