import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import { loginRequest } from "./auth-config";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
const publicPages = import.meta.glob("./PublicPages/**/*.jsx", { eager: true });

const routes = [];
const publicRoutes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

for (const path of Object.keys(publicPages)) {
  const fileName = path.match(/\.\/PublicPages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  publicRoutes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: publicPages[path].default,
    loader: publicPages[path]?.loader,
    action: publicPages[path]?.action,
    ErrorBoundary: publicPages[path]?.ErrorBoundary,
  });
}
const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const publicRouter = createBrowserRouter(
  publicRoutes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

// const App = () => {
//   return <RouterProvider router={router} />;
// };
console.log("router", router);
const WrapperView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          // <div>
          //   {/* <h5>Welcome {activeAccount ? activeAccount.name : ""}!</h5>
          //   <button onClick={() => instance.logout()} className="button">
          //     Logout
          //   </button> */}
          // </div>
          <>
            <RouterProvider router={router} />
          </>
        ) : (
          <h5>Not logged in</h5>
        )}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {/* <h5>Not logged in</h5> */}
        {/* create a blue button with hover with tailwind */}
        {/* <button
          onClick={handleRedirect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button> */}
        <RouterProvider router={publicRouter} />;
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <WrapperView />
    </MsalProvider>
  );
};
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
