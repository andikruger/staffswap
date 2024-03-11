import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AuthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import Sidebar from "../components/Sidebar";

import About from "../pages/about";
import Contact from "../pages/contact";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Logout from "./logout";
import Swaps from "../pages/swap/index";
import Swap from "../pages/swap/swap";
import MySwaps from "../pages/swap/my";
import NewSwap from "../pages/swap/new";
import QuickSubmit from "../pages/swap/quicksubmit";
import Search from "../pages/swap/search";
import SearchResult from "../pages/swap/result/searchResult";
import EditSwap from "../pages/swap/id/edit";
import SwapMatch from "../pages/swap/id/match";
import ChatWrapper from "../components/ChatWrapper";
import Privacy from "./privacy";
// Public Pages
import PublicAbout from "../PublicPages/about";
import PublicContact from "../PublicPages/contact";
import PublicHome from "../PublicPages/home";
import PublicLogin from "../PublicPages/login";
const WrapperView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  return (
    <div>
      {activeAccount ? (
        <Router>
          <div className="">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Routes */}

              <Route path="/profile" element={<Profile />} />

              <Route
                path="/swap"
                element={
                  <AuthenticatedTemplate>
                    <Swaps />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/swap/:id"
                element={
                  <AuthenticatedTemplate>
                    <Swap />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/swap/my"
                element={
                  <AuthenticatedTemplate>
                    <MySwaps />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/swap/new"
                element={
                  <AuthenticatedTemplate>
                    <NewSwap />
                  </AuthenticatedTemplate>
                }
              />

              <Route
                path="/swap/quicksubmit"
                element={
                  <AuthenticatedTemplate>
                    <QuickSubmit />
                  </AuthenticatedTemplate>
                }
              />

              <Route
                path="/swap/search"
                element={
                  <AuthenticatedTemplate>
                    <Search />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/swap/result/:query"
                element={
                  <AuthenticatedTemplate>
                    <SearchResult />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/swap/:id/edit"
                element={
                  <AuthenticatedTemplate>
                    <EditSwap />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/swap/:id/match"
                element={
                  <AuthenticatedTemplate>
                    <SwapMatch />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/logout"
                element={
                  <AuthenticatedTemplate>
                    <Logout />
                  </AuthenticatedTemplate>
                }
              />
              {/* Chat Routes */}
              <Route
                path="/chat"
                element={
                  <AuthenticatedTemplate>
                    <Sidebar />
                  </AuthenticatedTemplate>
                }
              />
              <Route
                path="/chat/:chatId"
                element={
                  <>
                    <AuthenticatedTemplate>
                      <ChatWrapper />
                    </AuthenticatedTemplate>
                  </>
                }
              />

              <Route
                path="/privacy"
                element={
                  <>
                    <AuthenticatedTemplate>
                      <Privacy />
                    </AuthenticatedTemplate>
                  </>
                }
              />

              {/* Redirect to Home for other routes */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </Router>
      ) : (
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<PublicHome />} />
              <Route path="/about" element={<PublicAbout />} />
              <Route path="/contact" element={<PublicContact />} />
              <Route path="/login" element={<PublicLogin />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<PublicHome />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

function UserPage({ instance }) {
  return (
    <MsalProvider instance={instance}>
      <WrapperView />
    </MsalProvider>
  );
}

export default UserPage;
