import { useEffect, useState, type PropsWithChildren } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatcher } from '../redux/hooks';
import { updateLikesCount } from '../redux/vacation-slice';
import SocketDispatcherContext from './SocketDispatcherContext';
import { v4 } from 'uuid';

export default function SocketDispatcher(props: PropsWithChildren) {
    const dispatch = useAppDispatcher();
    const [clientId] = useState(() => v4());

    useEffect(() => {
        const s = io(import.meta.env.VITE_IO_SERVER_URL, { transports: ['websocket', 'polling'] });

        s.on('connect', () => console.log('socket connected', s.id));
        s.on('connect_error', (err: any) => console.error('socket connect_error', err));

        s.on('NewLike', (payload: { vacationId: string; userId: string; likesCount?: number; from?: string }) => {
            if (payload.from === clientId) return;

            if (typeof payload.likesCount === 'number') {
                dispatch(updateLikesCount({ vacationId: payload.vacationId, likesCount: payload.likesCount }));
            }
        });

        s.on('RemoveLike', (payload: { vacationId: string; userId: string; likesCount?: number; from?: string }) => {
            if (payload.from === clientId) return;

            if (typeof payload.likesCount === 'number') {
                dispatch(updateLikesCount({ vacationId: payload.vacationId, likesCount: payload.likesCount }));
            }
        });

        return () => {
            s.disconnect();
        };
    }, [dispatch, clientId]);

    return <SocketDispatcherContext.Provider value={{ clientId }}>{props.children}</SocketDispatcherContext.Provider>;
}
