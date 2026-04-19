import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitEvidence } from "../api/submissions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
  platform_name_raw: z.string().min(2, "Platform name required"),
  platform_url_raw: z.string().url("Valid URL required").or(z.literal("")),
  experience_description: z.string().min(100, "Minimum 100 characters"),
  submitter_name: z.string().optional(),
  submitter_email: z.string().email("Invalid email").or(z.literal("")),
  is_anonymous: z.boolean().optional(),
  amount_lost: z.string().optional(),
  currency: z.string().optional(),
});

const STEPS = [
  { label: "Platform", desc: "Which platform?" },
  { label: "Experience", desc: "What happened?" },
  { label: "Evidence", desc: "Upload files" },
  { label: "Contact", desc: "Optional details" },
];

export default function SubmitEvidencePage() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { currency: "KES", is_anonymous: false },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "application/pdf": [] },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    onDrop: (accepted) =>
      setFiles((prev) => [...prev, ...accepted].slice(0, 5)),
  });

  const nextStep = async () => {
    const fields = [
      ["platform_name_raw", "platform_url_raw"],
      ["experience_description", "amount_lost"],
      [],
    ];
    const ok = await trigger(fields[step]);
    if (ok) setStep((s) => s + 1);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (v !== undefined && v !== "") fd.append(k, v);
      });
      files.forEach((f) => fd.append("files", f));
      await submitEvidence(fd);
      setSubmitted(true);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-trust/20 border border-trust/30 flex items-center justify-center text-3xl mx-auto mb-5">
          ✓
        </div>
        <h2 className="font-display font-bold text-2xl text-text-primary mb-3">
          Submission Received
        </h2>
        <p className="text-text-muted text-sm leading-relaxed mb-6">
          Thank you for coming forward. Your submission is under review.
          Once approved, it will be published to warn others.
        </p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">
          Submit Evidence
        </h1>
        <p className="text-text-muted text-sm">
          All submissions are reviewed before publishing. You can remain anonymous.
        </p>
      </div>

      {/* Step progress */}
      <div className="flex mb-6 bg-surface border border-border rounded-md p-3">
        {STEPS.map((s, i) => (
          <div key={i} className={`flex-1 text-center px-1 ${i < STEPS.length - 1 ? "border-r border-border" : ""}`}>
            <div className={`text-xs font-bold mb-0.5 ${i === step ? "text-accent" : i < step ? "text-trust" : "text-text-muted"}`}>
              {i < step ? "✓" : `${i + 1}`}. {s.label}
            </div>
            <div className="text-xs text-text-muted hidden sm:block">{s.desc}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface border border-border rounded-md p-6">

        {/* Step 0 */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-1">
              Which platform scammed you?
            </h2>
            <div>
              <label className="label">Platform Name *</label>
              <input {...register("platform_name_raw")} className="input" placeholder="e.g. CashFlow Pro" />
              {errors.platform_name_raw && <p className="error-text">{errors.platform_name_raw.message}</p>}
            </div>
            <div>
              <label className="label">Platform URL</label>
              <input {...register("platform_url_raw")} className="input" placeholder="https://scamsite.com" />
              {errors.platform_url_raw && <p className="error-text">{errors.platform_url_raw.message}</p>}
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-1">
              What happened to you?
            </h2>
            <div>
              <label className="label">Your Experience *</label>
              <textarea
                {...register("experience_description")}
                rows={7}
                className="input resize-none"
                placeholder="Describe how you found the platform, what they promised, how you lost money, what happened when you tried to withdraw..."
              />
              {errors.experience_description && <p className="error-text">{errors.experience_description.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Amount Lost (optional)</label>
                <input {...register("amount_lost")} type="number" className="input" placeholder="0" />
              </div>
              <div>
                <label className="label">Currency</label>
                <select {...register("currency")} className="input">
                  <option value="KES">KES</option>
                  <option value="USD">USD</option>
                  <option value="UGX">UGX</option>
                  <option value="TZS">TZS</option>
                  <option value="NGN">NGN</option>
                  <option value="ZAR">ZAR</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-1">
              Upload your evidence
            </h2>
            <p className="text-text-muted text-xs">
              Screenshots, chat screenshots, receipts. Max 5 files, 10MB each.
              Images and PDFs only.
            </p>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-text-muted"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-text-muted text-sm mb-1">
                {isDragActive ? "Drop files here" : "Drag and drop files, or click to browse"}
              </p>
              <p className="text-xs text-text-muted">JPG, PNG, WEBP, PDF</p>
            </div>
            {files.length > 0 && (
              <ul className="space-y-1.5">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between bg-elevated border border-border rounded px-3 py-2 text-xs">
                    <span className="font-mono text-text-muted truncate mr-3">{f.name}</span>
                    <button type="button" onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))} className="text-danger hover:text-red-400 font-semibold shrink-0">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-1">
              Your details (optional)
            </h2>
            <p className="text-text-muted text-xs leading-relaxed">
              These are never shown publicly. We may contact you for clarification only.
            </p>
            <div>
              <label className="label">Name</label>
              <input {...register("submitter_name")} className="input" placeholder="John Doe" />
            </div>
            <div>
              <label className="label">Email</label>
              <input {...register("submitter_email")} type="email" className="input" placeholder="you@email.com" />
              {errors.submitter_email && <p className="error-text">{errors.submitter_email.message}</p>}
            </div>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input {...register("is_anonymous")} type="checkbox" className="mt-0.5 w-4 h-4 rounded accent-accent" />
              <span className="text-sm text-text-muted leading-snug">
                Submit anonymously. My name will not appear anywhere.
              </span>
            </label>
            <div className="bg-caution/5 border border-caution/20 rounded p-3 text-xs text-caution leading-relaxed">
              By submitting, you confirm this evidence is authentic and consent to
              TruthfulWasp reviewing and potentially publishing it for public
              awareness.
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-secondary">
              Back
            </button>
          ) : <div />}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Continue →
            </button>
          ) : (
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Submitting..." : "Submit Evidence"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}