
export default function CliprPage() {
  return (
    <div className="min-h-screen text-foreground bg-full-page-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-orange-500 font-bold">
            c
          </div>
          <span className="text-lg font-semibold">Clipr Clipping</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          {/* Video / Banner */}
          <div className="aspect-video w-full rounded-xl bg-background flex items-center justify-center rounded-xl overflow-hidden">

            <video
              className="h-full w-full object-contain"
              loop
              autoPlay
              controls
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAPCAYAAAD6Ud/mAAABWElEQVR4Xo2U0bKDIBBD/f9fraKo0EcuIY27KHfah4xTEA/J7nZ6v3ORcs4FSglKTedp0pqeOaf6vsn2z3qOOg7oKNMYdIfoINe9BPJrghB09CBzI4i/kQ7YTfGRlKA73LshpHNEkEGwue/Q/pAO6+YEUhYZAfzGJzrvRnYBiDGWbYO2S1iDsG/A4wL4uPxFJ0HohhEZZCvrupYQTPgNMGGxvk/geVKCK4kYeeELxA4jiE62BliWULVcCiE0+Aj2HwSpfEBWG7mhk1DmeamaLwH6hMGVydxY9BXEOWAhGRtuCxDcAPR6zU0EjkCsmZdqqfo2EFvU6gOrHvTd0Q8g+wfoG2FdUSPU51mjUZ2+OvIgRadmsI4LDSrAvRlGs2bRsbGmftA0ZJohzg/cScpc7c15GjeCn8MbyOJT99nLHFQ/sHcIgL7jvKshSENLWC8fk+amfz5haK4/5fLXi3zMGxIAAAAASUVORK5CYII="
            >
              <source src="https://assets-2-prod.whop.com/uploads/user_3250549/video/access_passes/2025-12-15/d9dc7e67-3723-4497-bb68-9fa044ddbe2f.mov#t=0.1" />
            </video>

          </div>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1 text-foreground">Free</span>
            <span>👤 90.9K members</span>
            <span>By Prithvi (PB)</span>
          </div>

          {/* Title */}
          <h1 className="mt-8 text-3xl font-bold">
            Join The Best Clipping Community
          </h1>

          {/* Description */}
          <div className="mt-4 space-y-2 text-muted-foreground">
            <p>
              Welcome to <strong>Clipr</strong> — The New Standard in Clipping.
            </p>
            <p>
              Clipr is the leading community for clippers and creators who want
              to dominate the short-form space.
            </p>
            <p>
              <strong>Elite Training:</strong> Everything you need to know about
              content, virality, and monetization.
            </p>
            <p>
              <strong>Premier Campaigns:</strong> Exclusive access to some of
              the top communities.
            </p>
            <p>
              <strong>Pro Community:</strong> Join a powerhouse of clippers
              helping each other scale.
            </p>
            <p>
              From day-one beginners to seasoned pros, Clipr is the ultimate
              home for the next generation of clippers.
            </p>
          </div>

          {/* Reviews header */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">⭐ 4.6</span>
              <span className="text-muted-foreground">(512 reviews)</span>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              View all
            </button>
          </div>

          {/* Reviews */}
          <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                name: "John",
                text: "Amazing Campaigns are available here do check it guys",
              },
              {
                name: "Go Gadas",
                text: "Trying and learning",
              },
              {
                name: "Iliyas bhaikatti",
                text: "very nice",
              },
              {
                name: "AMAN",
                text: "Very nice",
              },
            ].map((review, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted" />
                  <span className="font-medium">{review.name}</span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </section>

          {/* Report */}
          <div className="mt-12 flex justify-center">
            <button className="text-sm text-muted-foreground hover:underline">
              Report this creator
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside>
          <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="h-40 bg-black flex items-center justify-center">
              <span className="text-3xl font-bold text-orange-500">clipr</span>
            </div>

            <div className="p-5">
              <div className="mb-2 flex items-center gap-2 text-sm">
                <span className="text-yellow-500">★★★★★</span>
                <span className="font-medium">4.6</span>
                <span className="text-muted-foreground">(512)</span>
              </div>

              <h2 className="text-lg font-semibold">Clipr Campaigns</h2>

              <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-semibold text-text-primary hover:bg-blue-700">
                Get Access
              </button>


            </div>
          </div>
          <div className="overflow-hidden text-card-foreground">
            {/* FAQ */}
            <div className="mt-6 rounded-xl border border-border bg-card text-card-foreground">
              <div className="divide-y divide-border text-sm">
                <details className="group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    <span>Is this group free?</span>
                    <span className="transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">
                    Yes, joining Clipr is completely free. You can access campaigns,
                    community discussions, and learning resources at no cost.
                  </p>
                </details>

                <details className="group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    <span>How often do payouts get sent?</span>
                    <span className="transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">
                    Payouts are typically processed on a weekly basis, depending on the
                    campaign and platform requirements.
                  </p>
                </details>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Powered by BennyBucks
            </p>

          </div>
        </aside>
      </main>
    </div>
  );
}
