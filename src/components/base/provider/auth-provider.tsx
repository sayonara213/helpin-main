'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IAuthProviderProps {
  accessToken: string | null;
  children: React.ReactNode;
}

const AuthContext = createContext<User>({} as User);

const AuthProvider: React.FC<IAuthProviderProps> = ({ accessToken, children }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || ({} as User));
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
