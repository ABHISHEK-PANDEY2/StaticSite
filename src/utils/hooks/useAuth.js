import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { signUpWithEmailAndPassword,signInWithEmailAndPassword, } from 'configs/firebase.config'


function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        const {email,password} = values;
        try {
            //const resp = await apiSignIn(values)
            const resp = await signInWithEmailAndPassword(email,password)
            
            if (resp.user) {
                const token = await resp.user.getIdToken()
                // console.log(token)
                //const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.user) {
                    dispatch(
                        setUser(
                            resp.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }else{
                return {
                    status: 'failed',
                    message: resp,
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values) => {
        const {firstname,lastname, password, email, userType,phone} = values;
        try {
            const resp = await signUpWithEmailAndPassword(firstname,lastname, password, email, userType,phone);
            if (resp.user) {
                // const { token } = resp.data
                const token = await resp.user.getIdToken()
                dispatch(onSignInSuccess(token))
                if (resp.user) {
                    dispatch(
                        setUser(
                            resp.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }else{
                return {
                    status: 'failed',
                    message: resp,
                } 
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
