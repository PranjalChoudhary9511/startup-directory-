import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PlaybackGuard } from "@/components/stories/playback";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/* Stops story videos on every navigation (incl. Back/Forward) and when the tab is left. */}
      <PlaybackGuard />
      <AnnouncementBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
