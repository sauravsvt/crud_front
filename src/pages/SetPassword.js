import { useEffect, Fragment, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetPassword() {
  const [validUrl, setValidUrl] = useState(true);

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = values;

  const inputHandler = (e) => {
    let val = e.target.value;
    setValues({ ...values, [e.target.name]: val });
  };

  const confirmationCode = useParams();
  const CC = confirmationCode.confirmationCode;

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        console.log(confirmationCode.confirmationCode, "confirmation Code");
        const url = `http://localhost:3001/set-password/verify-email/${CC}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [CC]);

  let navigate = useNavigate();
  const onSubmit = () => {
    axios
      .put(`http://localhost:3001/change-password/${CC}`, values)
      .then((response) => {
        console.log(response.data.msg);
        toast.success(response.data.msg);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        toast.error(err.response.data.msg);
      });
  };

  const Login = () => {
    navigate("/login");
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Fragment>
      {validUrl ? (
        <>
          <h1>Set Your Password</h1>
          <form>
            <label>
              <input
                type="password"
                {...register("password", {
                  required: "Please enter at least 6 digit password",
                  minLength: 6,
                })}
                placeholder="Password"
                name="password"
                value={password}
                onChange={inputHandler}
              />
              <div className="errormessage">
                {errors.password && errors.password.message}
              </div>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please enter at least 6 digit password",
                  minLength: 6,
                })}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={inputHandler}
              />
              <div className="errormessage">
                {errors.confirmPassword && errors.confirmPassword.message}
              </div>
            </label>
            <button type="submit" onClick={handleSubmit(onSubmit)}>
              {" "}
              Set Password
            </button>
            <button onClick={Login}> Login</button>
          </form>
          <ToastContainer />
        </>
      ) : (
        <h1> 404 NOT FOUND</h1>
      )}
    </Fragment>
  );
}

export default SetPassword;
