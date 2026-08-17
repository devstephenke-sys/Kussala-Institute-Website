import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "wouter";
import { api, getToken, removeToken } from "./services/api";

import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ArticlesManager from "./pages/ArticlesManager";
import NewsManager from "./pages/NewsManager";
import ImpactManager from "./pages/ImpactManager";
import MediaManager from "./pages/MediaManager";
import UsersManager from "./pages/UsersManager";
import AuditLogs from "./pages/AuditLogs";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    api.getMe()
      .then((data) => setUser(data))
      .catch(() => {
        removeToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#002B49] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#C5A059] border-t-transparent animate-spin mx-auto"></div>
          <p className="text-sm font-medium text-[#C5A059]">Authenticating Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Switch>
        <Route path="/login">
          <Login onLoginSuccess={(u) => setUser(u)} />
        </Route>
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/articles">
            <ArticlesManager user={user} />
          </Route>
          <Route path="/news">
            <NewsManager user={user} />
          </Route>
          <Route path="/impact">
            <ImpactManager user={user} />
          </Route>
          <Route path="/media" component={MediaManager} />
          <Route path="/users">
            {user.role === "SUPER_ADMIN" || user.role === "ADMIN" ? <UsersManager /> : <Redirect to="/" />}
          </Route>
          <Route path="/audit-logs">
            {user.role === "SUPER_ADMIN" || user.role === "ADMIN" ? <AuditLogs /> : <Redirect to="/" />}
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
