"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import eyeOpen from "../../../../public/icons/eye_open.png";
import eyeClosed from "../../../../public/icons/eye_closed.png";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [div, setDiv] = useState("");
  const [className, setClassName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setDate_Of_Birth] = useState("");
  const [talent, setTalent] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      const { user } = data;

      const { error: insertError } = await supabase.from("users").insert([
        {
          name,
          email,
          className,
          div,
          date_of_birth,
          talent,
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      if (user) {
        localStorage.setItem("email", email);
        toast.success("Account created successfully");
        router.push("/auth/login");
      } else {
        toast.error("An error occurred while creating your account");
      }
    } catch (error) {
      toast.error(
        (error as Error).message ||
          "An error occurred while creating your account"
      );
    }
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regex.test(value)) {
      setDate_Of_Birth(rearrangeDateFormat(value));
    } else {
      setDate_Of_Birth(value);
    }
  };

  const rearrangeDateFormat = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    const rearrangedDate = `${year}/${month}/${day}`;
    return rearrangedDate;
  };

  return (
    <section>
      <div>
        <div>
          <div className="w-full h-full text-black box-shad bg-black border border-teal-500 rounded-md flex justify-center px-4">
            <div>
              <div>
                <h1 className="text-center font-bold text-white text-3xl py-10">
                  Sign Up
                </h1>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-4">
                <div>
                  <label htmlFor="Full Name" className="text-white">
                    Full Name
                  </label>
                  <br />
                  <div className="mt-2 mb-2">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="Class" className="py-1 text-white">
                    Class
                  </label>
                  <br />
                  <div className="mt-2 mb-2">
                    <select
                      id="class"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                      <option value="">Select your class</option>
                      <option value="Lkg">LKG</option>
                      <option value="Ukg">UKG</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-4">
                <div>
                  <label htmlFor="Div" className="py-1 text-white">
                    Divison
                  </label>
                  <br />
                  <div className="mt-2 mb-2">
                    <select
                      id="div"
                      value={div}
                      onChange={(e) => setDiv(e.target.value)}
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                      <option value="Div">Div</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="py-1 text-white">
                    Email
                  </label>
                  <br />
                  <div className="mt-2 mb-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email"
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-4">
                <div>
                  <label htmlFor="password" className="py-1 text-white">
                    Password
                  </label>
                  <br />
                  <div className="relative mt-2 mb-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      maxLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <Image
                      src={showPassword ? eyeOpen : eyeClosed}
                      alt="Toggle Password Visibility"
                      className="absolute right-2 top-2 cursor-pointer"
                      width={20}
                      height={20}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="py-1 text-white">
                    Confirm password
                  </label>
                  <br />
                  <div className="relative mt-2 mb-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="confirm-password"
                      required
                      maxLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <Image
                      src={showPassword ? eyeOpen : eyeClosed}
                      alt="Toggle Password Visibility"
                      className="absolute right-2 top-2 cursor-pointer"
                      width={20}
                      height={20}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-4">
                <div>
                  <label htmlFor="dob" className="py-1 text-white">
                    Date of Birth
                  </label>
                  <br />
                  <div className="mt-2 mb-2">
                    <input
                      type="date"
                      id="dob"
                      value={date_of_birth}
                      onChange={handleDateOfBirthChange}
                      placeholder="YYYY-MM-DD"
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="dob" className="py-1 text-white">
                    Talents
                  </label>
                  <br />
                  <div className="mt-2 mb-2">
                    <select
                      name="talent"
                      id="talent"
                      value={talent}
                      onChange={(e) => setTalent(e.target.value)}
                      className="text-black px-3 w-64 h-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                      <option value="">Select Your talent</option>
                      <option value="Dancing">Dancing</option>
                      <option value="Singing">Singing</option>
                      <option value="Sports">Sports</option>
                      <option value="Reseaching">Reseaching</option>
                      <option value="Coding">Coding</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center py-10">
                <button
                  className="py-2 px-24 rounded-xl text-black bg-white font-bold hover:bg-slate-300"
                  onClick={handleSignUp}
                >
                  SignUp
                </button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <p className="text-white">
                  Already have an account?{" "}
                  <Link href="/auth/login">
                    <span className="text-blue-500">Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
