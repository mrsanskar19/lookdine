import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, Edit, Trash2, TrendingUp, Users, Calendar, DollarSign, 
  Eye, Star, Clock, ChefHat, Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  preparationTime: number;
  dietary?: string[];
}

interface HotelStats {
  totalViews: number;
  totalBookings: number;
  revenue: number;
  averageRating: number;
  todayViews: number;
  todayBookings: number;
  monthlyRevenue: number;
  activeMenuItems: number;
}

export default function HotelDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [stats, setStats] = useState<HotelStats>({
    totalViews: 0,
    totalBookings: 0,
    revenue: 0,
    averageRating: 0,
    todayViews: 0,
    todayBookings: 0,
    monthlyRevenue: 0,
    activeMenuItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'appetizer',
    preparationTime: '',
    dietary: [] as string[]
  });

  const categories = [
    { value: 'appetizer', label: 'Appetizers' },
    { value: 'main', label: 'Main Course' },
    { value: 'dessert', label: 'Desserts' },
    { value: 'beverage', label: 'Beverages' },
    { value: 'special', label: 'Specials' }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher'
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data for demonstration
      setMenuItems([
        {
          id: '1',
          name: 'Caesar Salad',
          description: 'Fresh romaine lettuce with parmesan cheese and croutons',
          price: 12.99,
          category: 'appetizer',
          available: true,
          preparationTime: 15,
          dietary: ['Vegetarian', 'Gluten-Free']
        },
        {
          id: '2',
          name: 'Grilled Salmon',
          description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables',
          price: 28.99,
          category: 'main',
          available: true,
          preparationTime: 25
        },
        {
          id: '3',
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
          price: 8.99,
          category: 'dessert',
          available: true,
          preparationTime: 10,
          dietary: ['Vegetarian']
        }
      ]);

      setStats({
        totalViews: 15420,
        totalBookings: 892,
        revenue: 45680,
        averageRating: 4.6,
        todayViews: 234,
        todayBookings: 12,
        monthlyRevenue: 12450,
        activeMenuItems: 24
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async () => {
    try {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        preparationTime: parseInt(formData.preparationTime),
        dietary: formData.dietary,
        available: true
      };

      setMenuItems(prev => [...prev, newItem]);
      setStats(prev => ({ ...prev, activeMenuItems: prev.activeMenuItems + 1 }));
      
      setIsAddDialogOpen(false);
      resetForm();
      
      toast({
        title: "Menu Item Added",
        description: `${newItem.name} has been added to your menu`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add menu item"
      });
    }
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      preparationTime: item.preparationTime.toString(),
      dietary: item.dietary || []
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateMenuItem = async () => {
    if (!editingItem) return;

    try {
      const updatedItem: MenuItem = {
        ...editingItem,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        preparationTime: parseInt(formData.preparationTime),
        dietary: formData.dietary
      };

      setMenuItems(prev => prev.map(item => item.id === editingItem.id ? updatedItem : item));
      
      setIsAddDialogOpen(false);
      setEditingItem(null);
      resetForm();
      
      toast({
        title: "Menu Item Updated",
        description: `${updatedItem.name} has been updated`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update menu item"
      });
    }
  };

  const handleDeleteMenuItem = async (itemId: string) => {
    try {
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
      setStats(prev => ({ ...prev, activeMenuItems: prev.activeMenuItems - 1 }));
      
      toast({
        title: "Menu Item Deleted",
        description: "Item has been removed from your menu"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete menu item"
      });
    }
  };

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'appetizer',
      preparationTime: '',
      dietary: []
    });
    setEditingItem(null);
  };

  if (loading) {
    return (
      <AppLayout title="Hotel Dashboard">
        <div className="space-y-6">
          <div className="h-8 w-48 animate-pulse bg-muted rounded"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 animate-pulse bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Hotel Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.todayViews} today
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.todayBookings} today
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ${stats.monthlyRevenue.toLocaleString()} this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">
                ⭐ {stats.averageRating}/5.0
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Menu Management
                </CardTitle>
                <CardDescription>
                  Manage your restaurant's menu items ({stats.activeMenuItems} active)
                </CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingItem ? 'Update the details of your menu item.' : 'Add a new item to your restaurant menu.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the item"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="prepTime">Prep Time (min)</Label>
                        <Input
                          id="prepTime"
                          type="number"
                          value={formData.preparationTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, preparationTime: e.target.value }))}
                          placeholder="15"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={editingItem ? handleUpdateMenuItem : handleAddMenuItem}>
                      {editingItem ? 'Update' : 'Add'} Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant={item.available ? "default" : "secondary"}>
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                      <Badge variant="outline">{categories.find(c => c.value === item.category)?.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm font-medium">${item.price}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.preparationTime} min
                      </span>
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex gap-1">
                          {item.dietary.slice(0, 2).map(diet => (
                            <Badge key={diet} variant="outline" className="text-xs">
                              {diet}
                            </Badge>
                          ))}
                          {item.dietary.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.dietary.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleItemAvailability(item.id)}
                    >
                      {item.available ? 'Hide' : 'Show'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditMenuItem(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMenuItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
