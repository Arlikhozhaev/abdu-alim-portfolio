import { lazy, Suspense } from "react";
import useMediaQuery from "#hooks/useMediaQuery";
import { DESKTOP_MEDIA_QUERY } from "#constants/breakpoints";
import AppLoadingScreen from "#components/AppLoadingScreen";

const DesktopApp = lazy(() => import("./DesktopApp"));
const MobileHome = lazy(() => import("#components/MobileHome"));

const App = () => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  return (
    <main>
      <Suspense
        fallback={
          <AppLoadingScreen variant={isDesktop ? "desktop" : "mobile"} />
        }
      >
        {isDesktop ? <DesktopApp /> : <MobileHome />}
      </Suspense>
    </main>
  );
};

export default App;
