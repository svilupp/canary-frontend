import { useState } from "react";

export default function LogsClear() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleClearLogs = async () => {
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/logs-clear", {
        method: "POST",
      });
      const text = await response.text();
      if (response.ok) {
        setStatus("success");
        setMessage(text || "Logs cleared successfully.");
      } else {
        setStatus("error");
        setMessage(text || "An unknown error occurred.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "A network error occurred.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Clear Production Logs</h1>
      <p className="mb-4">
        This will permanently delete all client-side logs stored in the production KV namespace.
        Server-side logs viewed with <code>wrangler tail</code> will not be affected.
      </p>
      <button
        onClick={handleClearLogs}
        disabled={status === "loading"}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {status === "loading" ? "Clearing..." : "Clear Production Logs"}
      </button>
      {message && (
        <div
          className={`mt-4 p-4 rounded ${
            status === "success" ? "bg-green-100 text-green-800" : ""
          } ${status === "error" ? "bg-red-100 text-red-800" : ""}`}
        >
          <p className="font-semibold">
            {status === "success" ? "Success" : "Error"}
          </p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
