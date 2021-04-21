import { useDispatch, useSelector } from "react-redux"
import { signup } from "../store/actions/userActions"

export const HomePage = () => {

    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch();

    const signupUser = (ev) => {
        ev.stopPropagation()
        if (!ev.target[0].value.length) return
        dispatch(signup(ev.target[0].value))
    }

    return (
        <div className="home">
            <h1>Guess-Who</h1>
            {user && (
                <div className="user-details">
                    <h2>Hello {user.username}</h2>
                </div>
            )}
            {!user && (
                <form className="signup" onSubmit={signupUser}>
                    <label htmlFor="username">Enter username to continue</label>
                    <input id="username" placeholder="Username" type="text" name="username" />
                    <button>Login</button>
                </form>
            )}
        </div>
    )
}
