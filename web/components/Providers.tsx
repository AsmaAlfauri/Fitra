'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>
        <ThemeProvider>
          <div className="flex flex-1">
            <main className="flex-1 p-4">{children}</main>
          </div>

        </ThemeProvider>
    </Provider>;
}
