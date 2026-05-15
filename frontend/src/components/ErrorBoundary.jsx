import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-10">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full border-2 border-red-200">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Frontend Error</h1>
            <p className="text-gray-700 mb-4 font-mono text-sm overflow-auto max-h-40 bg-gray-100 p-4 rounded">
              {this.state.error?.toString()}
            </p>
            <p className="text-gray-500 text-sm">
              Check the console for more details. Try clearing your browser cache or restarting the dev server.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
