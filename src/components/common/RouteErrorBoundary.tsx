import React from 'react';
import { trackError } from '../../services/telemetry';

type Props = {
  children: React.ReactNode;
  routeName: string;
};

type State = {
  hasError: boolean;
};

export class RouteErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    trackError(error, {
      route: this.props.routeName,
      boundary: 'RouteErrorBoundary',
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 gap-4 text-center">
          <span className="text-5xl">🧩</span>
          <p className="text-on-surface-variant">Something went wrong in this lesson. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

