import React from "react";
import { ShieldCheck, Lock, Database, Globe, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="
      min-h-screen
      bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black
      text-gray-800 dark:text-gray-200
      px-6 py-16 transition-colors duration-300
    ">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-14 h-14 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your privacy matters. This policy explains how Portfolio Pro
            collects, uses, and protects your data.
          </p>
        </div>

        {/* Main Card */}
        <div className="
          bg-white dark:bg-white/5
          backdrop-blur-xl
          border border-gray-200 dark:border-white/10
          rounded-2xl p-8 space-y-10
          shadow-lg dark:shadow-xl
        ">
          {/* Section */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may collect personal details such as your name, email address,
              profile information, and usage data when you interact with
              Portfolio Pro.
            </p>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>To provide and improve our services</li>
              <li>To personalize your portfolio experience</li>
              <li>To communicate important updates</li>
              <li>To ensure platform security</li>
            </ul>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Data Protection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We use industry-standard security measures to protect your data.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Portfolio Pro may use third-party tools (analytics, hosting,
              authentication) that have their own privacy policies. We are not
              responsible for their practices.
            </p>
          </section>

          {/* Section */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, feel free to
              contact us at:
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
              portfoliopro12@gmail.com
            </p>
          </section>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
          © {new Date().getFullYear()} Portfolio Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;