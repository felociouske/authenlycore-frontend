export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">
          About TruthfulWasp
        </h1>
        <p className="text-accent text-sm font-semibold">
          Exposing scams. Protecting people.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-md p-6 mb-4 space-y-4 editorial text-sm">
        <p>
          TruthfulWasp was founded with a simple mission: to be the resource
          we wish had existed before millions of people lost money to online scams.
        </p>
        <p>
          Every day, people are targeted by fraudulent platforms that promise
          passive income, quick returns, and financial freedom. They use
          professional-looking websites, fake testimonials, and social pressure
          to extract money from ordinary people just trying to improve their lives.
        </p>
        <p>
          We investigate these platforms rigorously, gather evidence from real
          victims, and publish honest reviews so that anyone searching
          "is [platform] legit?" finds the truth before it is too late.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {[
          { icon: "🔍", title: "Evidence-Based", body: "Every verdict is backed by research and user-submitted evidence." },
          { icon: "🚫", title: "No Paid Reviews", body: "We never accept payment to change, soften, or remove a review." },
          { icon: "⚖️", title: "Fair & Balanced", body: "We identify legit platforms too. Our goal is truth, not clicks." },
          { icon: "🛡️", title: "Victim Privacy", body: "Personal details in submissions are always protected and redacted." },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-surface border border-border rounded-md p-4">
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-display font-semibold text-text-primary text-sm mb-1">{title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="bg-elevated border-l-4 border-accent rounded-r-md p-4 text-xs text-text-muted leading-relaxed">
        <strong className="text-text-secondary">Disclaimer:</strong>{" "}
        Reviews on TruthfulWasp represent editorial opinion based on available evidence at
        the time of publication. We are not a regulatory body and do not provide financial
        or legal advice. Always conduct your own research before making financial decisions.
      </div>
    </div>
  );
}