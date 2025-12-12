import {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    useEffect,
    type ReactNode
} from "react";

// Nivel de documentación: Semi-senior
// Definición del contrato del contexto
interface NotificationContextType {
    showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Usamos useRef para mantener la referencia del timer entre renderizados
    // y poder cancelarlo si se lanza una nueva notificación rápidamente.
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const showNotification = useCallback((msg: string) => {
        // 1. Limpiamos cualquier timer anterior para evitar cierres prematuros
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // 2. Actualizamos el estado para mostrar la nueva notificación
        setMessage(msg);
        setIsVisible(true);

        // 3. Configuramos el nuevo timer de auto-cierre
        timerRef.current = setTimeout(() => {
            setIsVisible(false);
            // Opcional: limpiar el mensaje después de la animación de salida
            setTimeout(() => setMessage(null), 300);
        }, 3000);
    }, []);

    const closeNotification = useCallback(() => {
        setIsVisible(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    // Limpieza al desmontar el componente para evitar memory leaks
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {/* NOTA DE ARQUITECTURA:
              Idealmente, este componente de UI debería estar separado (ej: <Toast />),
              pero lo mantenemos aquí para respetar tu estructura actual.
              Asegúrate de tener en tu CSS las clases .notification y .notification.show
            */}
            <div className={`notification ${isVisible ? "show" : ""}`}>
                <span id="notification-message">{message}</span>
                <button
                    className="notification-close"
                    onClick={closeNotification}
                    aria-label="Cerrar notificación"
                >
                    &times;
                </button>
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification debe usarse dentro de un NotificationProvider");
    }
    return context;
}