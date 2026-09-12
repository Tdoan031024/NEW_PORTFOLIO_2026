"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent px-4 pb-12 pt-16 sm:px-8 md:px-16 md:pt-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="relative min-h-0 md:min-h-[520px]">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.02fr]">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className={isMobile ? "" : "lg:pr-6"}
            >
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
                Let&apos;s build what&apos;s next.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-white/70">
                Have a role, project, or idea in mind? Let&apos;s turn it into a modern, scalable, and meaningful digital product.
              </p>
              <div className="mt-7 space-y-2 text-sm text-white/60">
                <p>
                  Email:{" "}
                  <a href="mailto:dovantuyendoan14@gmail.com" className="text-cyan-300 hover:underline">
                    dovantuyendoan14@gmail.com
                  </a>
                </p>
                <p>
                  Điện thoại:{" "}
                  <a href="tel:0888854212" className="text-cyan-300 hover:underline">
                    0888854212
                  </a>
                </p>
                <p>Ho Chi Minh City, Vietnam</p>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={false}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: isMobile ? 0.1 : 0.25, ease: "easeOut" }}
              className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,36,0.9),rgba(6,12,28,0.9))] p-5 sm:p-6 shadow-[0_18px_44px_rgba(0,0,0,0.33)] md:p-8"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white/85 placeholder:text-white/40 focus:border-cyan-300/65 focus:outline-none"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white/85 placeholder:text-white/40 focus:border-cyan-300/65 focus:outline-none"
                  required
                />
              </div>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="mt-4 w-full rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white/85 placeholder:text-white/40 focus:border-cyan-300/65 focus:outline-none"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
                className="mt-4 w-full rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white/85 placeholder:text-white/40 focus:border-cyan-300/65 focus:outline-none"
                required
              />

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full border border-cyan-300/45 bg-cyan-300/18 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25 disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                <span className="text-xs text-white/62">
                  {status === "success" && "Sent successfully."}
                  {status === "error" && "Send failed. Try again."}
                </span>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
