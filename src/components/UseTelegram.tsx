export function useTelegram() {
    const webApp = (window as any).Telegram.WebApp
    const user = webApp.initDataUnsafe?.user

    // Use as a callback for method results
    const onArgumentResult = (functionName: any, argument: any, result: any) => {
        // Show function call result using an alert
        webApp.showAlert(`${functionName}(${argument}) returned ${result}`)
    }

    const executeArgumentMethod = (methodName: any, argument: any, method: any, ignoreAlert: any) => {
        try {
            const result = method()
            if (!ignoreAlert) {
                const wrappedResult = `Result: ${result}`
                onArgumentResult(methodName, argument, wrappedResult)
            }
        } catch (error) {
            onArgumentResult(methodName, argument, error)
        }
    }

    const executeMethod = (methodName: any, method: any, ignoreAlert: any) => {
        executeArgumentMethod(methodName, '', method, ignoreAlert)
    }

    return {
        webApp,
        user,
        executeMethod
    }
}