import Link from "next/link";
import { FollowUsBox } from "@/components/FollowUsBox";
import { SubscribeBox } from "@/components/SubscribeBox";

export default function FindUsPage() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <h1 className="text-5xl font-playfair font-bold mb-4 tracking-tight">
            Find The Chronicle
          </h1>
          <div className="w-20 h-[3px] bg-accent-gold mb-10" />

          <div className="font-lora text-lg leading-[1.8] text-text-secondary space-y-6">
            <p>
              Pick up your free print copy of The Chronicle at hundreds of
              locations in the Greater Glens Falls/Lake George region —
              throughout Warren, Washington and northern Saratoga Counties.
              Also, at our office at 15 Ridge Street, in downtown Glens Falls.
              We also have a vending box outside our office where you can pick
              up your copy.
            </p>

            <div>
              <h2 className="text-2xl font-playfair font-bold mb-4 text-text-primary">
                Here are a few places to pick up this week&apos;s issue:
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Hannaford Supermarkets in Glens Falls, Queensbury, Hudson
                  Falls, South Glens Falls and Greenwich
                </li>
                <li>TOPS Friendly Markets</li>
                <li>Stewart&apos;s Shops</li>
                <li>Crandall Public Library</li>
                <li>Glens Falls Family YMCA</li>
                <li>Glens Falls Hospital</li>
              </ul>
              <p className="mt-4 italic text-text-tertiary">
                …Along with numerous other libraries, retail establishments,
                restaurants, banks, offices and schools.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-rule">
              <h2 className="text-2xl font-playfair font-bold mb-4 text-text-primary">
                Digital Chronicle
              </h2>
              <p>
                Join thousands of other readers and subscribe for free on the
                home page of{" "}
                <Link
                  href="/"
                  className="text-accent hover:text-accent-hover underline underline-offset-2 decoration-accent-gold"
                >
                  glensfallschronicle.com
                </Link>
                . You will receive a weekly email, on Thursdays, with a link to
                the full digital edition!
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-10 lg:border-l lg:border-rule lg:pl-10">
          <SubscribeBox />
          <FollowUsBox />
        </div>
      </div>
    </main>
  );
}
