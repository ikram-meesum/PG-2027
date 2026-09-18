import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function Login() {
  let navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.email == "ikram@gmail.com" && data.password == "meesumikram") {
      sessionStorage.setItem("user_role", "admin");
      navigate("/home");
    } else if (data.email == "pg@gmail.com" && data.password == "12345") {
      sessionStorage.setItem("user_role", "user");
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }

    // if (data.email == "ikram@gmail.com" && data.password == "12345") {
    //   sessionStorage.setItem("user_role", "user");
    //   navigate("/home");
    // } else {
    //   alert("Invalid username or password");
    // }
  };
  return (
    <>
      {/* <!-- component --> */}
      {/* <!-- component --> */}
      <div className="bg-sky-50 flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div className="w-1/2 h-screen hidden bg-slate-900 items-center justify-center text-white lg:block">
          <h2 className="mt-[40%] text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-teal-300">
            No Stack to
          </h2>
          <h2 className="text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-teal-300">
            Fullstack Developer
          </h2>
          {/* <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          /> */}
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          {/* NEW FORM */}

          <div className="w-72">
            {/* <!-- Heading --> */}
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <small className="text-gray-400">
              Please enter your valid login credentials
            </small>

            {/* <!-- Form --> */}
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold">
                  Valid Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400 py-1.5 px-2 text-gray-500"
                />
                {errors.email && (
                  <p className="text-red-600">Email is required.</p>
                )}
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="*****"
                  {...register("password", { required: true })}
                  className="block w-full rounded-md border border-gray-300 focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-400 py-1.5 px-2 text-gray-500"
                />
                {errors.password && (
                  <p className="text-red-500">Valid password is required.</p>
                )}
              </div>

              <div className="mb-3 mt-5">
                <button className="mb-1.5 block w-full text-center text-white bg-slate-800 hover:bg-slate-900 px-2 py-1.5 rounded-md">
                  Sign in
                </button>
              </div>
            </form>

            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Don't have an account?
              </span>
              <a href="#" className="text-xs font-semibold text-purple-700">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
