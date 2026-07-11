"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteProductButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`"${title}" ko delete karna hai? Ye action wapis nahi ho sakta.`);
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Delete nahi ho saka.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      alert("Kuch masla ho gaya.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-platinum-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
      title="Delete"
    >
      <FiTrash2 size={14} />
    </button>
  );
}
