import { lazy, Suspense, type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';

// Inner pages load on demand so the landing page ships less JavaScript, then
// preload once the browser is idle so navigating never shows an empty page.
const pages = {
  Services: () => import('@/pages/Services'),
  AwsPartner: () => import('@/pages/AwsPartner'),
  About: () => import('@/pages/About'),
  Insights: () => import('@/pages/Insights'),
  Contact: () => import('@/pages/Contact'),
  Industries: () => import('@/pages/Industries'),
  HowWeWork: () => import('@/pages/HowWeWork'),
  Careers: () => import('@/pages/Careers'),
};
const Services = lazy(pages.Services);
const AwsPartner = lazy(pages.AwsPartner);
const About = lazy(pages.About);
const Insights = lazy(pages.Insights);
const Contact = lazy(pages.Contact);
const Industries = lazy(pages.Industries);
const HowWeWork = lazy(pages.HowWeWork);
const Careers = lazy(pages.Careers);
const preload = () => Object.values(pages).forEach((load) => { load(); });
if ('requestIdleCallback' in window) requestIdleCallback(preload); else setTimeout(preload, 1500);
import { SiteShell } from '@/components/site';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <SiteShell><RoutedErrorBoundary><Suspense fallback={<div className="page-loading" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/industries" component={Industries} />
        <Route path="/aws-partner" component={AwsPartner} />
        <Route path="/how-we-work" component={HowWeWork} />
        <Route path="/about" component={About} />
        <Route path="/insights" component={Insights} />
        <Route path="/careers" component={Careers} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense></RoutedErrorBoundary></SiteShell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </MotionConfig>
  );
}

export default App;
