import React from "react";

interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: unknown) {
    // bisa kirim ke logging service
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 rounded-md">
          <h3 className="text-lg font-semibold">Terjadi kesalahan</h3>
          <p>Maaf, ada yang tidak beres. Coba muat ulang halaman ini.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
