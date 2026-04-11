import Link from "next/link";
import { socialMediaIcons } from "./icons/social-media-icons";
export function FollowUsBox() {
  return (
    <div className="border border-rule p-8">
      <h3 className="text-xl font-playfair font-bold mb-6 tracking-tight border-b border-rule pb-3">
        Follow Us
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {socialMediaIcons.map(social => (
          <Link
            key={social.name}
            href={social.href}
            className="flex items-center gap-3 p-3 border border-rule-light hover:border-accent hover:bg-accent-gold-light transition-colors group"
          >
            <span className="text-text-muted group-hover:text-accent transition-colors">
              <svg
                className="w-5 h-5 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {social.icon}
              </svg>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest font-libre-franklin text-text-primary">
              {social.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
