"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Modal } from "@/components/ui/modal"
import { ArrowLeft, Star, Clock, Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

const restaurantData = {
  1: {
    name: "Spice Garden",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.5,
    deliveryTime: "25-30 min",
    description: "Authentic Indian cuisine with aromatic spices",
  },
}

const menuData = {
  1: {
    Starters: [
      {
        id: 1,
        name: "Samosa",
        description: "Crispy pastry filled with spiced potatoes and peas",
        price: 120,
        image: "/placeholder.svg?height=100&width=100",
        ingredients: ["Potatoes", "Peas", "Spices", "Pastry"],
      },
      {
        id: 2,
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with aromatic spices",
        price: 280,
        image: "/placeholder.svg?height=100&width=100",
        ingredients: ["Paneer", "Bell Peppers", "Onions", "Spices"],
      },
    ],
    "Main Course": [
      {
        id: 3,
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken",
        price: 350,
        image: "/placeholder.svg?height=100&width=100",
        ingredients: ["Chicken", "Tomatoes", "Cream", "Spices"],
      },
      {
        id: 4,
        name: "Dal Makhani",
        description: "Rich and creamy black lentil curry",
        price: 250,
        image: "/placeholder.svg?height=100&width=100",
        ingredients: ["Black Lentils", "Cream", "Butter", "Spices"],
      },
    ],
    Desserts: [
      {
        id: 5,
        name: "Gulab Jamun",
        description: "Sweet milk dumplings in sugar syrup",
        price: 150,
        image: "/placeholder.svg?height=100&width=100",
        ingredients: ["Milk Powder", "Sugar", "Cardamom", "Rose Water"],
      },
    ],
  },
}

export default function RestaurantMenuPage() {
  const params = useParams()
  const restaurantId = Number.parseInt(params.id as string)
  const [selectedDish, setSelectedDish] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]
  const menu = menuData[restaurantId as keyof typeof menuData]

  if (!restaurant || !menu) {
    return <div>Restaurant not found</div>
  }

  const addToCart = (dish: any, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === dish.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item)))
    } else {
      setCart([...cart, { ...dish, quantity }])
    }
    setSelectedDish(null)
  }

  const updateQuantity = (dishId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [dishId]: Math.max(0, (prev[dishId] || 0) + change),
    }))
  }

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

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
            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>
        </div>
      </header>

      {/* Restaurant Info */}
      <div className="bg-white">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="w-full md:w-80 h-48 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container py-6">
        {/* Menu Categories */}
        {Object.entries(menu).map(([category, dishes]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
            <div className="grid gap-4">
              {dishes.map((dish: any) => (
                <Card key={dish.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                        onClick={() => setSelectedDish(dish)}
                      />
                      <div className="flex-1">
                        <h4
                          className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-orange-600"
                          onClick={() => setSelectedDish(dish)}
                        >
                          {dish.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                        <p className="font-semibold text-orange-600">₹{dish.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {quantities[dish.id] > 0 ? (
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(dish.id, -1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{quantities[dish.id]}</span>
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(dish.id, 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button size="sm" onClick={() => addToCart(dish, quantities[dish.id])}>
                              Add
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => {
                              updateQuantity(dish.id, 1)
                              addToCart(dish, 1)
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Cart Button */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-4 right-4">
          <Link href="/checkout">
            <Button size="lg" className="rounded-full shadow-lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({cartItemsCount})
            </Button>
          </Link>
        </div>
      )}

      {/* Dish Modal */}
      <Modal isOpen={!!selectedDish} onClose={() => setSelectedDish(null)}>
        {selectedDish && (
          <div className="p-6">
            <img
              src={selectedDish.image || "/placeholder.svg"}
              alt={selectedDish.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedDish.name}</h3>
            <p className="text-gray-600 mb-4">{selectedDish.description}</p>
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDish.ingredients.map((ingredient: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-orange-600">₹{selectedDish.price}</span>
              <Button onClick={() => addToCart(selectedDish)}>Add to Cart</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
