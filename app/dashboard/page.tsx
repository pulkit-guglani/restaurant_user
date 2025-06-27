"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Star, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    image: "/placeholder.svg?height=200&width=300",
    description: "Authentic Indian cuisine with aromatic spices",
    rating: 4.5,
    deliveryTime: "25-30 min",
    cuisine: "Indian",
    distance: "1.2 km",
  },
  {
    id: 2,
    name: "Pizza Palace",
    image: "/placeholder.svg?height=200&width=300",
    description: "Wood-fired pizzas with fresh ingredients",
    rating: 4.3,
    deliveryTime: "20-25 min",
    cuisine: "Italian",
    distance: "0.8 km",
  },
  {
    id: 3,
    name: "Burger Barn",
    image: "/placeholder.svg?height=200&width=300",
    description: "Gourmet burgers and crispy fries",
    rating: 4.2,
    deliveryTime: "15-20 min",
    cuisine: "American",
    distance: "1.5 km",
  },
  {
    id: 4,
    name: "Sushi Zen",
    image: "/placeholder.svg?height=200&width=300",
    description: "Fresh sushi and Japanese delicacies",
    rating: 4.7,
    deliveryTime: "30-35 min",
    cuisine: "Japanese",
    distance: "2.1 km",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    image: "/placeholder.svg?height=200&width=300",
    description: "Authentic Mexican street food",
    rating: 4.4,
    deliveryTime: "20-25 min",
    cuisine: "Mexican",
    distance: "1.8 km",
  },
  {
    id: 6,
    name: "Noodle House",
    image: "/placeholder.svg?height=200&width=300",
    description: "Traditional Chinese noodles and dumplings",
    rating: 4.1,
    deliveryTime: "25-30 min",
    cuisine: "Chinese",
    distance: "1.3 km",
  },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">FoodieHub</h1>
            <div className="flex items-center space-x-4">
              <Link href="/orders">
                <Button variant="ghost" size="sm">
                  My Orders
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Delivering to Home</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{restaurant.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {restaurant.cuisine}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
