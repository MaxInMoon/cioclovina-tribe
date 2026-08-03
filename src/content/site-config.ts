export const siteConfig = {
  name: "Cioclovina Tribe",
  phoneDisplay: "+40 723 635 785",
  phoneInternational: "+40723635785",
  whatsapp: "https://wa.me/40723635785",
  email: "cioclovinatribe@gmail.com",
  instagram: "https://www.instagram.com/cioclovinatribe",
  maps: "https://maps.app.goo.gl/qw64mCHQsGQMbiPF8?g_st=iw",
  booking: "https://www.booking.com/hotel/ro/cioclovina-tribe",
  minimumStayNights: 2,
  advanceNoticeHours: 48,
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
