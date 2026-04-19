export default function HomePage() {
  return (
    <main className="container starter-shell">
      <article className="stack" data-gap="xl">
        <header className="stack" data-gap="sm">
          <p>Semantic and AI-first CSS framework</p>
          <h1>{{PROJECT_NAME}}</h1>
          <p>
            This Next starter begins from semantic structure and a copied Anthology core CSS file.
          </p>
        </header>

        <div className="cluster" data-gap="sm">
          <a href="#features" className="button" data-variant="primary">Explore the starter</a>
          <a href="#join" className="button" data-variant="outline">Join the waitlist</a>
        </div>

        <section id="features" className="grid" data-columns="3" data-gap="lg">
          <article className="card">
            <h2>Semantic baseline</h2>
            <p>Use native structure first and only add variants where intent is clearer with them.</p>
          </article>

          <article className="card">
            <h2>Optional primitives</h2>
            <p>Container, grid, stack, and cluster stay available when the page needs more composition.</p>
          </article>

          <article className="card">
            <h2>AI-readable output</h2>
            <p>Readable structure helps generators, audits, and future automation stay grounded.</p>
          </article>
        </section>

        <section id="join" className="stack" data-gap="md">
          <header className="stack" data-gap="sm">
            <h2>Join the waitlist</h2>
            <p>Collect early access interest with clear labels and a single strong action.</p>
          </header>

          <form className="stack" data-gap="md">
            <label>
              Email address
              <input type="email" name="email" autoComplete="email" />
            </label>

            <button type="submit" data-variant="primary">Request early access</button>
          </form>
        </section>
      </article>
    </main>
  );
}
