"use client";
import AuthForm from "@/component/authForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-indigo-500 p-6">
      <AuthForm />
    </div>
  );
}
