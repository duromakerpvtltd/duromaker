import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application render error', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main id="main" className="grid min-h-dvh place-items-center bg-ivory px-6 py-24 text-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-earth">Unexpected error</p>
          <h1 className="display mt-4 text-5xl md:text-7xl">We could not load this page</h1>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-charcoal/75">
            Please refresh the page or return to the home page.
          </p>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="mt-8 border border-charcoal px-6 py-3 text-sm transition-colors hover:bg-charcoal hover:text-ivory"
          >
            Return home
          </button>
        </div>
      </main>
    );
  }
}
