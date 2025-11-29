import { useContext, useMemo } from 'react';
import AuthContext from '../components/auth/auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function useUser() {
    const auth = useContext(AuthContext);

    const data = useMemo(() => {
        if (!auth?.jwt) return { roleId: null, userId: null };

        try {
            const user = jwtDecode<{ roleId: string; id: string }>(auth.jwt);
            return { roleId: user.roleId, userId: user.id };
        } catch {
            return { roleId: null, userId: null };
        }
    }, [auth?.jwt]);

    return data;
}
