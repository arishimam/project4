import pb from "lib/pocketbase";
import { useForm } from "react-hook-form";
import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";

export default function Auth() {
  const logout = useLogout();

  const { login, loading } = useLogin();

  const { register, handleSubmit, reset } = useForm();

  const loggedIn = pb.authStore.isValid;

  async function onLogin(data) {
    // data comes from react-hook-form
    login({ username: data.username, password: data.password });
    reset();
  }

  if (loggedIn)
    return (
      <>
        <h1>Logged In: {pb.authStore.model.username}</h1>
        <button type="submit" onClick={logout}>
          Log Out
        </button>
      </>
    );

  return (
    <>
      {loading && <p>Loading...</p>}
      {/* <h1>Logged In: {loggedIn && pb.authStore.model.username} </h1> */}
      <h1>Log in!</h1>

      <form onSubmit={handleSubmit(onLogin)}>
        <input type="text" placeholder="username" {...register("username")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <button type="submit" disable={loading}>
          {loading ? "Loading" : "Log In"}
        </button>
      </form>
    </>
  );
}
