import { getOurStoryPage } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedImageUrl } from "@/utils/post-utils";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ContentNotFound } from "@/components/ContentNotFound";
import { FollowUsBox } from "@/components/FollowUsBox";
import { SubscribeBox } from "@/components/SubscribeBox";

export default async function AboutPage() {
  const post = await getOurStoryPage();

  if (!post) {
    return (
      <ContentNotFound
        title="Our Story Not Found"
        message="We couldn't find the page."
      />
    );
  }

  const featuredImage = getFeaturedImageUrl(post);

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <h1 className="text-5xl font-merriweather font-black mb-8 tracking-tight text-black">
            {post.title.rendered}
          </h1>

          <div className="prose prose-lg max-w-none prose-serif">
            {featuredImage && (
              <div className="float-right ml-8 mb-8 w-1/2 relative aspect-[4/3]">
                <Image
                  src={featuredImage}
                  alt={post.title.rendered}
                  fill
                  className="object-cover rounded-sm shadow-lg"
                />
              </div>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="font-merriweather text-lg leading-[1.8] text-gray-800"
            />
          </div>

          {/* Our Staff Section */}
          <div className="mt-16 clear-both">
            <h2 className="text-3xl font-merriweather font-black mb-8 tracking-tight text-black">
              Our Staff
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Chronicle Staff */}
              <div>
                <h3 className="text-xl font-merriweather font-bold mb-4 text-black">
                  Chronicle Staff
                </h3>
                <ul className="space-y-2 font-merriweather text-lg text-gray-800">
                  <li>
                    <span className="font-semibold">Mark Frost</span> / Founder,
                    Editor and Publisher
                  </li>
                  <li>
                    <span className="font-semibold">Sandra Hutchinson</span> /
                    Assistant Publisher and Counsel
                  </li>
                  <li>
                    <span className="font-semibold">Cathy DeDe</span> / Managing
                    Editor
                  </li>
                  <li>
                    <span className="font-semibold">Zander Frost</span> / Chief
                    Operating Officer
                  </li>
                  <li>
                    <span className="font-semibold">Gabrielle Katz</span> /
                    Advertising Manager
                  </li>
                  <li>
                    <span className="font-semibold">Ben Westcott</span> /
                    Reporter
                  </li>
                  <li>
                    <span className="font-semibold">Caroline Martindale</span> /
                    Calendar assistant and staff writer
                  </li>
                  <li>
                    <span className="font-semibold">David Cederstrom</span> /
                    Staff writer
                  </li>
                </ul>
              </div>

              {/* Right Column - Freelance & Delivery Team */}
              <div className="space-y-8">
                {/* Freelance */}
                <div>
                  <h3 className="text-xl font-merriweather font-bold mb-4 text-black">
                    Freelance
                  </h3>
                  <ul className="space-y-2 font-merriweather text-lg text-gray-800">
                    <li>
                      <span className="font-semibold">Ed Deso</span> / Freelance
                      Graphic Designer
                    </li>
                  </ul>
                </div>

                {/* The Chronicle Delivery Team */}
                <div>
                  <h3 className="text-xl font-merriweather font-bold mb-4 text-black">
                    The Chronicle Delivery Team
                  </h3>
                  <ul className="space-y-2 font-merriweather text-lg text-gray-800">
                    <li>Raymond (Lynn) Van Tassell, Jr.</li>
                    <li>Gary Brown</li>
                    <li>David White</li>
                    <li>Mark Frost</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-10">
          {/* Subscribe Box */}
          <SubscribeBox />

          {/* Social Links */}
          <FollowUsBox />

          {/* Find Us */}
          <div className="flex flex-col gap-4 px-2">
            <Link
              href="#"
              className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[13px] font-black uppercase tracking-widest font-raleway text-black">
                  Find the Chronicle
                </span>
                <span className="font-subheading">
                  Available at 100+ locations
                </span>
              </div>
            </Link>
            <Link
              href="mailto:office@glensfallschronicle.com"
              className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[13px] font-black uppercase tracking-widest font-raleway text-black">
                  Contact the Office
                </span>
                <span className="font-subheading">
                  office@glensfallschronicle.com
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

