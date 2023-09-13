import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { Input } from "components/Input/Input";
import { AuthLayout } from "layouts/AuthLayout/AuthLayout";
import { useState } from "react";
import { AuthAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "store/auth/auth-slice";
import { toast } from "utils/sweet-alert";

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        console.log(password, email);
        try {
            const user = await AuthAPI.signin(email, password);
            dispatch(setUser(user));
            await toast("success", "Auth succeed");
            navigate("/");
        } catch (error) {
            console.log("Auth Failer");
            toast("error", "Invalid Credentials");
        }
    };
    const form = (
        <div className={s.formContainer}>
            <h2 className={s.title}>
                Signin <br />
                to access your team notes
            </h2>
            <form onSubmit={submit} className={s.formGroup}>
                <Input
                    onChange={(e) => {}}
                    placeholder={"Email"}
                    onTextChange={setEmail}
                />
                <Input
                    type={"password"}
                    onChange={(e) => {}}
                    placeholder={"Password"}
                    onTextChange={setPassword}
                />
                <ButtonPrimary type="submit" className={s.button}>
                    Sign In
                </ButtonPrimary>
                <span>
                    Don't have an account yet?
                    <Link to={"/signup"}> Signup</Link>{" "}
                </span>
            </form>
        </div>
    );
    return <AuthLayout>{form}</AuthLayout>;
};
