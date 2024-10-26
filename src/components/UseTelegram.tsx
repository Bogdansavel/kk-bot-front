export function useTelegram() {
    const webApp = (window as any).Telegram.WebApp
    const user = webApp.initDataUnsafe?.user

    return {
        webApp,
        user
    }
}