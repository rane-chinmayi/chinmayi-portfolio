import Container from "@/components/ui/Container";
import SocialIcon from "@/components/ui/SocialIcon";
import { site } from "@/content/site";

const linkClass =
  "inline-flex items-center gap-2 text-[13px] text-subtle transition-colors hover:text-foreground";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-4 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-[13px] text-subtle">{site.footer}</p>
        <ul className="flex items-center gap-5">
          <li>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <SocialIcon kind="linkedin" className="size-4" />
              {site.labels.linkedin}
            </a>
          </li>
          <li>
            <a href={site.links.emailHref} className={linkClass}>
              <SocialIcon kind="email" className="size-4" />
              {site.labels.email}
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
