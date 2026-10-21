import { type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import AwsPartner from '@/pages/AwsPartner';
import About from '@/pages/About';
import Insights from '@/pages/Insights';
import Contact from '@/pages/Contact';
import Industries from '@/pages/Industries';
import HowWeWork from '@/pages/HowWeWork';
import Careers from '@/pages/Careers';
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
    <SiteShell><RoutedErrorBoundary>
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
    </RoutedErrorBoundary></SiteShell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </MotionConfig>
  );
}

export default App;
