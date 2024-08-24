"use client";
// app/page.tsx
import React from "react";
import Layout from "./layout";
import ErrorBoundary from "./components/Errorboundary";
import Chatbot from "./components/chatbot";

const Page: React.FC = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <div className="container mx-auto p-4 ">
          <ErrorBoundary>
            <Chatbot />
          </ErrorBoundary>
        </div>
      </Layout>
    </ErrorBoundary>
  );
};

export default Page;
