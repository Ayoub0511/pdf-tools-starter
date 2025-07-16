"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
// Use relative imports instead of @ alias
import { tools } from '../../../lib/tools';
import { runTool } from "../../../lib/convertApi";
import { Button } from "../../../components/ui/button";

export default function ToolPage() {
  const { slug } = useParams();
  const meta = tools.find((t) => t.slug === slug);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [outUrl, setOutUrl] = useState("");

  const handleSubmit = async () => {
    if (!file) return;
    setStatus("processing");
    try {
      const url = await runTool(slug, [file]);
      setOutUrl(url);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  if (!meta) return <p>Tool not found.</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">{meta.label}</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <Button onClick={handleSubmit} disabled={!file || status === "processing"}>
        {status === "processing" ? "Processing…" : "Start"}
      </Button>

      {status === "done" && (
        <a
          href={outUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-600 underline"
        >
          Download result
        </a>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-4">Something went wrong. Try again.</p>
      )}
    </div>
  );
}

