import { useContext, useMemo } from 'react';
import AuthContext from '../components/auth/auth/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function useUsername() {
    const auth = useContext(AuthContext);

    const data = useMemo(() => {
        if (!auth?.jwt) return { fullName: null };

        try {
            const payload = jwtDecode<{ firstName: string; lastName: string }>(auth.jwt);
            const username = `${payload.firstName} ${payload.lastName}`;
            return { username };
        } catch (e) {
            alert(e);
        }
    }, [auth?.jwt]);

    return data;
}
