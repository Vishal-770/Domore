import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Plus,
  Calendar,
  Target,
  TrendingUp,
  Settings,
} from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your tasks today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <UserAvatar user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+5 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">-1 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Productivity
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today&apos;s Tasks</CardTitle>
                    <CardDescription>
                      You have 6 tasks scheduled for today
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sample Tasks */}
                <div className="flex items-center space-x-3 p-3 rounded-lg border">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium line-through text-muted-foreground">
                      Review quarterly reports
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Completed at 9:30 AM
                    </p>
                  </div>
                  <Badge variant="secondary">High</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border">
                  <div className="h-5 w-5 rounded-full border-2 border-primary"></div>
                  <div className="flex-1">
                    <p className="font-medium">Prepare presentation slides</p>
                    <p className="text-sm text-muted-foreground">
                      Due at 2:00 PM
                    </p>
                  </div>
                  <Badge variant="destructive">Urgent</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border">
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
                  <div className="flex-1">
                    <p className="font-medium">Team standup meeting</p>
                    <p className="text-sm text-muted-foreground">
                      3:00 PM - 3:30 PM
                    </p>
                  </div>
                  <Badge variant="outline">Meeting</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border">
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
                  <div className="flex-1">
                    <p className="font-medium">Code review for new feature</p>
                    <p className="text-sm text-muted-foreground">
                      Due tomorrow
                    </p>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Set Goal
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <p className="font-medium">Task completed</p>
                  <p className="text-muted-foreground">
                    Review quarterly reports
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">New task added</p>
                  <p className="text-muted-foreground">
                    Prepare presentation slides
                  </p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Deadline updated</p>
                  <p className="text-muted-foreground">
                    Project milestone review
                  </p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
