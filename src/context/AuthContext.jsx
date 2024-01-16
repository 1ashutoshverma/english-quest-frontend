import { createContext, useState } from "react";


export const AuthContext = createContext();

const initialData = JSON.parse(localStorage.getItem("user")) || {
    isAuth: false,
    token: "",
    role: [],
    name: ""
}

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialData)
    const [refresh, setRefresh] = useState(false)

    const login = (payload) => {
        setUser({ isAuth: true, token: payload.token, name: payload.name, role: payload.role })
        localStorage.setItem("user", JSON.stringify({ isAuth: true, token: payload.token, role: payload.role, name: payload.name }))
    }
    const logout = () => {
        setUser({ isAuth: false, token: "", role: [], name: "" })
        localStorage.setItem("user", JSON.stringify({ isAuth: false, token: "", role: [], name: "" }))
    }


    return (
        <AuthContext.Provider value={{ login, logout, user, setRefresh, refresh }}>
            {children}
        </AuthContext.Provider>

    )
}
